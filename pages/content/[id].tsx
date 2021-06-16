import React from "react";
import { Link as NextLink } from "components";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { useStyles, useSession } from "hooks";
import { Cancel, HowToVote } from "@material-ui/icons";
import {
  CONTENT_GET,
  EVENT_SET_CONTENT,
  EVENT_SET_POLL,
  POLL_ADD,
  POLL_DEL,
  POLL_STOP,
} from "gql";
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Fade,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { AdminCard } from "components";

export default function Id() {
  const { session } = useSession({ redirectTo: "/login" });
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { loading, data: { content } = {} } = useQuery(CONTENT_GET, {
    variables: { id },
  });
  const [addPoll] = useMutation(POLL_ADD);
  const [stopPoll] = useMutation(POLL_STOP);
  const [deletePoll] = useMutation(POLL_DEL);
  const [focusContent] = useMutation(EVENT_SET_CONTENT);
  const [focusPoll] = useMutation(EVENT_SET_POLL);

  const handleAddPoll = async (_: any) => {
    stopPoll();
    const { data: { poll } = {} } = await addPoll({
      variables: { contentId: id },
    });
    await focusPoll({ variables: { pollId: poll?.id } });
    router.push(`/poll/${poll.id}`);
  };

  const handleStopPoll = (_: any) => {
    stopPoll();
  };

  const handleFocusContent = (id: any) => async (_: any) => {
    await focusContent({ variables: { contentId: id } });
  };

  const handleDeletePoll = (value: any) => (_: any) => {
    deletePoll({ variables: { id: value } });
  };

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
              {content?.category.name}
            </Link>
            <Link component={NextLink} color="primary" href={`/content/${id}`}>
              {content?.name}
            </Link>
          </Breadcrumbs>

          <Divider />
          <>
            <Typography
              color="secondary"
              className={classes.header}
              variant="h5"
            >
              {content?.name}
            </Typography>
            {content?.parent && (
              <Typography className={classes.linkHeader} variant="caption">
                {"Ændringsforslag til: "}
                <Link
                  component={NextLink}
                  color="primary"
                  href={`/content/${content.parent.id}`}
                >
                  {content?.parent.name}
                </Link>
              </Typography>
            )}
            <Typography className={classes.creatorText} color="textSecondary">
              {content?.creators}
            </Typography>

            <Typography
              className={classes.text}
              style={{ whiteSpace: "pre-line" }}
            >
              {content?.data}
            </Typography>
          </>
        </Card>
      </Fade>
      {content?.children && (
        <Card className={classes.card}>
          <Typography className={classes.header} color="secondary" variant="h5">
            Ændringsforsalg
          </Typography>

          <List>
            {content?.children.map((content: { name: any; id: any }) => (
              <ListItem
                button
                component={NextLink}
                href={`/content/${content.id}`}
              >
                <ListItemText primary={`${content.name}`} />
              </ListItem>
            ))}
          </List>
        </Card>
      )}
      {content?.polls && (
        <Card className={classes.card}>
          <Typography className={classes.header} color="secondary" variant="h5">
            Afstemningsresultater
          </Typography>

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
                  {session.role == "admin" && (
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
        </Card>
      )}
      <AdminCard show={!loading}>
        <ButtonGroup
          variant="contained"
          color="primary"
          className={classes.adminButton}
        >
          <Button
            size="large"
            color="secondary"
            onClick={handleFocusContent(id)}
          >
            Vis på skærm
          </Button>
          <Button
            size="large"
            color="secondary"
            onClick={handleFocusContent(null)}
          >
            Skjul på skærm
          </Button>
        </ButtonGroup>
        <Button
          size="large"
          className={classes.adminButton}
          color="secondary"
          variant="contained"
          onClick={handleAddPoll}
        >
          Start ny afstemning
        </Button>
      </AdminCard>
    </>
  );
}
