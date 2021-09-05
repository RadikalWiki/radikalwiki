import React from "react";
import { Card, CardHeader, Grid } from "@material-ui/core";
import { useSession, useStyles } from "hooks";
import { Countdown, SpeakerAdmin, SpeakerDial, SpeakerCard } from "comps";
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
      <Grid container>
        <Grid item xs={12} sm={6}>
          <SpeakerAdmin />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Countdown interactive />
        </Grid>
        <Grid item xs={12}>
          <SpeakerCard interactive />
        </Grid>
      </Grid>
      <SpeakerDial event={event} />
    </>
  );
}
