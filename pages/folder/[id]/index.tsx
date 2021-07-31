import React, { Fragment, ReactNode, useState, useRef, useEffect } from "react";
import {
  Link as NextLink,
  AddContentFab,
  AddContentsFab,
  LockFolderFab,
  FolderDial,
} from "comps";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useStyles, useSession } from "hooks";
import { FOLDER_GET } from "gql";
import { Autocomplete } from "@material-ui/lab";
import { Search, Subject } from "@material-ui/icons";
import {
  IconButton,
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
  Avatar,
  ListItemAvatar,
  Fade,
  Tooltip,
  Paper,
  Popper,
  ClickAwayListener,
  Grow,
} from "@material-ui/core";

let folderLetter = 0;
const getFolderLetter = () => {
  let res = String.fromCharCode(65 + (folderLetter % 26));
  if (folderLetter >= 26) {
    res = String.fromCharCode(64 + Math.floor(folderLetter / 26)) + res;
  }
  folderLetter += 1;
  return res;
};

export default function Id() {
  const [state, setState] = useState("");
  const classes = useStyles();
  const [session] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useQuery(FOLDER_GET, {
    variables: { id },
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const searchAnchorRef = useRef(null);
  folderLetter = 0;
  const contents =
    data?.folder.contents.map(({ id, name, priority }: any) => ({
      id,
      name,
      priority,
      subtitle: null,
      type: "content",
    })) || [];
  const folders =
    data?.folder.folders.map(({ id, name, priority, subtitle }: any) => ({
      id,
      name,
      priority,
      subtitle,
      type: "folder",
    })) || [];
  const list = contents
    .concat(folders)
    .sort((f: any, s: any) => f.priority - s.priority);
  const listNames = list.map((e: any) => e.name) || [];

  const onChange = (_: any, v: any) => {
    if (!data) {
      return;
    }
    const filter = list.filter((e: any) =>
      v.toLowerCase().includes(e.name.toLowerCase())
    );
    if (filter.length == 1) {
      router.push(`/${filter[0].type}/${filter[0].id}`);
    }
    setState(v);
  };
  const renderInput = (params: any): ReactNode => {
    return (
      <div ref={params.InputProps.ref}>
        <TextField
          label="Søg"
          autoFocus
          style={{ width: 200, height: 60 }}
          type="text"
          {...params.inputProps}
        />
      </div>
    );
  };
  const renderOption = (params: any): ReactNode => {
    return <></>;
  };

  return (
    <>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <Breadcrumbs className={classes.bread}>
            <Link
              component={NextLink}
              color="primary"
              href={`/folder`}
              className={classes.breadText}
            >
              <Tooltip title="Indhold">
                <Subject />
              </Tooltip>
            </Link>
            {data?.folder.parent && data?.folder.parent.parentId && (
              <Link
                component={NextLink}
                color="primary"
                href={`/folder/${data?.folder.parent.id}`}
              >
                <Typography>{data?.folder.parent.name}</Typography>
              </Link>
            )}
            {data?.folder.parent && (
              <Link component={NextLink} color="primary" href={`/folder/${id}`}>
                <Typography>{data?.folder.name}</Typography>
              </Link>
            )}
            <Link
              ref={searchAnchorRef}
              href=""
              className={classes.breadText}
              onClick={(e: any) => {
                e.preventDefault();
                setSearchOpen(!searchOpen);
              }}
              color="primary"
            >
              <Tooltip title="Søg">
                <Search />
              </Tooltip>
            </Link>
          </Breadcrumbs>
        </Card>
      </Fade>
      <Popper
        open={searchOpen}
        anchorEl={searchAnchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Card>
              <CardContent>
                <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
                  <Autocomplete
                    freeSolo
                    options={listNames}
                    onChange={onChange}
                    renderInput={renderInput}
                    renderGroup={renderOption}
                  />
                </ClickAwayListener>
              </CardContent>
            </Card>
          </Grow>
        )}
      </Popper>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <List className={classes.list}>
            <Divider />
            {list.map(
              (e: { name: any; id: any; type: any; subtitle: any }) =>
                (!state ||
                  e.name.toLowerCase().includes(state.toLowerCase())) && (
                  <Fragment key={e.id}>
                    <ListItem
                      button
                      component={NextLink}
                      href={`/${e.type}/${e.id}`}
                    >
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          {getFolderLetter()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={e.name} secondary={e.subtitle} />
                    </ListItem>
                    <Divider />
                  </Fragment>
                )
            )}
            {list.length == 0 && (
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
      {!data?.folder.lockContent && <AddContentFab folderId={id as string} />}
      {session?.roles.includes("admin") && <FolderDial folder={data?.folder} />}
    </>
  );
}
