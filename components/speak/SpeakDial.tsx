import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { avatars } from "comps";
import { useSession, useNode, Node } from "hooks";
import { useUserDisplayName } from "@nhost/react";

export default function SpeakDial({ node }: { node: Node }) {
  const [session] = useSession();
  const displayName = useUserDisplayName();
  const [open, setOpen] = useState(false);

  const get = node.useSubsGet();
  const speakerlist = get("speakerlist");
  const insert = node.useInsert({ refetch: false });
  const id = speakerlist?.id;

  const handleAddSpeak = (type: string) => (_: any) => {
    setOpen(false);
    const time = new Date(
      new Date().getTime() + (session?.timeDiff ?? 0)
    ).toLocaleString();
    insert({
      name: displayName,
      parentId: id,
      namespace: `${displayName?.toLocaleLowerCase()}-${time}`,
      mimeId: "speak/speak",
      data: type
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
