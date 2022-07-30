import React from "react";
import { PollAdmin, PollChart, PollChartSub } from "components";
import { useNode, useScreen } from "hooks";

export default function PollApp({
  id,
}: {
  id?: string;
}) {
  const screen = useScreen();
  const node = useNode({ id });
  const query = node.query;
  return (
    <>
      {!screen && <PollAdmin node={node} />}
      {query?.mutable ? (
        <PollChartSub node={node} />
      ) : (
        <PollChart node={node} />
      )}
    </>
  );
}
