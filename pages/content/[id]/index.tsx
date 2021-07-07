import React from "react";
import {
  Link as NextLink,
  HeaderCard,
  ContentAdmin,
  AddChildButton,
} from "comps";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { useStyles, useSession } from "hooks";
import { Cancel, HowToVote, Edit } from "@material-ui/icons";
import { CONTENT_GET, POLL_DEL } from "gql";
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
} from "@material-ui/core";

let changeNumber = 0;
const getChangeNumber = () => {
  changeNumber += 1;
  return changeNumber;
};

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

  const [deletePoll] = useMutation(POLL_DEL);

  const handleDeletePoll = (value: any) => (_: any) => {
    deletePoll({ variables: { id: value } });
  };

  const editable =
    session?.user.id === content?.creatorId ||
    (content?.authors.some(
      (a: any) => a.identity?.user?.id === session?.user.id
    ) &&
      !content?.category.lockContent) ||
    session?.roles.includes("admin");

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

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
            {content?.parent && (
              <Link
                component={NextLink}
                color="primary"
                href={`/content/${content?.parent.id}`}
              >
                {content?.parent.name}
              </Link>
            )}
            <Link component={NextLink} color="primary" href={`/content/${id}`}>
              {content?.name}
            </Link>
          </Breadcrumbs>
        </Card>
      </Fade>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <CardHeader
            title={content?.name}
            subheader={formatAuthors(content?.authors)}
            action={
              editable && (
                <Link
                  component={NextLink}
                  color="primary"
                  href={`/content/${content?.id}/edit`}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Edit />}
                  >
                    Rediger
                  </Button>
                </Link>
              )
            }
          ></CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: content?.data }} />
          </CardContent>
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
                  (content: { name: any; id: any; authors: any }) => (
                    <ListItem
                      button
                      component={NextLink}
                      href={`/content/${content.id}`}
                    >
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          {getChangeNumber()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={content.name}
                        secondary={formatAuthors(content?.authors)}
                      />
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
