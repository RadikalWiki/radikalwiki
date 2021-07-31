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
  if (poll.content.folder.mode === "changes") {
    res[0] = { option: "For", count: 0, key: uuid() };
    res[1] = { option: "Imod", count: 0, key: uuid() };
    res[2] = { option: "Blank", count: 0, key: uuid() };
  } else {
    for (const child of poll.content.children) {
      res.push({ option: child.name, count: 0, key: uuid() });
    }
    res.push({ option: "Blank", count: 0, key: uuid() });
  }
  for (const vote of poll.votes) {
    for (const index of vote.value) {
      res[index].count += 1;
    }
  }

  return res;
};

export default function PollChart({
  loading,
  poll,
}: {
  loading: boolean;
  poll: any;
}) {
  const classes = useStyles();

  const chartData = parseData(poll) || [];

  return (
    <Fade in={!loading} key={uuid()}>
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

        {!poll?.active &&
        <Typography className={classes.textChart}>
          Afgivne stemmer: {poll?.total.aggregate.count}
        </Typography>
        }
      </Card>
    </Fade>
  );
}
