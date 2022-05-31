import { Box, Card, CircularProgress, Collapse, Divider } from "@mui/material";
import { Content, ContentHeader, ContentToolbar } from "comps";
import { useNode } from "hooks";
import { Suspense, useState } from "react";

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
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <Card elevation={3} sx={{ m: 1 }}>
        {!screen && (
          <ContentHeader
            hideMembers={hideMembers}
            id={query?.id}
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
    </Suspense>
  );
}
