import React from 'react';
import { Fab } from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import { CSVReader } from 'comps';
import { Node, useNode } from 'hooks';

const InvitesFab = ({ node }: { node: Node }) => {
  const parentId = node.id;
  const nodeMembers = node.useMembers();
  const handleFile = async (
    fileData: { forname: string; efternavn: string; email: string }[]
  ) => {
    const members = fileData
      .filter((r) => r?.email)
      .map((r: any) => ({
        name: `${r.fornavn} ${r.efternavn}`,
        email: r?.email?.toLowerCase(),
        parentId,
      }));
    await nodeMembers.insert({ members });
  };

  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string) =>
      header.toLowerCase().replace(/\W/g, '_'),
  };

  return (
    <CSVReader parseOptions={parseOptions} onFileLoaded={handleFile}>
      <Fab
        sx={{
          position: 'fixed',
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

export default InvitesFab;