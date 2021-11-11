import { Card, CardHeader, Collapse, Divider, Slide } from "@mui/material";
import { Content, ContentHeader, ExpandButton, ContentToolbar } from "comps";
import { useQuery } from "gql";
import { Suspense, useState } from "react";

export default function ContentCard({ id }: { id: string }) {
  const [expand, setExpand] = useState(true);

  return (
    <Suspense fallback={false}>
      <Card elevation={3} sx={{ m: 1 }}>
        <ContentHeader id={id} expand={expand} setExpand={setExpand} />
        <Divider />
        <Collapse mountOnEnter unmountOnExit in={expand}>
          <ContentToolbar id={id} />
          <Content id={id} fontSize="100%" />
        </Collapse>
      </Card>
    </Suspense>
  );
}
