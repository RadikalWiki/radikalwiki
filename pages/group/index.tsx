import React from "react";
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
  Autocomplete
} from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "gql";
import { AddGroupFab } from "comps";
import { AddBoxRounded } from "@mui/icons-material";

export default function Index() {
  const [state, setState] = useState("");
  const router = useRouter();
  const query = useQuery();

  const groups = query.groups().map(({ id, name }) => ({ id, name })) || [];
  const onChange = (_: any, v: any) => {
    if (!groups) {
      return;
    }
    const filter = groups.filter(({ name }) =>
      v.toLowerCase().includes(name?.toLowerCase())
    );
    if (filter.length == 1) {
      router.push(`/group/${filter[0].id}`);
    }
    setState(v);
  };

  const renderInput = (params: any): ReactNode => {
    return (
      <Box ref={params.InputProps.ref}>
        <TextField
          label="Søg"
          style={{ width: 200, height: 60 }}
          type="text"
          {...params.inputProps}
        />
      </Box>
    );
  };

  return (
    <>
      <Breadcrumbs sx={{ p: [2, 0, 2, 2]}}>
        <Link component={NextLink} color="primary" href="/group">
          <Typography sx={{ alignItems: "center", display: "flex" }}>Grupper</Typography>
        </Link>
        <Autocomplete
          freeSolo
          onChange={onChange}
          options={groups}
          renderInput={renderInput}
        />
      </Breadcrumbs>
      <Card elevation={3} sx={{ m: 1}}>
        <List sx={{ m: 0 }}>
          {groups.map(
            (group) =>
              (!state ||
                group.name?.toLowerCase().includes(state.toLowerCase())) && (
                <Fragment key={group.id}>
                  <Divider />
                  <ListItem
                    button
                    component={NextLink}
                    href={`/group/${group.id}`}
                  >
                    <ListItemText primary={group.name} />
                  </ListItem>
                </Fragment>
              )
          )}
        </List>
      </Card>
      <AddGroupFab />
    </>
  );
}
