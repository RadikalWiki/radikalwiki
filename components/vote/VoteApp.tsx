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
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useMutation,
  useSubscription,
  nodes_insert_input,
  useQuery,
  useTransactionQuery,
} from "gql";
import { useSession } from "hooks";
import { useRouter } from "next/router";
import { useNode } from "hooks";
import { PollApp, PollChartSub } from "comps/poll";
import { HeaderCard } from "comps/common";
import {
  DoNotDisturb,
  Hail,
  HowToReg,
  HowToVote,
  Refresh,
} from "@mui/icons-material";
import { useUserEmail, useUserId } from "@nhost/react";

export default function VoteApp() {
  const [session] = useSession();
  const userId = useUserId();
  const email = useUserEmail();
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);

  const { sub, subGet } = useNode();
  const poll = subGet("active");

  /*
  const { data } = useTransactionQuery(
    (query, args: string) => {
      const node = query.node({ id })?.relations({ where: { name: { _eq: "active" } } })?.[0]?.node;
      return {
        id: node?.id,
        mutable: node?.mutable,
        name: node?.name,
        checkUnique: node?.checkUnique({ args: { mime_name: "vote/vote" } }),
        data: node?.data(),
        mime: {
          name: node?.mimeId,

        },
        mimeId: node?.mimes({ where: { name: { _eq: "vote/vote" }}})?.[0]?.id,
        contextId: node?.contextId,
      }
    },
    {
      variables: id,
      // By default is 'cache-first'
      fetchPolicy: 'no-cache',
      // Polling every 5 seconds
      pollInterval: 1000,
      // By default is `true`
      notifyOnNetworkStatusChange: true,
      suspense: true,
    }
  );
  */
  //const router = useRouter();
  //const [addVotes] = useMutation((mutation, args: any) => {
  //  return mutation.addVote({ vote: args }).pollId;
  //});

  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  //const { node, subGet } = useNode({ id });
  //const poll = subGet("active")
  //const poll = data;
  const canVote =
    (sub?.context?.permissions({
      where: {
          _and: [
            { mimeId: { _eq: "vote/vote" } },
            { insert: { _eq: true } },
            {
              node: {
                members: {
                  _and: [
                    {
                      _or: [
                        { nodeId: { _eq: userId } },
                        { email: { _eq: email } },
                      ],
                    },
                    { active: { _eq: true } },
                  ],
                },
              },
            },
          ],
        },
    })?.length ?? 0) > 0;
  const checkUnique = poll?.checkUnique({ args: { mime_name: "vote/vote" } });
  const [addVote] = useMutation((mutation, args: nodes_insert_input) => {
    return mutation.insertNode({ object: args })?.id;
  });

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

  const contextId = poll?.contextId;
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validate(vote, true)) {
      return;
    }
    const name = new Date(
      new Date().getTime() + (session?.timeDiff ?? 0)
    ).toLocaleString();
    await addVote({
      args: {
        name,
        mimeId: "vote/vote",
        parentId: poll?.id,
        contextId,
        data: vote.reduce((a, e, i) => (e ? a.concat(i) : a), []),
      },
    });
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
      <>
        {status}
        <PollApp id={poll?.id} />{" "}
      </>
    );

  if (!(poll?.mutable && poll?.mimeId == "vote/poll")) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      {status}
      <Card elevation={3} sx={{ m: 1 }}>
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
                endIcon={<HowToVote />}
                sx={{ m: [1, 1, 0, 0] }}
              >
                Stem
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
