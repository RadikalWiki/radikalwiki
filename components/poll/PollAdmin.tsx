import React from "react";
import { useSession, useStyles } from "hooks";
import { Button } from "@material-ui/core";
import { useMutation, useSubscription } from "@apollo/client";
import { POLL_STOP, POLL_SUB_ADMIN } from "gql";
import { useRouter } from "next/router";
import { AdminCard } from "comps";

export default function PollAdmin({ pollId }: { pollId: string }) {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const [stopPoll] = useMutation(POLL_STOP);
  const { data, loading } = useSubscription(POLL_SUB_ADMIN, {
    variables: { id: pollId },
  });

  const handleStopPoll = async (_: any) => {
    await stopPoll();
    router.push(`/poll/${pollId}`);
  };

  if (!session?.roles.includes("admin") || !data?.poll?.active) return null;

  return (
    <AdminCard title="Administrer Afstemning" show={!loading}>
      <Button
        size="large"
        color="secondary"
        variant="contained"
        className={classes.adminButton}
        onClick={handleStopPoll}
      >
        Stop
      </Button>
    </AdminCard>
  );
}
