import React from "react";
import { Fab } from "@mui/material";
import { useMutation, identities_insert_input } from "gql";
import { CSVReader } from "comps";

export default function AddIdentitiesFab() {
  const [addIdentities] = useMutation(
    (mutation, args: identities_insert_input[]) => {
      return mutation.insert_identities({ objects: args })?.returning;
    }
  );

  const handleFile = async (fileData: any) => {
    const ids: identities_insert_input[] = fileData.reduce(
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
    ids.forEach(async (id) => {
      await addIdentities({
        args: [id],
      });
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
        sx={{ position: "fixed", bottom: 9, right: 3 }}
        variant="extended"
        color="primary"
        component="span"
      >
        Tilføj identiteter
      </Fab>
    </CSVReader>
  );
}
