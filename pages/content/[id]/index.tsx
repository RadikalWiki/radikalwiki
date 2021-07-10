import React from "react";
import {
  Link as NextLink,
  HeaderCard,
  ContentAdmin,
  AddChildButton,
} from "comps";
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
} from "@material-ui/icons";
import { CONTENT_SUB, CONTENT_UPDATE, CONTENT_DELETE, POLL_DEL } from "gql";
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
  Fade,
  Grid,
  Paper,
  ButtonGroup,
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
  const [updateContent] = useMutation(CONTENT_UPDATE);
  const [deleteContent] = useMutation(CONTENT_DELETE);
  const [deletePoll] = useMutation(POLL_DEL);

  let changeNumber = 0;
  const getChangeNumber = () => {
    changeNumber += 1;
    return changeNumber;
  };

  const handleDeleteContent = (value: any) => async (_: any) => {
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

  const editable =
    ((session?.user.id === content?.creatorId ||
      (content?.authors.some(
        (a: any) => a.identity?.user?.id === session?.user.id
      ) &&
        ((!content?.parent && !content?.category.lockContent) ||
          (content?.parent && !content?.category.lockChildren)))) &&
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
            <Link component={NextLink} color="primary" href="/category">
              <Typography className={classes.breadText}>Indhold</Typography>
            </Link>
            <Link
              component={NextLink}
              color="primary"
              href={`/category/${content?.category.id}`}
            >
              {content?.category.name || ""}
            </Link>
            {content?.parent && (
              <Link
                component={NextLink}
                color="primary"
                href={`/content/${content?.parent.id}`}
              >
                {content?.parent.name || ""}
              </Link>
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
              !(content?.parent && content?.category.childMode === "candidates")
                ? formatAuthors(content?.authors)
                : ""
            }
            action={
              <ButtonGroup variant="contained" color="primary">
                {!content?.published && (
                  <Button endIcon={<Publish />} onClick={handlePublish}>
                    Indsend
                  </Button>
                )}
                {editable && (
                  <Button
                    component={Link}
                    endIcon={<Edit />}
                    href={`/content/${content?.id}/edit`}
                  >
                    Rediger
                  </Button>
                )}
              </ButtonGroup>
            }
          />
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {content?.data && (
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: content?.data }} />
                </CardContent>
              )}
            </Grid>
            {image && (
              <Grid item xs={3}>
                <Paper className={classes.image}>
                  <Image src={image} />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Card>
      </Fade>
      {content?.children &&
        (!content.parent || content.category.childMode === "changes") && (
          <Fade in={!loading}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  content.category.childMode == "changes"
                    ? "Ændringsforsalg"
                    : "Kandidaturer"
                }
                action={
                  !content.category.lockChildren && (
                    <AddChildButton content={content} />
                  )
                }
              ></CardHeader>
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
                        <Badge
                          badgeContent={
                            child.published ? getChangeNumber() : null
                          }
                          color="primary"
                        >
                          <Avatar>
                            {child.published ? (
                              <Tooltip title="Indsendt">
                                <Public color="secondary" />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Ikke Indsendt">
                                <Lock color="primary" />
                              </Tooltip>
                            )}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={child.name}
                        secondary={
                          content.category.childMode == "changes"
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
                                onClick={handleDeleteContent(child.id)}
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
                        content.category.childMode == "changes"
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
