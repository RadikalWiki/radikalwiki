import { NumbersOutlined } from "@mui/icons-material";
import { Card, Divider, List } from "@mui/material";
import { AddContentFab, FolderDial, FolderList } from "comps";
import { Node, useScreen } from "hooks";
import { Suspense } from "react";

export default function FolderApp({ node }: { node: Node }) {
  const screen = useScreen();
  if (screen) return null;
  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <List sx={{ m: 0 }}>
        <Divider />
        <Suspense fallback={null}>
          <FolderList node={node} />
          <AddContentFab node={node} />
          <FolderDial node={node} />
        </Suspense>
      </List>
    </Card>
  );
}
