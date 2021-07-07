import React from "react";
import { Fragment, ReactNode, useState } from "react";
import { Link as NextLink } from "comps/common";
import { useStyles } from "hooks";
import { GROUPS_GET } from "gql";
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
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AddGroupFab } from "comps";

export default function Index() {
  const [state, setState] = useState("");
  const classes = useStyles();
  const router = useRouter();
  const { loading, data, error } = useQuery(GROUPS_GET);

  const groups = data?.groups.map((g: any) => g.name) || [];
  const onChange = (_: any, v: any) => {
    if (!data) {
      return;
    }
    const filter = data.groups.filter((group: any) =>
      v.toLowerCase().includes(group.name.toLowerCase())
    );
    if (filter.length == 1) {
      router.push(`/group/${filter[0].id}`);
    }
    setState(v);
  };

  const renderInput = (params: any): ReactNode => {
    return (
      <div ref={params.InputProps.ref}>
        <TextField
          label="Søg"
          style={{ width: 200, height: 60 }}
          type="text"
          {...params.inputProps}
        />
      </div>
    );
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Breadcrumbs>
            <Link component={NextLink} color="primary" href="/group">
              <Typography>Grupper</Typography>
            </Link>
            <Autocomplete
              freeSolo
              onChange={onChange}
              options={groups}
              renderInput={renderInput}
            />
          </Breadcrumbs>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <List className={classes.list}>
          {data?.groups.map(
            (group: { name: any; id: any }) =>
              (!state ||
                group.name.toLowerCase().includes(state.toLowerCase())) && (
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
