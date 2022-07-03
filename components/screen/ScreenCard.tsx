import React, { useState } from "react";
import { Card, CardHeader, Collapse, Typography } from "@mui/material";
import { useQuery } from "gql";
import { Content, ExpandButton } from "comps";
import { useSession } from "hooks";
import { ContentAvatar } from "comps/content";

export default function ContentCard({
  id,
  expanded,
}: {
  id: string;
  expanded?: boolean;
}) {
  const [session] = useSession();
  const query = useQuery();
  const node = query.node({ id });
  const [expand, setExpand] = useState(expanded ?? true);

  return (
    <>
      <Card elevation={3} sx={{ m: 1 }}>
        <CardHeader
          title={
            <Typography variant="h5" sx={{ color: "#fff" }}>
              {node?.name}
            </Typography>
          }
          subheaderTypographyProps={{ color: "inherit" }}
          avatar={<ContentAvatar id={id} screen />}
          sx={{
            bgcolor: (t) => t.palette.secondary.main,
            color: (t) => t.palette.secondary.contrastText,
          }}
          action={[
            <ExpandButton key="expand" onClick={() => setExpand(!expand)} />,
          ]}
        />
        <Collapse in={expand}>
          <Content id={id} fontSize={session?.screen?.size ?? "200%"} />
        </Collapse>
      </Card>
    </>
  );
}
