import React from "react";
import { Fragment, ReactNode, useState } from "react";
import { Link as NextLink } from "components";
import { useQuery } from "@apollo/client";
import { useStyles } from "hooks";
import { CATEGORIES_GET } from "gql";
import {
  Breadcrumbs,
  Card,
  Divider,
  Fade,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";

export default function Index() {
  const [state, setState] = useState("");
  const classes = useStyles();
  const router = useRouter();
  const { loading, data } = useQuery(CATEGORIES_GET);

  const categories = data?.category.map((e: any) => e.name) || [];
  const onChange = (_: any, v: any) => {
    if (!data) {
      return;
    }
    const filter = data.category.filter((cat: any) =>
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
    <Fade in={!loading}>
      <Card className={classes.card}>
        <Breadcrumbs className={classes.bread}>
          <Link component={NextLink} color="primary" href="/category">
            <Typography className={classes.breadText}>Indhold</Typography>
          </Link>
          <Autocomplete
            freeSolo
            onChange={onChange}
            options={categories}
            renderInput={renderInput}
          />
        </Breadcrumbs>
        <List className={classes.list}>
          {data?.category.map(
            (cat: { name: any; id: any }) =>
              (!state ||
                cat.name.toLowerCase().includes(state.toLowerCase())) && (
                <Fragment key={cat.id}>
                  <Divider />
                  <ListItem
                    button
                    component={NextLink}
                    href={`/category/${cat.id}`}
                  >
                    <ListItemText primary={cat.name} />
                  </ListItem>
                </Fragment>
              ),
          )}
        </List>
      </Card>
    </Fade>
  );
};
