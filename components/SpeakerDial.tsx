import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { avatars } from "components";
import { useMutation, useSubscription } from "@apollo/client";
import { EVENT_SUB, SPEAK_ADD } from "gql";
import { useStyles, useSession } from "hooks";

export default function SpeakerDial() {
  const { session } = useSession({ redirectTo: "/login" });
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addSpeak] = useMutation(SPEAK_ADD);
  const { data: { event } = {} } = useSubscription(EVENT_SUB);

  const handleAddSpeak = (type: number) => (_: any) => {
    setOpen(false);
    addSpeak({ variables: { id: session.id, type: type } });
  };

  return (
    <SpeedDial
      hidden={event?.lockSpeak || false}
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
          tooltipPlacement="right"
          onClick={handleAddSpeak(action.value)}
        />
      ))}
    </SpeedDial>
  );
}
