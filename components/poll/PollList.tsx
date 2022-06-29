import React, { Fragment, Suspense } from "react";
import { HeaderCard, Link as NextLink } from "comps";
import {
  List,
  ListItem,
  ListItemText,
  Tooltip,
  ListItemAvatar,
  Badge,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material";
import { Cancel, HowToVote } from "@mui/icons-material";
import { useMutation, useQuery } from "gql";
import { useRouter } from "next/router";
import { getIcon } from "mime";

function PollList({ id }: { id: string }) {
  const router = useRouter();
  const query = useQuery();
  const node = query.node({ id });
  const polls = node?.children({
    where: { mimeId: { _eq: "vote/poll" } },
  });
  const [deletePoll] = useMutation(
    (mutation, id: string) => {
      return mutation.deleteNode({ id })?.id;
    },
    {
      refetchQueries: [polls],
    }
  );

  const handleDeletePoll = (id: string) => async () => {
    await deletePoll({ args: id });
  };

  const owner = node?.isOwner;

  if (polls && polls.length == 0) return null;

  return (
    <HeaderCard
      avatar={
        <Avatar
          sx={{
            bgcolor: (theme) => theme.palette.secondary.main,
          }}
        >
          {getIcon("vote/poll")}
        </Avatar>
      }
      title="Afstemninger"
    >
      <Divider />
      <List>
        {polls?.map(({ id = 0, namespace, children_aggregate, createdAt }) => (
          <Fragment key={id}>
            <ListItem
              button
              component={NextLink}
              href={`${router.asPath}/${namespace}`}
            >
              <Tooltip title="Antal stemmer">
                <ListItemAvatar>
                  <Badge
                    color="primary"
                    max={1000}
                    overlap="circular"
                    badgeContent={
                      children_aggregate().aggregate?.count() || "0"
                    }
                  >
                    <Avatar
                      sx={{
                        bgcolor: (t) => t.palette.secondary.main,
                      }}
                    >
                      <HowToVote sx={{ color: "#fff" }} />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                primary={`${new Date(createdAt).toLocaleString("da-DK")}`}
              />
              {owner && (
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={handleDeletePoll(id)}
                    color="primary"
                    edge="end"
                    size="large"
                  >
                    <Cancel />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </HeaderCard>
  );
}

export default function Component({ id }: { id: string }) {
  return (
    <Suspense fallback={null}>
      <PollList id={id} />
    </Suspense>
  );
}
