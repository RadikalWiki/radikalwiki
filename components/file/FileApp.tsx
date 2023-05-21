import { Card, Collapse, Stack } from '@mui/material';
import {
  FileLoader,
  ChangeList,
  QuestionList,
  ContentHeader,
} from 'comps';
import { Node } from 'hooks';
import { useState } from 'react';

const FileApp = ({ node }: { node: Node }) => {
  const [expand, setExpand] = useState(true);

  return (
    <>
      <Stack spacing={1}>
        <Card sx={{ m: 0 }}>
          <ContentHeader node={node} />
          <Collapse in={expand}>
            <FileLoader node={node} />
          </Collapse>
        </Card>
        <ChangeList node={node} />
        <QuestionList node={node} />
      </Stack>
    </>
  );
};

export default FileApp;
