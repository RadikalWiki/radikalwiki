import React from "react";
import { Fab } from "@material-ui/core";
import { GroupAdd } from "@material-ui/icons";
import { useStyles } from "hooks";
import { ADMISSIONS_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { CSVReader } from "comps";

export default function AddAdmissionsFab({ eventId }: { eventId?: string }) {
  const classes = useStyles();
  const [addAdmissions] = useMutation(ADMISSIONS_ADD);

  const handleFile = async (fileData: any) => {
    const admissions = fileData.map((a: any) => ({
      eventId,
      email: a.email.toLowerCase(),
    }));
    await addAdmissions({
      variables: {
        objects: admissions,
      },
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
        aria-label="Tilføj adgang"
        component="span"
      >
        <GroupAdd />
        adgang
      </Fab>
    </CSVReader>
  );
}
