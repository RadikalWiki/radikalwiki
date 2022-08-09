import React, { useEffect } from "react";
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
import { Card, CardHeader, Typography, Box, CardContent } from "@mui/material";
import { Node, useScreen, useSession } from "hooks";
import { nodes, Maybe, useSubscription, String_comparison_exp } from "gql";

const Chart = DxChart as any;

const parseData = (poll: Maybe<nodes> | undefined, screen: boolean) => {
  const count = poll
    ?.children_aggregate({ where: { mimeId:{ _eq: "vote/vote" } } })
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

export default function PollChartSub({
  node
}: {
  node: Node;
}) {
  const screen = useScreen();
  const poll = node.useSubs();

  // Todo proper detection
  //const voters = poll?.context?.members_aggregate().aggregate?.count() ?? 10;

  //const voteCount = group?.sub?.members_aggregate().aggregate?.count()
  //poll?.context?.mimes({ where: { name: { _eq: "vote/vote" } }) members_aggregate({ where: { parent: { permissions: { _and: [{ mimeId: { _eq: "vote/vote" } } ] } } }}).aggregate?.count
  // const voters = poll?.context?.mimes({
  //   where: {
  //     _and: [
  //       { name: { _eq: "vote/vote" } },
  //       {
  //         permisssions: {
  //           _and: [
  //             { insert: { _eq: true } },
  //             { node: { members: { active: { _eq: true } } } },
  //           ],
  //         },
  //       },
  //     ],
  //   },
  // });

  const title = poll?.name;
  const chartData = parseData(poll, screen);

  if (poll?.isContextOwner == undefined) return null;

  return (
    <Card sx={{ m: 0 }}>
      <CardHeader
        sx={{
          bgcolor: (t) => t.palette.secondary.main,
          color: (t) => t.palette.secondary.contrastText,
        }}
        title={title}
      />
      {chartData?.options?.map((opt: any, index: number) => (
        <Box key={index} />
      ))}
      <Chart data={chartData.data} rotated>
        <ValueAxis />
        <ValueScale
          modifyDomain={(domain: any) => {
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
      {/* 
      <CardContent>
        <Typography>{`${count} / ${voters} stemmer`}</Typography>
      </CardContent> */}
    </Card>
  );
}
