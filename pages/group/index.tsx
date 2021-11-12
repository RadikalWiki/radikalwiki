import React, { Suspense } from "react";
import { Fragment, ReactNode, useState } from "react";
import { Link as NextLink } from "comps";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Box,
  Autocomplete,
} from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "gql";
import { AddGroupFab } from "comps";

function Page() {
  const query = useQuery();

  const groups = query.groups().map(({ id, name }) => ({ id, name })) || [];

  return (
    <>
      <Breadcrumbs sx={{ p: [2, 0, 2, 2] }}>
        <Link component={NextLink} color="primary" href="/group">
          <Typography sx={{ alignItems: "center", display: "flex" }}>
            Grupper
          </Typography>
        </Link>
      </Breadcrumbs>
      <Card elevation={3} sx={{ m: 1 }}>
        <List sx={{ m: 0 }}>
          {groups.map((group) => (
            <Fragment key={group.id}>
              <Divider />
              <ListItem button component={NextLink} href={`/group/${group.id}`}>
                <ListItemText primary={group.name} />
              </ListItem>
            </Fragment>
          ))}
        </List>
      </Card>
      <AddGroupFab />
    </>
  );
}

export default function Index() {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}