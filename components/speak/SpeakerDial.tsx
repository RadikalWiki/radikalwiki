import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { avatars } from "comps/speak";
import { useMutation } from "@apollo/client";
import { SPEAK_ADD } from "gql";
import { useStyles, useSession } from "hooks";

export default function SpeakerDial({ event }: { event: any }) {
  const [session] = useSession();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addSpeak] = useMutation(SPEAK_ADD);

  const handleAddSpeak = (type: number) => (_: any) => {
    setOpen(false);
    addSpeak({
      variables: {
        object: {
          userId: session.user.id,
          eventId: session.event.id,
          type: type,
        },
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
