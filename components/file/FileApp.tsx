import { Card, Collapse, Divider, Stack } from "@mui/material";
import {
  ContentHeader,
  ContentToolbar,
  FileLoader,
  DownloadFileFab,
  ChangeList,
  QuestionList,
} from "comps";
import { Node, useScreen } from "hooks";
import { useState } from "react";

export default function FileApp({ node }: { node: Node }) {
  const screen = useScreen();
  const [expand, setExpand] = useState(true);

  return (
    <Stack spacing={1}>
      <Card sx={{ m: 0 }}>
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
      <ChangeList node={node} />
      <QuestionList node={node} />
      {!screen && <DownloadFileFab node={node} />}
    </Stack>
  );
}
