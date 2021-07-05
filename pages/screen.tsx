import React from "react";
import { useStyles, useSession } from "hooks";
import { Card, CardHeader, Grid } from "@material-ui/core";
import { ContentCard, Countdown, PollChart, SpeakerList } from "comps";
import { useSubscription } from "@apollo/client";
import { EVENT_SUB } from "gql";

export default function Screen() {
  const classes = useStyles();
  const [session] = useSession();
  const { data: { event } = {} } = useSubscription(EVENT_SUB, {
    variables: { id: session?.event?.id },
  });

  return (
    <Grid container alignItems="stretch" justify="space-evenly">
      <Grid item xs>
        {event?.pollId ? (
          <PollChart id={event.pollId} />
        ) : event?.contentId ? (
          <ContentCard id={event?.contentId} />
        ) : null}
      </Grid>
      <Grid item xs={2}>
        <Countdown />
        <Card className={classes.card}>
          <CardHeader title="Talerliste" className={classes.cardHeader} />
          <SpeakerList />
        </Card>
      </Grid>
    </Grid>
  );
}
