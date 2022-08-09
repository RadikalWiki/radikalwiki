import React, { useState } from "react";
import { AddContentDialog, AutoButton } from "comps";
import { PlusOne } from "@mui/icons-material";
import { Node, useNode } from "hooks";

export default function AddQuestionButton({ node }: { node: Node }) {
  const [open, setOpen] = useState(false);
  const query = node.useQuery();

  const handleSubmit = async () => {
    setOpen(true);
  };

  if (!query?.inserts()?.some(mime => mime.id == "vote/question")) return null;

  return (
    <>
      <AutoButton
        text="Spørgsmål"
        icon={<PlusOne />}
        onClick={handleSubmit}
      />
      <AddContentDialog
        node={node}
        mimes={["vote/question"]}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
