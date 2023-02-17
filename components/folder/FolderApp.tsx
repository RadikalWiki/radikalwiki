import { NumbersOutlined } from '@mui/icons-material';
import { Card, Collapse, Divider, List } from '@mui/material';
import { AddContentFab, FolderDial, FolderList, ContentToolbar } from 'comps';
import { Node, useScreen } from 'hooks';
import { Suspense, useState } from 'react';

export default function FolderApp({
  node,
  child,
}: {
  node: Node;
  child?: boolean;
}) {
  const [expand, setExpand] = useState(true);
  const screen = useScreen();
  if (screen && child) return null;
  return (
    <>
      <Card sx={{ m: 0 }}>
        <Collapse in={expand}>
          <List sx={{ m: 0 }}>
            <Suspense fallback={null}>
              <Divider />
              <FolderList node={node} />
            </Suspense>
          </List>
        </Collapse>
      </Card>
      <Suspense fallback={null}>
        <AddContentFab node={node} />
        <FolderDial node={node} />
      </Suspense>
    </>
  );
}
