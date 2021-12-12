import React, { useEffect } from "react";
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
import { Card, CardHeader, Typography, Box } from "@mui/material";
import { useSession } from "hooks";
import { polls, Maybe, useSubscription } from "gql";

const parseData = (poll: Maybe<polls>, screen: boolean, admin: boolean) => {
  if (!poll) {
    return { options: undefined, data: undefined };
  }
  if (poll.active || (poll.hidden && (screen || !admin))) {
    return {
      options: ["Antal Stemmer"],
      data: [{ arg: "none", 0: [poll.votes_aggregate().aggregate?.count()] }],
    };
  }
  let res: Record<string, any> = { arg: "none" };
  for (let i = 0; i < poll.options?.length; i++) {
    res[i] = 0;
  }
  poll.votes().map(({ value }) => {
    value?.map((index: number) => {
      res[index] += 1;
    });
  })

  return { options: poll.options, data: [res] };
};

export default function PollChart({
  pollId,
  screen = false,
}: {
  pollId: string;
  screen?: boolean;
}) {
  const [session, setSession] = useSession();
  const admin = session?.roles?.includes("admin") ?? false;
  const subscription = useSubscription();
  const poll = subscription.polls_by_pk({ id: pollId });
  const folder = subscription.polls_by_pk({ id: pollId })?.content?.folder;
  const voteCount = poll?.content?.folder?.event
    ?.admissions_aggregate()
    .aggregate?.count();

  useEffect(() => {
    if (folder) setSession({ path: folder.parentId ? [{ name: folder.name ?? "", url: `/folder/${folder.id}` }, { name: poll?.content?.name ?? "", url: `/content/${poll?.content?.id}` }, { name: "Afstemning", url: `/poll/${pollId}`, icon: "poll" }] : [] });
  }, [folder]);

  if (poll == null) return null;
  const chartData = parseData(poll, screen, admin) || [];

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        sx={{
          bgcolor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.secondary.contrastText,
        }}
        title={poll?.content?.name}
      />
      {chartData?.options?.map((opt: any, index: number) => (
        <Box
          key={index}
          aria-label={`${opt} fik ${
            chartData.data ? chartData.data[0][index] : 0
          } stemmer`}
        />
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
    </Card>
  );
}
