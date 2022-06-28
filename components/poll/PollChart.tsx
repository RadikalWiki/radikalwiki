import React from "react";
import {
  BarSeries,
  Chart as DxChart,
  ValueAxis,
  Tooltip,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  ValueScale,
  EventTracker,
  HoverState,
  Stack,
} from "@devexpress/dx-react-chart";
import { Card, CardHeader, Box } from "@mui/material";
import { nodes, Maybe, useQuery } from "gql";

const Chart = DxChart as any;

const parseData = (poll: Maybe<nodes>, screen: boolean) => {
  const count = poll
    ?.children_aggregate({ where: { mimeId: { _eq: "vote/vote" } } })
    .aggregate?.count();
  const data = poll?.data();

  const owner = poll?.isContextOwner;
  const mutable = poll?.mutable;
  const { options, hidden } =
    data && poll?.mimeId == "vote/poll"
      ? data
      : { options: [], hidden: true };

  const opts = [...Array(options.length).keys()].map((opt: number) => [opt, 0]);
  const votes = poll?.children({
    where: { mimeId: { _eq: "vote/vote" } },
  });
  // TODO: validate
  const acc = votes
    ?.map(({ data }) => data())
    .flat()
    .reduce((acc, e) => acc.set(e, acc.get(e) + 1), new Map(opts as any));
  const res = { arg: "none", ...[...acc.values()] };

  if (mutable || (hidden && (screen || !owner))) {
    return {
      options: ["Antal Stemmer"],
      data: [{ arg: "none", 0: count }],
    };
  }
  return { options, data: [res] };
};

export default function PollChart({
  id,
  screen = false,
}: {
  id: string;
  screen?: boolean;
}) {
  const query = useQuery();
  const poll = query.node({ id });

  const title = poll?.name;
  const chartData = parseData(poll, screen);

  // isContextOwner is undefined during first fetch
  if (!chartData.options.length) return null;

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        sx={{
          bgcolor: (t) => t.palette.secondary.main,
          color: (t) => t.palette.secondary.contrastText,
        }}
        title={title}
      />
      <Chart data={chartData.data} rotated>
        <ValueAxis />
        <ValueScale
          modifyDomain={(domain: any) => {
            //return [0, voteCount ? voteCount : 20];
            return [0, 20];
          }}
        />

        {chartData.options?.map((opt: string, index: number) => (
          <BarSeries
            name={opt}
            valueField={`${index}`}
            argumentField="arg"
            key={index}
          />
        ))}
        <Animation />
        <EventTracker />
        <Tooltip />
        <HoverState />
        <Legend position="bottom" />
        <Stack />
      </Chart>
    </Card>
  );
}
