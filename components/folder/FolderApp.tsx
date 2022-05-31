import { Card, Divider, List } from "@mui/material";
import { AddContentFab, FolderDial, FolderList } from "comps";
import { useNode } from "hooks";
import { Suspense } from "react";

export default function FolderApp() {
  const { query } = useNode();
  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <List sx={{ m: 0 }}>
        <Divider />
        <Suspense fallback={null}>
          <FolderList id={query?.id} />
          <AddContentFab id={query?.id} />
          <FolderDial id={query?.id} />
        </Suspense>
      </List>
    </Card>
  );
}
