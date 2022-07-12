import React, { useState } from "react";
import { Card, CardHeader, Collapse, Typography } from "@mui/material";
import { Content, ExpandButton } from "comps";
import { Node, useNode, useSession } from "hooks";
import { ContentAvatar } from "comps/content";

export default function ContentCard({
  node,
  expanded,
}: {
  node: Node;
  expanded?: boolean;
}) {
  const [session] = useSession();
  const query = node.query; 
  const [expand, setExpand] = useState(expanded ?? true);

  return (
    <>
      <Card elevation={3} sx={{ m: 1 }}>
        <CardHeader
          title={
            <Typography variant="h5" sx={{ color: "#fff" }}>
              {query?.name}
            </Typography>
          }
          subheaderTypographyProps={{ color: "inherit" }}
          avatar={<ContentAvatar node={node} />}
          sx={{
            bgcolor: (t) => t.palette.secondary.main,
            color: (t) => t.palette.secondary.contrastText,
          }}
          action={[
            <ExpandButton key="expand" onClick={() => setExpand(!expand)} />,
          ]}
        />
        <Collapse in={expand}>
          <Content node={node} fontSize={session?.screen?.size ?? "200%"} />
        </Collapse>
      </Card>
    </>
  );
}
