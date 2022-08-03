import { Card, Collapse, Divider } from "@mui/material";
import {
  ContentHeader,
  ContentToolbar,
  FileLoader,
  DownloadFileFab,
} from "comps";
import { Node, useScreen } from "hooks";
import { useState } from "react";

export default function FileApp({ node }: { node: Node }) {
  const screen = useScreen();
  const [expand, setExpand] = useState(true);

  return (
    <>
      <Card elevation={3} sx={{ m: 1 }}>
        <ContentHeader
          node={node}
          hideMembers
          expand={expand}
          setExpand={setExpand}
        />
        <Divider />
        <Collapse in={expand}>
          {!screen && <ContentToolbar node={node} child={false} />}
          <FileLoader node={node} />
        </Collapse>
      </Card>
      <DownloadFileFab node={node} />
    </>
  );
}
