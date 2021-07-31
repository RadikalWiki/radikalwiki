import React from "react";
import { Card, CardHeader } from "@material-ui/core";
import { useSession, useStyles } from "hooks";
import { Countdown, SpeakerAdmin, SpeakerDial, SpeakerList } from "comps";
import { useSubscription } from "@apollo/client";
import { EVENT_SUB } from "gql";

export default function Speak() {
  const [session] = useSession();
  const classes = useStyles();
  const {
    loading,
    data: { event } = {},
    error,
  } = useSubscription(EVENT_SUB, {
    variables: { id: session?.event?.id },
  });

  return (
    <>
      <SpeakerAdmin />
      <Countdown timer={event?.timer} interactive />
      <Card className={classes.speakerCard}>
        <CardHeader title="Talerliste" className={classes.cardHeader} />
        <SpeakerList interactive />
      </Card>
      <SpeakerDial event={event} />
    </>
  );
}
