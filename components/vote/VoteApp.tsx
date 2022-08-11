import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Radio,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSession } from "hooks";
import { useRouter } from "next/router";
import { Node } from "hooks";
import { HeaderCard, MimeLoader } from "comps";
import {
  DoNotDisturb,
  Hail,
  HowToReg,
  HowToVote,
  Refresh,
} from "@mui/icons-material";
import { useUserEmail, useUserId } from "@nhost/react";

export default function VoteApp({ node }: { node: Node }) {
  const [session] = useSession();
  const userId = useUserId();
  const email = useUserEmail();
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const insert = node.useInsert();
  const sub = node.useSubs();
  const get = node.useSubsGet();
  const poll = get("active");

  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const checkUnique = poll?.checkUnique({ args: { mime: "vote/vote" } });
  const canVote = !!sub?.context?.permissions({
    where: {
      _and: [
        { mimeId: { _eq: "vote/vote" } },
        { insert: { _eq: true } },
        {
          node: {
            members: {
              _and: [
                {
                  _or: [{ nodeId: { _eq: userId } }, { email: { _eq: email } }],
                },
                { active: { _eq: true } },
              ],
            },
          },
        },
      ],
    },
  })?.[0]?.id;

  const data = poll?.data();
  const { options, maxVote, minVote } =
    data && poll?.mimeId == "vote/poll"
      ? data
      : { options: [], maxVote: 1, minVote: 1 };

  const [vote, setVote] = useState<any[]>([]);
  useEffect(() => {
    if (options?.length !== vote?.length)
      setVote(new Array(options?.length).fill(false));
  }, [options]);

  const validate = (vote: any, submit: boolean) => {
    const selected = vote.filter((o: any) => o).length;
    // Handle blank
    if (selected == 1 && vote[vote.length - 1]) {
      return true;
    }
    if (selected > 1 && vote[vote.length - 1]) {
      setHelperText("Blank kan kun vælges alene");
      setError(true);
      return false;
    }

    if (submit && (minVote ?? 1) > selected) {
      setHelperText(
        `Vælg venligst mindst ${minVote} mulighed${
          (minVote ?? 1) > 1 ? "er" : ""
        }`
      );
      setError(true);
      return false;
    }

    if ((maxVote ?? 1) < selected) {
      setHelperText(
        `Vælg venligst max ${maxVote} mulighed${(maxVote ?? 1) > 1 ? "er" : ""}`
      );
      setError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    if (!validate(vote, true)) {
      return;
    }
    const name = new Date(
      new Date().getTime() + (session?.timeDiff ?? 0)
    ).toLocaleString();
    await insert({
      name,
      mimeId: "vote/vote",
      parentId: poll?.id,
      data: vote.reduce((a, e, i) => (e ? a.concat(i) : a), []),
    });
    setLoading(false);
  };

  const handleChangeVote = (e: any) => {
    const voteOld =
      1 === maxVote && 1 === minVote
        ? new Array(options.length).fill(false)
        : vote;
    const index = parseInt(e.target.value);
    const voteNew = [
      ...voteOld.slice(0, index),
      !voteOld[index],
      ...voteOld.slice(index + 1),
    ];

    if (!validate(voteNew, false)) {
      return;
    }
    setVote(voteNew);

    setHelperText("");
    setError(false);
  };

  const Control = maxVote == 1 && minVote == 1 ? Radio : Checkbox;

  const status = (
    <HeaderCard
      title={canVote ? "Du har stemmeret" : "Du har ikke stemmeret"}
      subtitle={
        (poll?.mimeId == "vote/poll" &&
          canVote &&
          (checkUnique ? "Du har ikke stemt" : "Du har stemt")) ||
        ""
      }
      avatar={
        <Tooltip title="Opdater status">
          <Avatar
            onClick={() => router.reload()}
            onMouseEnter={() => setRefresh(true)}
            onMouseLeave={() => setRefresh(false)}
            sx={{
              bgcolor: (t) =>
                canVote ? t.palette.secondary.main : t.palette.primary.main,
            }}
          >
            {refresh ? <Refresh /> : canVote ? <HowToReg /> : <DoNotDisturb />}
          </Avatar>
        </Tooltip>
      }
    />
  );

  if (
    poll?.id &&
    poll?.mimeId == "vote/poll" &&
    (!poll?.mutable || checkUnique === false || canVote === false)
  )
    return (
      <Stack spacing={1}>
        {status}
        <MimeLoader id={poll?.id} mimeId={poll?.mimeId} />
      </Stack>
    );

  if (!(poll?.mutable && poll?.mimeId == "vote/poll")) {
    return (
      <Stack spacing={1}>
        {status}
        <HeaderCard
          title="Ingen afstemning nu"
          avatar={
            <Avatar
              sx={{
                bgcolor: (t) => t.palette.secondary.main,
              }}
            >
              <DoNotDisturb />
            </Avatar>
          }
        />
      </Stack>
    );
  }

  return (
    <Stack spacing={1}>
      {status}
      <Card sx={{ m: 0 }}>
        <CardHeader
          sx={{
            bgcolor: (t) => t.palette.secondary.main,
            color: (t) => t.palette.secondary.contrastText,
          }}
          title={poll?.name}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormControl error={error}>
              <FormGroup>
                {options?.map((opt: any, index: number) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={
                      <Control
                        checked={vote[index] || false}
                        onChange={handleChangeVote}
                      />
                    }
                    label={opt}
                  />
                ))}
              </FormGroup>
              <FormHelperText>{helperText}</FormHelperText>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                endIcon={<HowToVote />}
                sx={{ m: [1, 1, 0, 0] }}
              >
                Stem
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
}
