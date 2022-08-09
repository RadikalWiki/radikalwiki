import React from "react";
import { PollAdmin, PollChart, PollChartSub } from "components";
import { Node, useScreen } from "hooks";
import { Stack } from "@mui/material";

export default function PollApp({ node }: { node: Node }) {
  const screen = useScreen();
  const query = node.useQuery();

  return (
    <Stack spacing={1}>
      {!screen && <PollAdmin node={node} />}
      {query?.mutable ? (
        <PollChartSub node={node} />
      ) : (
        <PollChart node={node} />
      )}
    </Stack>
  );
}
