import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { avatars } from "comps";
import { speaks_insert_input, useMutation, useSubscription } from "gql";
import { useSession } from "hooks";

export default function SpeakerDial() {
  const [session] = useSession();
  const subscription = useSubscription();
  const event = subscription.events_by_pk({ id: session?.event?.id })
  const [open, setOpen] = useState(false);
  const [addSpeaks] = useMutation((mutation, args: speaks_insert_input[]) => {
    return mutation.insert_speaks({ objects: args })?.affected_rows;
  });

  const handleAddSpeak = (type: number) => (_: any) => {
    setOpen(false);
    addSpeaks({
      args: [
        {
          userId: session?.user?.id,
          eventId: session?.event?.id,
          type: type,
        },
      ],
    });
  };

  return (
    <SpeedDial
      hidden={event?.lockSpeak ?? true}
      ariaLabel="Kom på talerliste"
      sx={{
        position: "fixed",
        bottom: (t) => t.spacing(9),
        right: (t) => t.spacing(3),
      }}
      icon={<SpeedDialIcon />}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
    >
      {avatars.map((action) => (
        <SpeedDialAction
          key={action.value}
          icon={action.avatar}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={handleAddSpeak(action.value)}
        />
      ))}
    </SpeedDial>
  );
}
