import React from "react";
import { Grid } from "@mui/material";
import { SpeakApp, MimeLoader } from "comps";
import { Box } from "@mui/system";
import { Node } from "hooks";

export default function ScreenApp({ node }: { node: Node }) {
  const get = node.useSubsGet();
  const content = get("active");
  const id = content?.id;
  const mimeId = content?.mimeId;
  return (
    <Box sx={{ height: "100%", m: 1 }}>
      <Grid container alignItems="stretch" justifyContent="space-evenly" spacing={1}>
        <Grid item xs>
          {id && <MimeLoader id={id} mimeId={mimeId!} />}
        </Grid>
        <Grid item xs={3}>
          <SpeakApp node={node} />
        </Grid>
      </Grid>
    </Box>
  );
}
