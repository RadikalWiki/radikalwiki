import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "hooks";
import { AdminCard } from "components";
import { useMutation, useSubscription } from "@apollo/client";
import { EVENT_SET_LOCK_SPEAK, EVENT_SUB, SPEAK_DEL_ALL } from "gql";

export default function SpeakerAdmin() {
  const classes = useStyles();
  const [removeSpeakAll] = useMutation(SPEAK_DEL_ALL);
  const [setLockSpeak] = useMutation(EVENT_SET_LOCK_SPEAK);
  const { loading, data: { event } = {} } = useSubscription(EVENT_SUB);

  const handleLockSpeak = async (lockSpeak: boolean) => {
    await setLockSpeak({ variables: { lockSpeak } });
  };

  return (
    <AdminCard show={!loading}>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.adminButton}
        onClick={() => handleLockSpeak(!event?.lockSpeak)}
      >
        {event?.lockSpeak ? "Åbent talerliste" : "Luk talerliste"}
      </Button>

      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.adminButton}
        onClick={() => removeSpeakAll()}
      >
        Ryd talerliste
      </Button>
    </AdminCard>
  );
}
