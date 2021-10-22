import React from "react";
import { Button } from "@mui/material";
import { useSession } from "hooks";
import { AdminCard } from "components";
import { useMutation, useSubscription } from "gql"

export default function SpeakerAdmin() {
  const [session] = useSession();
  const subscription = useSubscription();
  const event = subscription.events_by_pk({ id: session?.event?.id })
  const [deleteSpeakAll] = useMutation(
    (mutation, args) => {
      return mutation.delete_speaks({
        where: { eventId: { _eq: session?.event?.id } }
      })?.affected_rows;
    }
  );
  const [setLockSpeak] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_events_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    }
  );
  const handleLockSpeak = async (lockSpeak: boolean) => {
    await setLockSpeak({
      args: { id: session?.event?.id as string, set: { lockSpeak } },
    });
  };

  if (!event) return null;

  return (
    <AdminCard title="Administrer Talerlisten">
      <Button
        color="secondary"
        variant="contained"
        size="large"
        sx={{ color: "#fff", m: 2 }}
        onClick={() => handleLockSpeak(!event?.lockSpeak)}
      >
        {event?.lockSpeak ? "Åben" : "Luk"}
      </Button>

      <Button
        color="secondary"
        variant="contained"
        size="large"
        sx={{ color: "#fff", m: 2 }}
        onClick={() => deleteSpeakAll()}
      >
        Ryd
      </Button>
    </AdminCard>
  );
}
