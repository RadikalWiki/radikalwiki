import React from "react";
import { Fab } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import { admissions_insert_input, useMutation } from "gql";
import { CSVReader } from "comps";

export default function AddAdmissionsFab({ eventId }: { eventId?: string }) {
  const [addAdmissions] = useMutation(
    (mutation, args: admissions_insert_input[]) => {
      return mutation.insert_admissions({ objects: args })?.affected_rows;
    }
  );

  const handleFile = async (fileData: any) => {
    const admissions = fileData.map((a: any) => ({
      eventId,
      email: a.email.toLowerCase(),
    }));
    await addAdmissions({
      args: admissions,
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
          bottom: t =>  t.spacing(9),
          right: t => t.spacing(3),
        }}
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
