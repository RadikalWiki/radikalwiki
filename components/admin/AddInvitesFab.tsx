import React from "react";
import { Fab } from "@mui/material";
import { useMutation, members_insert_input, members_constraint } from "gql";
import { CSVReader } from "comps";

export default function AddInvitesFab() {
  const [addIdentities] = useMutation(
    (mutation, args: members_insert_input[]) => {
      return mutation.insertMembers({
        objects: args,
        on_conflict: {
          constraint: members_constraint.members_pkey,
          update_columns: [],
        },
      })?.affected_rows;
    }
  );

  const handleFile = async (fileData: any) => {
    const ids: members_insert_input[] = fileData.reduce(
      (a: any, m: any) =>
        m.email && !a.includes(m.email.toLowerCase())
          ? [
              ...a,
              {
                displayName: `${m.fornavn} ${m.efternavn}`,
                email: m.email.toLowerCase(),
              },
            ]
          : a,
      []
    );
    ids.map(async (id) => await addIdentities({ args: [id] }));
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
        component="span"
      >
        Tilføj identiteter
      </Fab>
    </CSVReader>
  );
}
