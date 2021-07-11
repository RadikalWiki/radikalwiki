import React, { Fragment, ReactNode, useState } from "react";
import {
  Link as NextLink,
  AddContentFab,
  AddContentsFab,
  LockCategoryFab,
} from "comps";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useStyles, useSession } from "hooks";
import { CATEGORY_GET } from "gql";
import { Autocomplete } from "@material-ui/lab";
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
  Avatar,
  ListItemAvatar,
  Fade,
} from "@material-ui/core";

let catLetter = 0;
const getCategoryLetter = () => {
  let res = String.fromCharCode(65 + (catLetter % 26));
  if (catLetter >= 26) {
    res = String.fromCharCode(64 + Math.floor(catLetter / 26)) + res;
  }
  catLetter += 1;
  return res;
};

export default function Id() {
  const [state, setState] = useState("");
  const classes = useStyles();
  const [session] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useQuery(CATEGORY_GET, {
    variables: { id },
  });

  catLetter = 0;
  const contents =
    data?.category.contents.map((content: any) => content.name) || [];
  const onChange = (_: any, v: any) => {
    if (!data) {
      return;
    }
    const filter = data.category.contents.filter((cont: any) =>
      v.toLowerCase().includes(cont.name.toLowerCase())
    );
    if (filter.length == 1) {
      router.push(`/content/${filter[0].id}`);
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
            <Link component={NextLink} color="primary" href="/category">
              <Typography className={classes.breadText}>Indhold</Typography>
            </Link>
            <Link component={NextLink} color="primary" href={`/category/${id}`}>
              <Typography className={classes.breadText}>
                {data?.category.name}
              </Typography>
            </Link>
            <Autocomplete
              freeSolo
              options={contents}
              onChange={onChange}
              renderInput={renderInput}
            />
          </Breadcrumbs>
        </Card>
      </Fade>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <List className={classes.list}>
            <Divider />
            {data?.category.contents.map(
              (content: { name: any; id: any }) =>
                (!state ||
                  content.name.toLowerCase().includes(state.toLowerCase())) && (
                  <Fragment key={content.id}>
                    <ListItem
                      button
                      component={NextLink}
                      href={`/content/${content.id}`}
                    >
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          {getCategoryLetter()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={content.name} />
                    </ListItem>
                    <Divider />
                  </Fragment>
                )
            )}
            {data?.category.contents.length == 0 && (
              <Fragment key="none">
                <ListItem button>
                  <ListItemText primary="Intet indhold" />
                </ListItem>
                <Divider />
              </Fragment>
            )}
          </List>
        </Card>
      </Fade>
      {!data?.category.lockContent && (
        <AddContentFab categoryId={id as string} />
      )}
      {session?.roles.includes("admin") && (
        <AddContentsFab categoryId={id as string} />
      )}
      {session?.roles.includes("admin") && (
        <LockCategoryFab mode="content" category={data?.category} />
      )}
      {session?.roles.includes("admin") && (
        <LockCategoryFab mode="children" category={data?.category} />
      )}
    </>
  );
}
