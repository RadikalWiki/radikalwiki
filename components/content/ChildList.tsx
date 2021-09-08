import React, { Fragment, useState } from "react";
import {
  Link as NextLink,
  AddChildButton,
  Content,
  ContentToolbar,
  PollList,
} from "comps";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useStyles, useSession } from "hooks";
import { Lock, ExpandMore, Subject, ExpandLess } from "@material-ui/icons";
import { CONTENT_GET_CHILDREN, POLL_DEL } from "gql";
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
} from "@material-ui/core";

export default function ChildList({ contentId }: any) {
  const classes = useStyles();
  const {
    loading,
    data: { content } = {},
    error,
  } = useQuery(CONTENT_GET_CHILDREN, {
    variables: { id: contentId },
  });
  const [open, setOpen] = useState<boolean[]>([]);

  let changeNumber = 0;
  const getChangeNumber = () => {
    changeNumber += 1;
    return changeNumber;
  };

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  if (!loading && content?.parent && content?.folder.mode == "candidates")
    return null;

  return (
    <Fade in={!loading}>
      <Card className={classes.card}>
        <CardHeader
          title={
            content?.folder.mode == "changes"
              ? "Ændringsforslag"
              : "Kandidaturer"
          }
          action={<AddChildButton contentId={contentId} />}
        />
        <Divider />
        <List>
          {content?.children.map(
            (
              child: {
                name: string;
                id: string;
                authors: any;
                published: boolean;
              },
              index: number
            ) => (
              <Fragment key={child.id}>
                <ListItem
                  button
                  component={NextLink}
                  href={`/content/${child.id}`}
                >
                  <ListItemAvatar>
                    {child.published ? (
                      <Avatar className={classes.avatar}>
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
                    primary={child.name}
                    secondary={
                      content.folder.mode == "changes"
                        ? formatAuthors(child?.authors)
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
                    >
                      {open[index] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <Collapse in={open[index]}>
                  <ContentToolbar contentId={child.id} />
                  <Content contentId={child.id} />
                  <Divider />
                </Collapse>
              </Fragment>
            )
          )}
          {content?.children.length == 0 && (
            <ListItem button>
              <ListItemText
                primary={`Ingen ${
                  content.folder.mode == "changes"
                    ? "ændringsforslag"
                    : "kandidaturer"
                }`}
              />
            </ListItem>
          )}
        </List>
      </Card>
    </Fade>
  );
}
