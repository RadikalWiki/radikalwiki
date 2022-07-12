import { Card, Collapse, Divider } from "@mui/material";
import { Content, ContentHeader, ContentToolbar } from "comps";
import { useNode, useScreen } from "hooks";
import { useState } from "react";

export default function ContentApp({
  hideMembers = false,
}: {
  hideMembers?: boolean;
}) {
  const screen = useScreen()
  const node = useNode();
  const [expand, setExpand] = useState(true);

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      {!screen && (
        <ContentHeader
          node={node}
          hideMembers={hideMembers}
          expand={expand}
          setExpand={setExpand}
        />
      )}
      <Divider />
      <Collapse in={expand}>
        {!screen && <ContentToolbar node={node} child={false} />}
        <Content node={node} fontSize="100%" />
      </Collapse>
    </Card>
  );
}
