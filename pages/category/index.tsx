import React from "react";
import { Fragment, ReactNode, useState } from "react";
import { Link as NextLink, CategoryAdminDial } from "comps";
import { useSession, useStyles } from "hooks";
import { CATEGORIES_GET } from "gql";
import {
  Avatar,
  Tooltip,
  Breadcrumbs,
  Card,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Fade,
} from "@material-ui/core";
import { Group, Subject } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

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
      <Fade in={!loading}>
        <Card className={classes.card}>
          <Breadcrumbs className={classes.bread}>
            <Link
              component={NextLink}
              className={classes.breadText}
              color="primary"
              href="/category"
            >
              <Tooltip title="Indhold">
                <Subject />
              </Tooltip>
            </Link>
            <Autocomplete
              freeSolo
              onChange={onChange}
              options={categories}
              renderInput={renderInput}
            />
          </Breadcrumbs>
        </Card>
      </Fade>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <List className={classes.list}>
            <Divider />
            {data?.categories.map(
              (cat: {
                name: string;
                id: any;
                subtitle: string;
                childMode: any;
              }) =>
                (!state ||
                  cat.name.toLowerCase().includes(state.toLowerCase())) && (
                  <Fragment key={cat.id}>
                    <ListItem
                      button
                      component={NextLink}
                      href={`/category/${cat.id}`}
                    >
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          {cat.childMode == "changes" ? <Subject /> : <Group />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={cat.name}
                        secondary={cat.subtitle}
                      />
                    </ListItem>
                    <Divider />
                  </Fragment>
                )
            )}
          </List>
        </Card>
      </Fade>
      {session?.roles.includes("admin") && <CategoryAdminDial />}
    </>
  );
}
