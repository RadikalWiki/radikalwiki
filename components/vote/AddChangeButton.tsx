import React, { useState } from "react";
import { AddContentDialog, AutoButton } from "comps";
import { PlusOne } from "@mui/icons-material";
import { Node, useNode } from "hooks";
import { useUserDisplayName } from "@nhost/react";

export default function AddChangeButton({ node }: { node: Node }) {
  const displayName = useUserDisplayName();
  const [open, setOpen] = useState(false);
  const query = node.query;

  const name = query?.mimeId == "vote/position" ? displayName : "";

  const handleSubmit = async () => {
    setOpen(true);
  };

  if (!query?.inserts()?.some(mime => mime.id == "vote/change")) return null;

  return (
    <>
      <AutoButton
        text="Ændringsforslag"
        icon={<PlusOne />}
        onClick={handleSubmit}
      />
      <AddContentDialog
        initName={name}
        node={node}
        mimes={["vote/change"]}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
