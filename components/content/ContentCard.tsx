import { Card, CardHeader, Collapse, Divider } from "@mui/material";
import { Content, ContentAvatar, ExpandButton, ContentToolbar } from "comps";
import { useQuery } from "gql";
import { useState } from "react";

export default function ContentCard({
  id,
}: {
  id: string;
}) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const [expand, setExpand] = useState(true);

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={content?.name}
        avatar={<ContentAvatar content={content} />}
        subheader={
          !(content?.parent && content?.folder?.mode == "candidates")
            ? content
                ?.authors()
                .map((a) => a.identity?.displayName ?? a.name)
                .join(", ")
            : ""
        }
        action={<ExpandButton expand={expand} onClick={() => setExpand(!expand)} />}
      />
      <Divider />
      <Collapse mountOnEnter unmountOnExit in={expand}>
        <ContentToolbar id={id} />
        <Content id={id} fontSize="100%" />
      </Collapse>
    </Card>
  );
}
