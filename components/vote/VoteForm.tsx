import React, { useState, useEffect } from "react";
import {
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
  Typography,
} from "@mui/material";
import { useMutation, useSubscription, votes_insert_input } from "gql";
import { useSession } from "hooks";
import { useRouter } from "next/router";

export default function VoteForm() {
  const router = useRouter();
  const [session] = useSession();
  const subscription = useSubscription();
  const [addVotes] = useMutation((mutation, args: any) => {
    return mutation.addVote({ vote: args }).pollId;
  });
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const poll = subscription.events_by_pk({ id: session?.event?.id })?.poll;

  const [vote, setVote] = useState<any[]>([]);
  useEffect(() => {
    if (poll?.options?.length !== vote?.length)
      setVote(new Array(poll?.options?.length).fill(false));
  }, [poll?.options]);


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

    if (submit && (poll?.minVote ?? 1) > selected) {
      setHelperText(
        `Vælg venligst mindst ${poll?.minVote} mulighed${
          (poll?.minVote ?? 1) > 1 ? "er" : ""
        }`
      );
      setError(true);
      return false;
    }

    if ((poll?.maxVote ?? 1) < selected) {
      setHelperText(
        `Vælg venligst max ${poll?.maxVote} mulighed${
          (poll?.maxVote ?? 1) > 1 ? "er" : ""
        }`
      );
      setError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validate(vote, true)) {
      return;
    }

    await addVotes({
      args: {
        pollId: poll?.id,
        value: vote.reduce((a, e, i) => (e ? a.concat(i) : a), []),
      },
    });
    if (poll?.content?.folder?.mode == "candidates") {
      router.push(`/content/${poll?.content?.id}`);
    } else {
      router.push(`/poll/${poll?.id}`);
    }
  };

  const handleChangeVote = (e: any) => {
    let voteOld;
    if (1 === poll?.maxVote && 1 === poll?.minVote) {
      voteOld = new Array(poll.options.length).fill(false);
    } else {
      voteOld = vote;
    }
    const index = parseInt(e.target.value);
    const voteNew = [...voteOld];
    voteNew[index] = !voteNew[index];

    if (!validate(voteNew, false)) {
      return;
    }
    setVote(voteNew);

    setHelperText("");
    setError(false);
  };

  if (!(poll && poll.active)) {
    return (
      <Card elevation={3} sx={{ m: 1 }}>
        <Typography sx={{ p: 2 }} variant="h5">
          Ingen afstemning nu
        </Typography>
      </Card>
    );
  }

  const Control = poll?.maxVote == 1 && poll?.minVote == 1 ? Radio : Checkbox;

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        sx={{
          bgcolor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.secondary.contrastText,
        }}
        title={poll?.content?.name}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FormControl error={error}>
            <FormGroup>
              {poll?.options?.map((opt: any, index: number) => (
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
              sx={{ m: [1, 1, 0, 0] }}
            >
              Stem
            </Button>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
}
