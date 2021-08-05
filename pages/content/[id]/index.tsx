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
import {
  Lock,
  ExpandMore,
  Subject,
  ExpandLess,
} from "@material-ui/icons";
import { CONTENT_GET, POLL_DEL } from "gql";
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

export default function Id() {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const {
    loading,
    data: { content } = {},
    error,
  } = useQuery(CONTENT_GET, {
    variables: { id },
  });
  const [expand, setExpand] = useState(true);
  const [open, setOpen] = useState<boolean[]>([]);

  let changeNumber = 0;
  const getChangeNumber = () => {
    changeNumber += 1;
    return changeNumber;
  };

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  return (
    <>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <Breadcrumbs className={classes.bread}>
            <Link
              component={NextLink}
              className={classes.breadText}
              color="primary"
              href="/folder"
            >
              <Tooltip title="Indhold">
                <Subject />
              </Tooltip>
            </Link>
            {content?.parent ? (
              <Link
                component={NextLink}
                color="primary"
                href={`/content/${content?.parent.id}`}
              >
                {content?.parent.name || ""}
              </Link>
            ) : (
              content?.folder.parentId && (
                <Link
                  component={NextLink}
                  color="primary"
                  href={`/folder/${content?.folder.id}`}
                >
                  {content?.folder.name || ""}
                </Link>
              )
            )}
            <Link component={NextLink} color="primary" href={`/content/${id}`}>
              {content?.name || ""}
            </Link>
          </Breadcrumbs>
        </Card>
      </Fade>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <CardHeader
            title={content?.name}
            subheader={
              !(content?.parent && content?.folder.mode == "candidates")
                ? formatAuthors(content?.authors)
                : ""
            }
            action={
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expand,
                })}
                color="primary"
                onClick={() => setExpand(!expand)}
              >
                <Tooltip title={expand ? "Skjul" : "Vis"}>
                  <ExpandMore />
                </Tooltip>
              </IconButton>
            }
          />
          <Divider />
          <Collapse in={expand} unmountOnExit>
            <ContentToolbar contentId={id as string} />
            <Divider />
            <Content contentId={id as string} />
          </Collapse>
        </Card>
      </Fade>
      {content?.children &&
        (!content.parent || content.folder.mode == "changes") && (
          <Fade in={!loading}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  content.folder.mode == "changes"
                    ? "Ændringsforslag"
                    : "Kandidaturer"
                }
                action={
                  !content.folder.lockChildren && (
                    <AddChildButton content={content} />
                  )
                }
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
                              : !child.published
                              ? "Ikke indsendt"
                              : "Indsendt"
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
                        <Divider />
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
        )}
      <PollList contentId={id as string} />
    </>
  );
}
