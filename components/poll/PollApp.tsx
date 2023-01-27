import React from "react";
import { PollAdmin } from "comps";
import { Node, useScreen } from "hooks";
import { Stack } from "@mui/material";

export default function PollApp({ node }: { node: Node }) {
  const screen = useScreen();

  return (
    <Stack spacing={1}>
      {!screen && <PollAdmin node={node} />}
      {/* <PollChartSub node={node} /> */}
    </Stack>
  );
}
