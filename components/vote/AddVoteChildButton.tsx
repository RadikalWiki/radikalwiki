import React, { useState } from "react";
import { AddContentDialog, AutoButton } from "comps";
import { PlusOne } from "@mui/icons-material";
import { useNode } from "hooks";
import { useUserDisplayName } from "@nhost/react";

export default function AddVoteChildButton({ id }: { id: string }) {
  const displayName = useUserDisplayName();
  const [open, setOpen] = useState(false);
  const { query: node } = useNode({ id });

  const name = node?.mimeId == "vote/position" ? displayName : "";

  const handleSubmit = async () => {
    setOpen(true);
  };

  if (!node?.attachable || !node?.isOwner) return null;

  return (
    <>
      <AutoButton
        text="Ændringsforslag"
        icon={<PlusOne />}
        onClick={handleSubmit}
      />
      <AddContentDialog
        initName={name}
        id={id}
        mimes={["vote/change"]}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
