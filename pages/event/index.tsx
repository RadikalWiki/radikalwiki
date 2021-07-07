import React from "react";
import { Fragment, ReactNode, useState } from "react";
import { Link as NextLink } from "comps/common";
import { useStyles } from "hooks";
import { EVENTS_GET } from "gql";
import {
  Breadcrumbs,
  Card,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  CardContent,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

export default function Index() {
  const [state, setState] = useState("");
  const classes = useStyles();
  const router = useRouter();
  const { loading, data, error } = useQuery(EVENTS_GET);

  const events = data?.events.map((e: any) => e.name) || [];
  const onChange = (_: any, v: any) => {
    if (!data) {
      return;
    }
    const filter = data.events.filter((event: any) =>
      v.toLowerCase().includes(event.name.toLowerCase())
    );
    if (filter.length == 1) {
      router.push(`/event/${filter[0].id}`);
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
            <Link component={NextLink} color="primary" href="/event">
              <Typography>Begivenheder</Typography>
            </Link>
            <Autocomplete
              freeSolo
              onChange={onChange}
              options={events}
              renderInput={renderInput}
            />
          </Breadcrumbs>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <List className={classes.list}>
          {data?.events.map(
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
