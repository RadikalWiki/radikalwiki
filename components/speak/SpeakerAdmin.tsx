import React from "react";
import { Button } from "@material-ui/core";
import { useStyles, useSession } from "hooks";
import { AdminCard } from "components";
import { useMutation, useSubscription } from "@apollo/client";
import { EVENT_UPDATE, EVENT_SUB, EVENT_SPEAK_DEL_ALL } from "gql";

export default function SpeakerAdmin() {
  const [session] = useSession();
  const {
    loading,
    data: { event } = {},
    error,
  } = useSubscription(EVENT_SUB, {
    variables: { id: session?.event?.id },
  });
  const classes = useStyles();
  const [removeSpeakAll] = useMutation(EVENT_SPEAK_DEL_ALL, {
    variables: { id: session?.event?.id },
  });
  const [setLockSpeak] = useMutation(EVENT_UPDATE);

  const handleLockSpeak = async (lockSpeak: boolean) => {
    await setLockSpeak({
      variables: { id: session.event.id, set: { lockSpeak } },
    });
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
        {event?.lockSpeak ? "Åben talerliste" : "Luk talerliste"}
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
