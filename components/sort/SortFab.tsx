import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Node } from "hooks";

export default function SortFab({
  node,
  elements,
}: {
  node: Node;
  elements: any;
}) {
  const router = useRouter();

  const handleClick = async () => {
    const proms = elements.map(async ({ id }: any, index: number) => {
      const set = { index };
      return node.update({ id, set });
    });
    await Promise.all(proms);
    router.push(router.asPath.split("?")[0]);
  };

  return (
    <Tooltip title="Gem sortering">
      <Fab
        sx={{
          position: "fixed",
          bottom: (t) => t.spacing(9),
          right: (t) => t.spacing(3),
        }}
        color="primary"
        onClick={handleClick}
      >
        <Save />
      </Fab>
    </Tooltip>
  );
}
