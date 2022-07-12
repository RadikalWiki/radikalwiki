import React from "react";
import { Grid } from "@mui/material";
import { ScreenCard, SpeakApp, MimeLoader } from "comps";
import { Box } from "@mui/system";
import { useNode } from "hooks";

export default function ScreenApp() {
  const { subGet } = useNode();

  const content = subGet("active");

  return (
    <Box sx={{ height: "100%" }}>
      <Grid container alignItems="stretch" justifyContent="space-evenly">
        <Grid item xs>
          <MimeLoader id={content?.id} />
        </Grid>
      </Grid>
    </Box>
  );
}

//          <App
//          {mime == "vote/poll" ? (
//            <PollApp id={contentId} screen />
//          ) : (
//            contentId && <ScreenCard id={contentId} />
//          )}
//        </Grid>
//        <Grid item xs={3}>
//          <SpeakApp screen />