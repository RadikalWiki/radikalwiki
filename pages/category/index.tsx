import React from "react";
import { Fragment, ReactNode, useState } from "react";
import { Link as NextLink } from "comps/common";
import { useSession, useStyles } from "hooks";
import { CATEGORIES_GET } from "gql";
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
import { AddCategoryFab } from "comps";

export default function Index() {
  const [state, setState] = useState("");
  const classes = useStyles();
  const router = useRouter();
  const [session] = useSession();
  const { loading, data, error } = useQuery(CATEGORIES_GET, {
    variables: { eventId: session?.event?.id },
  });

  const categories = data?.categories.map((e: any) => e.name) || [];
  const onChange = (_: any, v: any) => {
    if (!data) {
      return;
    }
    const filter = data.categories.filter((cat: any) =>
      v.toLowerCase().includes(cat.name.toLowerCase())
    );
    if (filter.length == 1) {
      router.push(`/category/${filter[0].id}`);
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
            <Link component={NextLink} color="primary" href="/category">
              <Typography>Indhold</Typography>
            </Link>
            <Autocomplete
              freeSolo
              onChange={onChange}
              options={categories}
              renderInput={renderInput}
            />
          </Breadcrumbs>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <List className={classes.list}>
          <Divider />
          {data?.categories.map(
            (cat: { name: any; id: any }) =>
              (!state ||
                cat.name.toLowerCase().includes(state.toLowerCase())) && (
                <Fragment key={cat.id}>
                  <ListItem
                    button
                    component={NextLink}
                    href={`/category/${cat.id}`}
                  >
                    <ListItemText primary={cat.name} />
                  </ListItem>
                  <Divider />
                </Fragment>
              )
          )}
        </List>
      </Card>
      {session?.roles.includes("admin") && <AddCategoryFab />}
    </>
  );
}
