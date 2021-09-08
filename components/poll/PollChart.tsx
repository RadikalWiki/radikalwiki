import React from "react";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  ValueScale,
  EventTracker,
  HoverState,
} from "@devexpress/dx-react-chart";

import { Card, CardHeader, Fade, Typography } from "@material-ui/core";
import { useStyles, useSession } from "hooks";
import { useSubscription } from "@apollo/client";
import { POLL_SUB_RESULT } from "gql";
import { v4 as uuid } from "uuid";

const parseData = (poll: any, screen: boolean, admin: boolean) => {
  let res: any[] = [];
  if (!poll) {
    return res;
  }
  if (poll.active || (poll.hidden && (screen || !admin))) {
    return [{ option: "Antal Stemmer", count: poll.total.aggregate.count }];
  }
  for (const option of poll.options) {
    res.push({ option, count: 0, key: uuid() });
  }
  for (const vote of poll.votes) {
    for (const index of vote.value) {
      res[index].count += 1;
    }
  }

  return res;
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
        {chartData?.map((data: any) => (
          <div aria-label={`${data?.option} fik ${data?.count} stemmer`}></div>
        ))}
        <Chart height={400} data={chartData}>
          <ArgumentAxis />
          <ValueAxis />
          <ValueScale
            modifyDomain={(domain: any) => {
              return [0, voteCount ? voteCount : 10];
            }}
          />

          <BarSeries
            color="#ec407a"
            valueField="count"
            argumentField="option"
          />
          <Animation />
          <EventTracker />
          <Tooltip />
          <HoverState />
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
