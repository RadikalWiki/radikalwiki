import React from "react";
import { Button } from "@mui/material";
import { useSession } from "hooks";
import { AdminCard, AutoButton } from "components";
import { useMutation, useSubscription } from "gql";
import { Clear, Lock, LockOpen } from "@mui/icons-material";

export default function SpeakerAdmin() {
  const [session] = useSession();
  const subscription = useSubscription();
  const event = subscription.events_by_pk({ id: session?.event?.id });
  const [deleteSpeakAll] = useMutation((mutation, args) => {
    return mutation.delete_speaks({
      where: { speakerlistId: { _eq: event?.speakerlistId } },
    })?.affected_rows;
  });
  const [updateSpeakerlist] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_speakerlists_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    }
  );
  const handleLockSpeak = async (locked: boolean) => {
    await updateSpeakerlist({
      args: { id: event?.speakerlistId as string, set: { locked } },
    });
  };

  if (!event) return null;

  return (
    <AdminCard title="Administrer Talerlisten">
      <AutoButton
        text={event?.speakerlist?.locked ? "Åben" : "Luk"}
        icon={event?.speakerlist?.locked ? <Lock /> : <LockOpen />}
        onClick={() => handleLockSpeak(!event?.speakerlist?.locked)}
      />
      <AutoButton
        text="Ryd"
        icon={<Clear />}
        onClick={() => deleteSpeakAll()}
      />
    </AdminCard>
  );
}
