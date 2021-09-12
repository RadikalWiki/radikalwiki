import React from "react";
import {
  BarSeries,
  Chart,
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

import { Card, CardHeader, Fade, Typography } from "@material-ui/core";
import { useStyles, useSession } from "hooks";
import { useSubscription } from "@apollo/client";
import { POLL_SUB_RESULT } from "gql";

const parseData = (poll: any, screen: boolean, admin: boolean) => {
  if (!poll) {
    return { options: [], data: []};
  }
  if (poll.active || (poll.hidden && (screen || !admin))) {
    return {
      options: ["Antal Stemmer"],
      data: [{ 0: poll.total.aggregate.count }],
    };
  }
  let res: Record<string, any> = { arg: "none" };
  for (let i = 0; i < poll.options.length; i++) {
    res[i] = 0;
  }
  for (const vote of poll.votes) {
    for (const index of vote.value) {
      res[index] += 1;
    }
  }

  return { options: poll.options, data: [res] };
};

export default function PollChart({
  pollId,
  screen = false,
}: {
  pollId: string;
  screen?: boolean;
}) {
  const [session] = useSession();
  const classes = useStyles();
  const { data, loading } = useSubscription(POLL_SUB_RESULT, {
    variables: { id: pollId },
  });
  const poll = data?.poll;

  const admin = session?.roles.includes("admin");
  const chartData = parseData(poll, screen, admin) || [];
  const voteCount =
    poll?.content.folder.event.admissions_aggregate.aggregate.count;

  if (!loading && !poll) return null;

  return (
    <Fade in={!loading}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title={poll?.content.name} />
        {chartData?.options?.map((opt: any, index: number) => (
          <div
            key={index}
            aria-label={`${opt} fik ${
              chartData.data ? chartData.data[0][index] : 0
            } stemmer`}
          ></div>
        ))}
        <Chart data={chartData.data} rotated>
          <ValueAxis />
          <ValueScale
            modifyDomain={(domain: any) => {
              return [0, voteCount ? voteCount : 10];
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

        {!(poll?.active || (poll?.hidden && (screen || !admin))) && (
          <Typography className={classes.textChart}>
            Antal Stemmer: {poll?.total.aggregate.count}/{voteCount}
          </Typography>
        )}
      </Card>
    </Fade>
  );
}
