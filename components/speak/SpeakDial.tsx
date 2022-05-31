import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { avatars } from "comps";
import { useSession, useNode } from "hooks";
import { useUserDisplayName } from "@nhost/react";

export default function SpeakDial({ id }: { id: string }) {
  const [session] = useSession();
  const displayName = useUserDisplayName();
  const [open, setOpen] = useState(false);
  const { sub: speakerlist, insert } = useNode({ id });

  const mimeId = speakerlist?.mimes({
    where: { name: { _eq: "speak/speak" } },
  })?.[0]?.id;
  const parentId = speakerlist?.id;
  const handleAddSpeak = (type: string) => (_: any) => {
    setOpen(false);
    const time = new Date(
      new Date().getTime() + (session?.timeDiff ?? 0)
    ).toLocaleString();
    insert({
      name: displayName,
      namespace: `${displayName?.toLocaleLowerCase()}-${time}`,
      mimeId: mimeId,
      data: type,
      parentId,
    });
  };

  return (
    <SpeedDial
      ariaLabel="Kom på talerlisten"
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
      {Object.entries(avatars).map(
        ([key, action]) =>
          (speakerlist?.mutable || key !== "0") && (
            <SpeedDialAction
              key={key}
              icon={action.avatar}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleAddSpeak(key)}
            />
          )
      )}
    </SpeedDial>
  );
}
