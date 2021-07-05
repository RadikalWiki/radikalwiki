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
  const { loading, data } = useSubscription(EVENT_POLL_SUB);
  const [addVote] = useMutation(VOTE_ACTION);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const poll = data?.session?.poll;
  const pollType = poll?.content.pollType;

  const [vote, setVote] = useState(
    new Array(pollType?.options.length).fill(false) || []
  );

  const validate = (vote: any, submit: boolean) => {
    const selected = vote.filter((o: any) => o).length;
    if (submit && pollType.minVote > selected) {
      setHelperText(
        `Vælg venligst mindst ${pollType.minVote} mulighed${
          pollType.minVote > 1 ? "er" : ""
        }`
      );
      setError(true);
      return false;
    }

    if (pollType.maxVote < selected) {
      setHelperText(
        `Vælg venligst max ${pollType.maxVote} mulighed${
          pollType.maxVote > 1 ? "er" : ""
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

    await addVote({
      variables: {
        //userId: session.id,
        pollId: poll.id,
        value: vote.reduce((a, e, i) => (e ? a.concat(i) : a), []),
      },
    });
    router.push(`/poll/${poll.id}`);
  };

  const handleChangeVote = (e: any) => {
    let voteOld;
    if (1 === pollType.maxVote && 1 === pollType.minVote) {
      voteOld = new Array(pollType?.options.length).fill(false);
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

  if (!loading && !poll) {
    return (
      <Card className={classes.card}>
        <Typography className={classes.text} variant="h5">
          Ingen afstemning nu
        </Typography>
      </Card>
    );
  }

  const Control = pollType?.maxVote != 1 ? Checkbox : Radio;

  return (
    <Fade in={!loading}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title={poll?.content.name} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormControl error={error} className={classes.formControl}>
              <FormGroup>
                {pollType?.options.map((opt: any) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    //checked={vote[opt.value]}
                    control={
                      <Control
                        checked={vote[opt.value] || false}
                        onChange={handleChangeVote}
                      />
                    }
                    label={opt.name}
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
