import { Card, Collapse, List } from '@mui/material';
import { ContentHeader, FolderDial, FolderList } from 'comps';
import { Node, useScreen } from 'hooks';
import { Suspense, useState } from 'react';

const FolderApp = ({ node, child }: { node: Node; child?: boolean }) => {
  const [expand, setExpand] = useState(true);
  const screen = useScreen();
  if (screen && child) return null;
  return (
    <>
      <Card sx={{ m: 0 }}>
        <ContentHeader add child={child} hideMembers node={node} />
        <Collapse in={expand}>
          <List sx={{ m: 0 }}>
            <Suspense fallback={null}>
              <FolderList node={node} />
            </Suspense>
          </List>
        </Collapse>
      </Card>
      <Suspense fallback={null}>
        <FolderDial node={node} />
      </Suspense>
    </>
  );
};

export default FolderApp;
