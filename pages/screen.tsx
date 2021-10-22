import React, { Suspense } from "react";
import { useSession } from "hooks";
import { Grid } from "@mui/material";
import { ScreenCard, Countdown, PollChart, SpeakerCard } from "comps";
import { useSubscription } from "gql";
import { Box } from "@mui/system";

export default function Screen() {
  const [session] = useSession();
  const subscription = useSubscription();
  const event = subscription.events_by_pk({ id: session?.event?.id });

  return (
    <Suspense fallback={null}>
      <Box sx={{ height: "100%" }}>
        <Grid container alignItems="stretch" justifyContent="space-evenly">
          <Grid item xs={9}>
            {event?.pollId ? (
              <PollChart pollId={event.pollId} screen />
            ) : event?.contentId ? (
              <>
                {event?.content?.parent?.id && (
                  <ScreenCard id={event.content.parent.id} expanded={false} />
                )}
                <ScreenCard id={event.contentId} />
              </>
            ) : null}
          </Grid>
          <Grid item xs={3}>
            <Countdown />
            <SpeakerCard />
          </Grid>
        </Grid>
      </Box>
    </Suspense>
  );
}
