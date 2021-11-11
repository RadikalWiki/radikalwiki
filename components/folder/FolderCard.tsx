import React, {
  Fragment,
  ReactNode,
  useState,
  useRef,
  useEffect,
  Suspense,
} from "react";
import { Link as NextLink } from "comps";
import { useRouter } from "next/router";
import {
  Autocomplete,
  Avatar,
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Folder, Lock, Search, Subject } from "@mui/icons-material";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
  Tooltip,
  Popper,
  ClickAwayListener,
  Grow,
} from "@mui/material";
import { useQuery } from "gql";
import { TransitionGroup } from "react-transition-group";
import { useSession } from "hooks";

function FolderList({ id, filter }: { id: string; filter: string }) {
  const [_, setSession] = useSession()
  const query = useQuery();

  const folder = query.folders_by_pk({ id });

  useEffect(() => {
    if (folder) setSession({ path: folder.parentId ? [{ name: folder.name ?? "", url: `/folder/${folder.id}` }] : [] });
  }, [id, folder]);

  const contents =
    folder
      ?.contents({ where: { parentId: { _is_null: true } } })
      .map(({ id = 0, name, priority, published }) => ({
        id,
        name,
        priority,
        subtitle: undefined as any,
        published,
        type: "content",
      })) || [];
  const folders =
    folder?.folders().map(({ id = 1, name, priority, subtitle }) => ({
      id,
      name,
      priority,
      subtitle,
      published: undefined as boolean | undefined,
      type: "folder",
    })) || [];
  const list = contents
    .concat(folders)
    .sort((f: any, s: any) => f.priority - s.priority);

  let letterIndex = 0;
  const getFolderLetter = (increment: boolean) => {
    const index = letterIndex;
    if (increment) letterIndex += 1;
    let res = String.fromCharCode(65 + (index % 26));
    if (index >= 26) {
      res = String.fromCharCode(64 + Math.floor(index / 26)) + res;
    }
    return res;
  };

  return (
    <TransitionGroup>
      {list.map(({ id, name, type, subtitle, published }) =>
        name?.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        getFolderLetter(false)
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase()) ? (
          <Collapse key={id}>
            <ListItem button component={NextLink} href={`/${type}/${id}`}>
              <ListItemAvatar>
                {type == "folder" ? (
                  <Avatar
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.main,
                    }}
                  >
                    <Folder />
                  </Avatar>
                ) : published ? (
                  <Avatar
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.main,
                    }}
                  >
                    {getFolderLetter(true)}
                  </Avatar>
                ) : (
                  <Tooltip title="Ikke indsendt">
                    <Avatar>
                      <Lock color="primary" />
                    </Avatar>
                  </Tooltip>
                )}
              </ListItemAvatar>
              <ListItemText primary={name} secondary={subtitle} />
            </ListItem>
            <Divider />
          </Collapse>
        ) : null
      )}
      {list.length == 0 && (
        <Collapse key={id}>
          <ListItem button>
            <ListItemText primary="Intet indhold" />
          </ListItem>
          <Divider />
        </Collapse>
      )}
    </TransitionGroup>
  );
}

export default function FolderCard({
  id,
  filter,
}: {
  id: string;
  filter: string;
}) {
  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <List sx={{ m: 0 }}>
        <Divider />
        <Suspense fallback={null}>
          <FolderList id={id} filter={filter} />
        </Suspense>
      </List>
    </Card>
  );
}
