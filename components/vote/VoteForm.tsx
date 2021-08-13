import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Radio,
  Typography,
} from "@material-ui/core";
import { useMutation, useSubscription } from "@apollo/client";
import { VOTE_ACTION, EVENT_POLL_SUB } from "gql";
import { useStyles, useSession } from "hooks";
import { useRouter } from "next/router";

export default function VoteForm() {
  const router = useRouter();
  const classes = useStyles();
  const [session] = useSession();
  const { loading, data } = useSubscription(EVENT_POLL_SUB, {
    variables: { id: session?.event.id },
  });
  const [addVote] = useMutation(VOTE_ACTION);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const poll = data?.event?.poll;
  const opts =
    poll?.content.folder.mode == "candidates"
      ? [...poll?.content.children?.map((c: any) => c.name), "Blank"]
      : ["For", "Imod", "Blank"];

  const [vote, setVote] = useState(new Array(opts.length).fill(false) || []);

  const validate = (vote: any, submit: boolean) => {
    const selected = vote.filter((o: any) => o).length;
    if (submit && poll?.content.minVote > selected) {
      setHelperText(
        `Vælg venligst mindst ${poll.content.minVote} mulighed${
          poll?.content.minVote > 1 ? "er" : ""
        }`
      );
      setError(true);
      return false;
    }

    if (poll?.content.maxVote < selected) {
      setHelperText(
        `Vælg venligst max ${poll.content.maxVote} mulighed${
          poll?.content.maxVote > 1 ? "er" : ""
        }`
      );
      setError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const selected = vote.filter((o) => o).length;

    if (!validate(vote, true)) {
      return;
    }

    const res = await addVote({
      variables: {
        pollId: poll.id,
        value: vote.reduce((a, e, i) => (e ? a.concat(i) : a), []),
      },
    });
    if (poll.content.folder.mode == "candidates") {
      router.push(`/content/${poll.content.id}`);
    } else {
      router.push(`/poll/${poll.id}`);
    }
  };

  const handleChangeVote = (e: any) => {
    let voteOld;
    if (1 === poll?.content.maxVote && 1 === poll?.content.minVote) {
      voteOld = new Array(opts.length).fill(false);
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

  if (!loading && !(poll && poll.active)) {
    return (
      <Card className={classes.card}>
        <Typography className={classes.text} variant="h5">
          Ingen afstemning nu
        </Typography>
      </Card>
    );
  }

  const Control = poll?.content?.maxVote != 1 ? Checkbox : Radio;

  return (
    <Fade in={!loading}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title={poll?.content.name} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormControl error={error} className={classes.formControl}>
              <FormGroup>
                {opts.map((opt: any, index: number) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    //checked={vote[opt.value]}
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
                className={classes.button}
              >
                Stem
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Fade>
  );
}
