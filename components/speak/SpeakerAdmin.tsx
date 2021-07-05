import React from "react";
import { Button } from "@material-ui/core";
import { useStyles, useSession } from "hooks";
import { AdminCard } from "components";
import { useMutation, useSubscription } from "@apollo/client";
import { EVENT_SET_LOCK_SPEAK, EVENT_SUB, SPEAK_DEL_ALL } from "gql";

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
  const [removeSpeakAll] = useMutation(SPEAK_DEL_ALL, {
    variables: { eventId: session?.event.id, lockSpeak: false },
  });
  const [setLockSpeak] = useMutation(EVENT_SET_LOCK_SPEAK, {
    variables: { eventId: session?.event.id, lockSpeak: true },
  });

  const handleLockSpeak = async (lockSpeak: boolean) => {
    const res = await setLockSpeak({
      variables: { eventId: session.event.id, lockSpeak },
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
