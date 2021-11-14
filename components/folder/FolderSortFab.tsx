import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useMutation, useQuery } from "gql";
import { useRouter } from "next/router";

export default function FolderSortFab({
  folder,
  elements,
}: {
  folder: any;
  elements: any;
}) {
  const router = useRouter();
  const query = useQuery();
  const [updateFolder] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_folders_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries: [query.folders_by_pk({ id: folder.id })],
      awaitRefetchQueries: true
    }
  );
  const [updateContent] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_contents_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries: [query.folders_by_pk({ id: folder.id })],
      awaitRefetchQueries: true
    }
  );

  const handleClick = async () => {
    const proms = elements.map(async (e: any, index: number) => {
      const set = { priority: index };
      if (e.type === "folder") {
        return updateFolder({ args: { id: e.id, set } });
      } else if (e.type === "content") {
        return updateContent({ args: { id: e.id, set } });
      }
    });
    await Promise.all(proms)
    router.push(`/folder/${folder.id}`);
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
