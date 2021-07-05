import React from "react";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, ValueScale } from "@devexpress/dx-react-chart";

import { Card, CardHeader, Fade, Typography, Link } from "@material-ui/core";
import { useStyles } from "hooks";
import { useSubscription } from "@apollo/client";
import { POLL_SUB_RESULT } from "gql";
import { Link as NextLink } from "comps";
import { v4 as uuid } from "uuid";

const parseData = (poll: any) => {
  let res: any[] = [];
  if (!poll) {
    return res;
  }
  if (poll.active) {
    return [{ option: "Antal Stemmer", count: poll.total.aggregate.count }];
  }
  for (const opt of poll.content.pollType.options) {
    res.push({ option: opt.name, count: 0, key: uuid() });
  }
  for (const vote of poll.votes) {
    for (const index of vote.value) {
      res[index].count += 1;
    }
  }

  return res;
};

export default function PollChart({
  interactive = false,
  id,
}: {
  interactive?: boolean;
  active?: boolean;
  id?: string;
}) {
  const classes = useStyles();

  const { data, loading } = useSubscription(POLL_SUB_RESULT, {
    variables: { id },
  });

  const poll = Array.isArray(data?.poll) ? data.poll[0] : data?.poll;
  const chartData = parseData(poll) || [];

  return (
    <Fade in={!loading} key={uuid()}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title={poll?.content.name} />
        {interactive && (
          <Typography className={classes.text} variant="caption">
            <Link
              component={NextLink}
              color="primary"
              href={`/content/${poll?.content?.id}`}
            >
              {`Link til ${poll?.content?.name}`}
            </Link>
          </Typography>
        )}

        <div className={classes.pad} />
        {chartData?.map((data: any) => (
          <div aria-label={`${data?.option} fik ${data?.count} stemmer`}></div>
        ))}
        <Chart height={400} data={chartData}>
          <ArgumentAxis />
          <ValueAxis />
          <ValueScale
            modifyDomain={(domain: any) => {
              return [0, domain[1] ? domain[1] : 1];
            }}
          />

          <BarSeries
            color="#ec407a"
            valueField="count"
            argumentField="option"
          />
          <Animation />
        </Chart>

        <Typography className={classes.textChart}>
          Afgivne stemmer: {poll?.total.aggregate.count}
        </Typography>
      </Card>
    </Fade>
  );
}
