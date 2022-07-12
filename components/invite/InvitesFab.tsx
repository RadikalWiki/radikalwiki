import React from "react";
import { Fab } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import { CSVReader } from "comps";
import { Node, useNode } from "hooks";

export default function InvitesFab({ node }: { node: Node }) {
  const handleFile = async (fileData: any) => {
    const invites = fileData
      .filter((r: any) => r?.email)
      .map((r: any) => ({
        name: `${r.fornavn} ${r.efternavn}`,
        email: r?.email?.toLowerCase(),
        parentId: node.id,
      }));
    await node.members.insert(invites);
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
