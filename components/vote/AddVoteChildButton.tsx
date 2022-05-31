import React, { useState } from "react";
import { AddContentDialog, AutoButton } from "comps";
import { PlusOne } from "@mui/icons-material";
import { useNode } from "hooks";
import { useUserDisplayName } from "@nhost/react";

export default function AddVoteChildButton({ id }: { id: string }) {
  const displayName = useUserDisplayName();
  const [open, setOpen] = useState(false);
  const { query: node } = useNode({ id });

  const mime = node?.mimes({ where: { name: { _eq: "vote/change" } } })?.[0];

  const name = node?.mime?.name == "vote/position" ? displayName : "";

  const handleSubmit = async () => {
    setOpen(true);
  };

  if (!node?.mutable || !node.isOwner) return null;

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
        mimes={[mime!]}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
