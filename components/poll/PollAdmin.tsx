import React from "react";
import { useSession } from "hooks";
import { Button } from "@mui/material";
import { useMutation, useSubscription } from "gql";
import { useRouter } from "next/router";
import { AdminCard } from "comps";

export default function PollAdmin({ pollId }: { pollId: string }) {
  const [session] = useSession();
  const router = useRouter();
  const [stopPoll] = useMutation((mutation, args) => {
    return mutation.update_polls_by_pk({ pk_columns: { id: pollId }, _set: { active: false } })
  });
  const subscription = useSubscription();
  const poll = subscription.polls_by_pk({ id: pollId })

  const handleStopPoll = async (_: any) => {
    await stopPoll();
    router.push(`/poll/${pollId}`);
  };

  if (!session?.roles?.includes("admin") || !poll?.active) return null;

  return (
    <AdminCard title="Administrer Afstemning">
      <Button
        size="large"
        color="secondary"
        variant="contained"
        sx={{ color: "#fff", m: 2 }}
        onClick={handleStopPoll}
      >
        Stop
      </Button>
    </AdminCard>
  );
}
