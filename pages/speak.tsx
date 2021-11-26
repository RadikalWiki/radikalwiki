import React, { Suspense } from "react";
import { Grid } from "@mui/material";
import { Countdown, SpeakerAdmin, SpeakerDial, SpeakerCard, SpeakerAdminCard } from "comps";
import { useSession } from "hooks";

export default function Speak() {
  const [session] = useSession();

  return (
    <Suspense fallback={null}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Suspense fallback={null}>
            <Countdown interactive />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={null}>
            {session?.roles?.includes("admin") ? (
              <SpeakerAdminCard />
            ) : (
              <SpeakerCard interactive />
            )}
          </Suspense>
        </Grid>
      </Grid>
      <SpeakerDial />
    </Suspense>
  );
}
