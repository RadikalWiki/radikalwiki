import React from "react";
import { useSession, useStyles } from "hooks";
import { Button } from "@material-ui/core";
import { useMutation, useSubscription } from "@apollo/client";
import { POLL_STOP, EVENT_POLL_SUB } from "gql";
import { useRouter } from "next/router";
import { AdminCard } from "comps/common";

export default function PollAdmin({
  id,
  loading,
  data,
}: {
  id: string;
  loading: boolean;
  data: any;
}) {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const [stopPoll] = useMutation(POLL_STOP);

  const handleStopPoll = async (_: any) => {
    const res = await stopPoll({ variables: { id: null } });
    const pollId = res.data?.update_poll.returning[0].id;
    router.push(`/poll/${pollId}`);
  };

  console.log(data);
  if (!session?.roles.includes("admin") || !data?.poll.active) return null;

  return (
    <AdminCard show={true}>
      <Button
        size="large"
        color="secondary"
        variant="contained"
        className={classes.adminButton}
        onClick={handleStopPoll}
      >
        Stop afstemning
      </Button>
    </AdminCard>
  );
}
