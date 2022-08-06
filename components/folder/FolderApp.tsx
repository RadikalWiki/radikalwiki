import { NumbersOutlined } from "@mui/icons-material";
import { Card, Divider, List } from "@mui/material";
import {
  AddContentFab,
  FolderDial,
  FolderList,
  ContentHeader,
  ContentToolbar,
} from "comps";
import { Node, useScreen } from "hooks";
import { Suspense, useState } from "react";

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
    <Card elevation={3} sx={{ m: 1 }}>
      {!child && (
        <>
          <ContentHeader
            node={node}
            hideMembers
            expand={expand}
            setExpand={setExpand}
          />
          <Divider />
          {!screen && <ContentToolbar node={node} child={false} />}
        </>
      )}
      <List sx={{ m: 0 }}>
        <Suspense fallback={null}>
          {(child || screen) && <Divider />}
          <FolderList node={node} />
          <AddContentFab node={node} />
          <FolderDial node={node} />
        </Suspense>
      </List>
    </Card>
  );
}
