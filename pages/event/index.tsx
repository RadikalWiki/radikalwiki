import React, { Fragment, ReactNode, useState } from "react";
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

export default function Index() {
  const [state, setState] = useState("");
  const router = useRouter();
  const query = useQuery();

  const events = query.events().map(({ id, name }) => ({ id, name })) || [];
  const onChange = (_: any, v: any) => {
    const filter = events.filter(({ name }) =>
      v.toLowerCase().includes(name?.toLowerCase())
    );
    if (filter.length == 1) {
      router.push(`/event/${filter[0].id}`);
    }
    setState(v);
  };

  const renderInput = (params: any): ReactNode => {
    return (
      <Box ref={params.InputProps.ref}>
        <TextField
          label="Søg"
          sx={{ width: 200, height: 60 }}
          type="text"
          {...params.inputProps}
        />
      </Box>
    );
  };

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
        <Autocomplete
          freeSolo
          onChange={onChange}
          options={events}
          renderInput={renderInput}
        />
      </Breadcrumbs>
      <Card elevation={3} sx={{ m: 1 }}>
        <List sx={{ m: 0 }}>
          {events?.map(
            (event: { name: any; id: any }) =>
              (!state ||
                event.name.toLowerCase().includes(state.toLowerCase())) && (
                <Fragment key={event.id}>
                  <Divider />
                  <ListItem
                    button
                    component={NextLink}
                    href={`/event/${event.id}`}
                  >
                    <ListItemText primary={event.name} />
                  </ListItem>
                </Fragment>
              )
          )}
        </List>
      </Card>
    </>
  );
}
