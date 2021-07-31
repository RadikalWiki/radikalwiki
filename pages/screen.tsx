import React from "react";
import { useStyles, useSession } from "hooks";
import { Card, CardHeader, Grid } from "@material-ui/core";
import { ContentCard, Countdown, PollChart, SpeakerList } from "comps";
import { useSubscription } from "@apollo/client";
import { EVENT_SUB } from "gql";

export default function Screen() {
  const classes = useStyles();
  const [session] = useSession();
  const { data: { event } = {}, loading, error } = useSubscription(EVENT_SUB, {
    variables: { id: session?.event?.id },
  });

  console.log(error)
  console.log(event)
  return (
    <Grid container alignItems="stretch" justify="space-evenly">
      <Grid item xs>
        {event?.poll ? (
          <PollChart poll={event.poll} loading={loading} screen />
        ) : event?.content ? (
          <ContentCard content={event.content} />
        ) : null}
      </Grid>
      <Grid item xs={2}>
        <Countdown timer={event?.timer} />
        <Card className={classes.card}>
          <CardHeader title="Talerliste" className={classes.cardHeader} />
          <SpeakerList />
        </Card>
      </Grid>
    </Grid>
  );
}
