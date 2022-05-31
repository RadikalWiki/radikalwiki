import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { Save } from "@mui/icons-material";
import { order_by, useMutation, useQuery } from "gql";
import { useRouter } from "next/router";

export default function SortFab({
  folder,
  elements,
  nodeId,
}: {
  folder: any;
  elements: any;
  nodeId?: string;
}) {
  const router = useRouter();
  const query = useQuery();
  const [updateNode] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.updateNode({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries: [
        query.node({ id: folder.id }),
        query
          .node({ id: nodeId })
          ?.children({ order_by: [{ priority: order_by.asc }] }),
      ],
      awaitRefetchQueries: true,
    }
  );

  const handleClick = async () => {
    const proms = elements.map(async (e: any, index: number) => {
      const set = { priority: index };
      return updateNode({ args: { id: e.id, set } });
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
