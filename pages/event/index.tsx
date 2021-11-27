import React, { Fragment, ReactNode, Suspense, useState } from "react";
import { Link as NextLink } from "comps";
import {
  Breadcrumbs,
  Card,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
} from "@mui/material";
import { Event } from "@mui/icons-material";
import { Autocomplete, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "gql";

function IndexRaw() {
  const query = useQuery();
  const events = query.events().map(({ id, name }) => ({ id, name })) || [];

  return (
    <>
      <Breadcrumbs sx={{ p: [2, 0, 2, 2] }}>
        <Link
          component={NextLink}
          sx={{ alignItems: "center", display: "flex" }}
          color="primary"
          href="/event"
        >
          <Tooltip title="Begivenheder">
            <Event />
          </Tooltip>
        </Link>
      </Breadcrumbs>
      <Card elevation={3} sx={{ m: 1 }}>
        <List sx={{ m: 0 }}>
          {events?.map(({ id = 0, name }) => (
            <Fragment key={id}>
              <Divider />
              <ListItem button component={NextLink} href={`/event/${id}/admin`}>
                <ListItemText primary={name} />
              </ListItem>
            </Fragment>
          ))}
          <Divider />
        </List>
      </Card>
    </>
  );
}

export default function Index() {
  return (
    <Suspense fallback={null}>
      <IndexRaw />
    </Suspense>
  );
}
