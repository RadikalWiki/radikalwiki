import React from "react";
import { PollAdmin, PollChart, PollChartSub } from "components";
import { useNode } from "hooks";

export default function PollApp({
  id,
  screen,
}: {
  id?: string;
  screen?: boolean;
}) {
  const { query } = useNode({ id });
  return (
    <>
      {!screen && <PollAdmin id={query?.id} />}
      {query?.mutable ? (
        <PollChartSub screen={screen} id={query?.id} />
      ) : (
        <PollChart id={query?.id} screen={screen} />
      )}
    </>
  );
}
