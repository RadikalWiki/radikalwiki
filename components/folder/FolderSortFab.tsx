import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useMutation } from "gql";
import { useRouter } from "next/router";

export default function FolderSortFab({
  folder,
  elements,
}: {
  folder: any;
  elements: any;
}) {
  const router = useRouter();
  const [updateFolder] = useMutation(
    (mutation, args: { id: string, set: any }) => {
      return mutation.update_folders_by_pk({ pk_columns: { id: args.id }, _set: args.set });
    }
  );
  const [updateContent] = useMutation(
    (mutation, args: { id: string, set: any }) => {
      return mutation.update_contents_by_pk({ pk_columns: { id: args.id }, _set: args.set });
    }
  );

  const handleClick = () => {
    elements.map(async (e: any, index: number) => {
      const set = { priority: index };
      if (e.type === "folder") {
        await updateFolder({ args: { id: e.id, set } });
      } else if (e.type === "content") {
        await updateContent({ args: { id: e.id, set } });
      }
    });
    router.push(`/folder/${folder.id}`);
  };

  return (
    <Tooltip title="Gem sortering">
      <Fab sx={{
          position: "fixed",
          bottom: 9,
          right: 3,
        }} color="primary" onClick={handleClick}>
        <Save />
      </Fab>
    </Tooltip>
  );
}
