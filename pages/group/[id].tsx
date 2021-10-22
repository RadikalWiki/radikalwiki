import React from "react";
import { Link as NextLink } from "comps";
import {
  Breadcrumbs,
  Card,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "gql";
import { AddMembershipsFab } from "comps";

export default function Id() {
  const router = useRouter();
  const { id } = router.query;
  const query = useQuery();
  const group = query.groups_by_pk({ id });

  return (
    <>
      <Card elevation={3} sx={{ m: 1}}>
        <Box>
          <Breadcrumbs sx={{ p: [2, 0, 2, 2]}}>
            <Link component={NextLink} color="primary" href="/group">
              <Typography sx={{ alignItems: "center", display: "flex" }}>Grupper</Typography>
            </Link>
            <Link component={NextLink} color="primary" href={`/group/${id}`}>
              <Typography sx={{ alignItems: "center", display: "flex" }}>
                {group?.name}
              </Typography>
            </Link>
          </Breadcrumbs>
        </Box>
      </Card>
      <AddMembershipsFab groupId={id as string} />
    </>
  );
}
