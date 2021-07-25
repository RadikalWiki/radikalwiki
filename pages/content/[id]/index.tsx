import React, { useState } from "react";
import {
  Link as NextLink,
  HeaderCard,
  ContentAdmin,
  AddChildButton,
} from "comps";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useMutation, useSubscription } from "@apollo/client";
import { useStyles, useSession } from "hooks";
import {
  Cancel,
  HowToVote,
  Edit,
  Public,
  Lock,
  Publish,
  Delete,
  ExpandMore,
  Subject,
} from "@material-ui/icons";
import { CONTENT_SUB, CONTENT_UPDATE, CONTENT_DELETE, POLL_DEL } from "gql";
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Collapse,
  Card,
  CardContent,
  CardHeader,
  CardActions,
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
  Grid,
  Paper,
  Box,
  Button,
} from "@material-ui/core";
import Image from "material-ui-image";

export default function Id() {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const {
    loading,
    data: { content } = {},
    error,
  } = useSubscription(CONTENT_SUB, {
    variables: { id },
  });
  const [expand, setExpand] = useState(true);
  const [updateContent] = useMutation(CONTENT_UPDATE);
  const [deleteContent] = useMutation(CONTENT_DELETE);
  const [deletePoll] = useMutation(POLL_DEL);

  let changeNumber = 0;
  const getChangeNumber = () => {
    changeNumber += 1;
    return changeNumber;
  };

  const handleDelete = async () => {
    await deleteContent({ variables: { id } });

    if (content.parent) {
      router.push(`/content/${content.parent.id}`);
    } else {
      router.push(`/folder/${content.folder.id}`);
    }
  };

  const handleDeleteChild = (value: any) => async (_: any) => {
    await deleteContent({ variables: { id: value } });
  };

  const handleDeletePoll = (value: any) => async (_: any) => {
    await deletePoll({ variables: { id: value } });
  };

  const handlePublish = async () => {
    await updateContent({
      variables: { id, set: { published: true } },
    });
  };

  // TODO: properly style MUI buttons with next.js
  const handleEdit = async () => {
    router.push(`/content/${content?.id}/edit`);
  };

  const editable =
    ((session?.user.id === content?.creatorId ||
      (content?.authors.some(
        (a: any) => a.identity?.user?.id === session?.user.id
      ) &&
        ((!content?.parent && !content?.folder.lockContent) ||
          (content?.parent && !content?.folder.lockChildren)))) &&
      !content?.published) ||
    session?.roles.includes("admin");

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  const image = content?.file
    ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${content.file.path}?token=${content.file.token}`
    : null;

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
              !(content?.parent && content?.folder.mode === "candidates")
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
          <Collapse in={expand} timeout={500}>
            {editable && (
              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<Delete />}
                  onClick={handleDelete}
                >
                  Slet
                </Button>
                <Box className={classes.flexGrow} />
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<Edit />}
                  onClick={handleEdit}
                >
                  Rediger
                </Button>
                {!content?.published && (
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<Publish />}
                    onClick={handlePublish}
                  >
                    Indsend
                  </Button>
                )}
              </CardActions>
            )}
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                {content?.data && (
                  <CardContent>
                    <div dangerouslySetInnerHTML={{ __html: content?.data }} />
                  </CardContent>
                )}
              </Grid>
              {image && (
                <Grid item xs={12} sm={4}>
                  <Paper className={classes.image}>
                    <Image src={image} />
                  </Paper>
                </Grid>
              )}
            </Grid>
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
              <List>
                {content?.children.map(
                  (child: {
                    name: any;
                    id: any;
                    authors: any;
                    published: boolean;
                  }) => (
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
                      {!child?.published ||
                        (session?.roles.includes("admin") && (
                          <ListItemSecondaryAction>
                            <Tooltip title="Slet">
                              <IconButton
                                onClick={handleDeleteChild(child.id)}
                                color="primary"
                                edge="end"
                                aria-label="Fjern indhold"
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        ))}
                    </ListItem>
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
      {content?.polls && content?.polls.length !== 0 && (
        <HeaderCard title="Afstemningsresultater">
          <List>
            {content?.polls.map(
              (poll: { id: any; created: any; total: any }) => (
                <ListItem button component={NextLink} href={`/poll/${poll.id}`}>
                  <Tooltip title="Antal stemmer">
                    <ListItemAvatar>
                      <Badge
                        color="secondary"
                        max={1000}
                        badgeContent={poll.total.aggregate.count}
                      >
                        <Avatar style={{ backgroundColor: "#ec407a" }}>
                          <HowToVote style={{ color: "#fff" }} />
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                  </Tooltip>
                  <ListItemText
                    primary={`${new Date(poll.created).toLocaleString(
                      "da-DK"
                    )}`}
                  />
                  {session.roles.includes("admin") && (
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={handleDeletePoll(poll.id)}
                        color="primary"
                        edge="end"
                      >
                        <Cancel />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              )
            )}
          </List>
        </HeaderCard>
      )}
      <ContentAdmin id={id as string} />
    </>
  );
}
