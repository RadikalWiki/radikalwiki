import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { avatars } from "comps/speak";
import { useMutation, useSubscription } from "@apollo/client";
import { EVENT_SUB, SPEAK_ADD } from "gql";
import { useStyles, useSession } from "hooks";

export default function SpeakerDial() {
  const [session] = useSession();
  const {
    loading,
    data: { event } = {},
    error,
  } = useSubscription(EVENT_SUB, {
    variables: { id: session?.event.id },
  });
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addSpeak] = useMutation(SPEAK_ADD);

  const handleAddSpeak = (type: number) => (_: any) => {
    setOpen(false);
    addSpeak({
      variables: {
        userId: session.user.id,
        eventId: session.event.id,
        type: type,
      },
    });
  };

  return (
    <SpeedDial
      hidden={event?.lockSpeak ?? true}
      ariaLabel="Kom på talerliste"
      className={classes.speedDial}
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
