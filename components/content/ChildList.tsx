import React, { Fragment, Suspense, useState } from "react";
import {
  Link as NextLink,
  AddChildButton,
  Content,
  ContentToolbar,
  PollList,
} from "comps";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSession } from "hooks";
import { Lock, ExpandMore, Subject, ExpandLess } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Collapse,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Fade,
} from "@mui/material";
import { useQuery } from "gql";

export default function ChildList({ id }: { id: string }) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });

  const [open, setOpen] = useState<boolean[]>([]);

  let changeNumber = 0;
  const getChangeNumber = () => {
    changeNumber += 1;
    return changeNumber;
  };

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={
          content?.folder?.mode == "changes"
            ? "Ændringsforslag"
            : "Kandidaturer"
        }
      />
      <Divider />
      <List>
        {content
          ?.children()
          .map(({ id = 0, name, authors, published }, index: number) =>
            id != 0 ? (
              <Fragment key={id}>
                <ListItem button component={NextLink} href={`/content/${id}`}>
                  <ListItemAvatar>
                    {published ? (
                      <Avatar
                        sx={{ bgcolor: (theme) => theme.palette.primary.main }}
                      >
                        {getChangeNumber()}
                      </Avatar>
                    ) : (
                      <Tooltip title="Ikke indsendt">
                        <Avatar>
                          <Lock color="primary" />
                        </Avatar>
                      </Tooltip>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={
                      content?.folder?.mode == "changes"
                        ? authors()?.map(({ identity, name }) => identity?.displayName ?? name).join(", ")
                        : null
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        const copy = [...open];
                        copy[index] = !open[index];
                        setOpen(copy);
                      }}
                      size="large"
                    >
                      {open[index] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <Collapse mountOnEnter unmountOnExit in={open[index]}>
                  <ContentToolbar id={id} />
                  <Content id={id} fontSize="100%" />
                  <Divider />
                </Collapse>
              </Fragment>
            ) : null
          )}
        {content?.children().map((id) => id).length == 0 && (
          <ListItem button>
            <ListItemText
              primary={`Ingen ${
                content?.folder?.mode == "changes"
                  ? "ændringsforslag"
                  : "kandidaturer"
              }`}
            />
          </ListItem>
        )}
      </List>
    </Card>
  );
}
