import React, { Suspense } from "react";
import { Grid } from "@mui/material";
import { Countdown, SpeakerAdmin, SpeakerDial, SpeakerCard } from "comps";

export default function Speak() {
  return (
    <Suspense fallback={null}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Suspense fallback={null}>
            <SpeakerAdmin />
          </Suspense>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Suspense fallback={null}>
            <Countdown interactive />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={null}>
            <SpeakerCard interactive />
          </Suspense>
        </Grid>
      </Grid>
      <SpeakerDial />
    </Suspense>
  );
}
