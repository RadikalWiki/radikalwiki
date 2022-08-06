import { Card, Collapse, Divider } from "@mui/material";
import { Content, ContentHeader, ContentToolbar } from "comps";
import { Node, useScreen } from "hooks";
import { useState } from "react";

export default function ContentApp(param: {
  node: Node;
  hideMembers?: boolean;
}) {
  const screen = useScreen();
  const [expand, setExpand] = useState(true);

  return (
    <Card sx={{ m: 0 }}>
      <ContentHeader
        node={param.node}
        hideMembers={param?.hideMembers}
        expand={expand}
        setExpand={setExpand}
      />
      <Divider />
      <Collapse in={expand}>
        {!screen && <ContentToolbar node={param.node} child={false} />}
        <Content node={param.node} fontSize="100%" />
      </Collapse>
    </Card>
  );
}
