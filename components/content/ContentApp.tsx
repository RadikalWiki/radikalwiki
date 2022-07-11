import { Card, Collapse, Divider } from "@mui/material";
import { Content, ContentHeader, ContentToolbar } from "comps";
import { useNode } from "hooks";
import { useState } from "react";

export default function ContentCard({
  screen,
  hideMembers = false,
}: {
  screen?: boolean;
  hideMembers?: boolean;
}) {
  const { query } = useNode();
  const [expand, setExpand] = useState(true);

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      {!screen && (
        <ContentHeader
          id={query?.id}
          hideMembers={hideMembers}
          expand={expand}
          setExpand={setExpand}
        />
      )}
      <Divider />
      <Collapse in={expand}>
        {!screen && <ContentToolbar id={query?.id} child={false} />}
        <Content id={query?.id} fontSize="100%" />
      </Collapse>
    </Card>
  );
}
