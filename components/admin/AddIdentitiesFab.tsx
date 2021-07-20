import React from "react";
import { Fab } from "@material-ui/core";
import { useStyles, useSession } from "hooks";
import { IDENTITIES_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CSVReader } from "comps";

export default function AddIdentitiesFab() {
  const classes = useStyles();
  const [addIdentities] = useMutation(IDENTITIES_ADD);

  const handleFile = async (fileData: any) => {
    const ids = fileData.reduce(
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
    ids.forEach(async (id: any) => {
      await addIdentities({
        variables: {
          objects: [{id}],
        },
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
        className={classes.speedDial}
        variant="extended"
        color="primary"
        component="span"
      >
        Tilføj identiteter
      </Fab>
    </CSVReader>
  );
}
