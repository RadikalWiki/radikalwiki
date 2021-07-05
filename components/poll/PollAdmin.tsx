import React from "react";
import { useSession, useStyles } from "hooks";
import { Button } from "@material-ui/core";
import { useMutation, useSubscription } from "@apollo/client";
import { POLL_STOP, EVENT_POLL_SUB } from "gql";
import { useRouter } from "next/router";
import { AdminCard } from "comps/common";

export default function PollAdmin() {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const [stopPoll] = useMutation(POLL_STOP);
  const { loading, data } = useSubscription(EVENT_POLL_SUB);
  const sessionData = data?.session;

  const handleStopPoll = async (_: any) => {
    const res = await stopPoll({ variables: { id: null } });
    const pollId = res.data?.update_poll.returning[0].id;
    router.push(`/poll/${pollId}`);
  };

  if (session?.role != "admin") return null;

  return (
    <AdminCard show={!loading && sessionData?.pollId}>
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
