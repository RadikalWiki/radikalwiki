import React from "react";
import { PollAdmin, PollChart, PollChartSub } from "components";
import { Node, useScreen } from "hooks";

export default function PollApp({ node }: { node: Node }) {
  const screen = useScreen();
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
