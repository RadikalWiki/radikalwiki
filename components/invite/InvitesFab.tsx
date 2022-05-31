import React from "react";
import { Fab } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import {
  members_constraint,
  members_insert_input,
  order_by,
  useMutation,
  useQuery,
} from "gql";
import { CSVReader } from "comps";

export default function InvitesFab({ id }: { id?: string }) {
  const query = useQuery();
  const node = query.node({ id });
  const [addInvites] = useMutation(
    (mutation, args: members_insert_input[]) => {
      return mutation.insertMembers({
        objects: args,
        on_conflict: {
          constraint: members_constraint.members_parent_id_email_key,
          update_columns: [],
        },
      })?.affected_rows;
    },
    {
      refetchQueries: [
        node?.members({ order_by: [{ user: { displayName: order_by.asc } }] }),
      ],
    }
  );

  const handleFile = async (fileData: any) => {
    const invites = fileData
      .filter((r: any) => r?.email)
      .map((r: any) => ({
        name: `${r.fornavn} ${r.efternavn}`,
        email: r?.email?.toLowerCase(),
        parentId: id,
      }));
    await addInvites({
      args: invites,
    });
  };

  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <CSVReader parseOptions={parseOptions} onFileLoaded={handleFile}>
      <Fab
        sx={{
          position: "fixed",
          bottom: (t) => t.spacing(9),
          right: (t) => t.spacing(3),
        }}
        variant="extended"
        color="primary"
        aria-label="Tilføj adgang"
        component="span"
      >
        <GroupAdd />
        import
      </Fab>
    </CSVReader>
  );
}
