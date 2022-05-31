import React from "react";
import { Grid } from "@mui/material";
import { ScreenCard, SpeakApp } from "comps";
import { Box } from "@mui/system";
import { useNode } from "hooks";
import { PollApp } from "comps/poll";

export default function ScreenApp() {
  const { subGet } = useNode();

  const content = subGet("active");
  const contentId = content?.id;
  const mime = content?.mime?.name!;

  console.log(contentId);

  return (
    <Box sx={{ height: "100%" }}>
      <Grid container alignItems="stretch" justifyContent="space-evenly">
        <Grid item xs>
          {mime == "vote/poll" ? (
            <PollApp id={contentId} screen />
          ) : (
            contentId && <ScreenCard id={contentId} />
          )}
        </Grid>
        <Grid item xs={3}>
          <SpeakApp screen />
        </Grid>
      </Grid>
    </Box>
  );
}
