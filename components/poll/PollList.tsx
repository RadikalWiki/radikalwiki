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
  Fade,
} from "@mui/material";
import { Cancel, HowToVote } from "@mui/icons-material";
import { useSession } from "hooks";
import { useMutation, useQuery } from "gql";

function PollListRaw({ id }: { id: string }) {
  const [session] = useSession();
  const query = useQuery();
  const polls = query.contents_by_pk({ id })?.polls();
  const [deletePoll] = useMutation((mutation, id: string) => {
    return mutation.delete_polls_by_pk({ id })?.id;
  }, {
    refetchQueries: [query.contents_by_pk({ id })?.polls()]
  });

  const handleDeletePoll = (id: string) => async () => {
    await deletePoll({ args: id });
  };

  if (polls && polls.length == 0) return null;

  return (
    <HeaderCard title="Afstemninger">
      <Divider />
      <List>
        {polls?.map(({ id = 0, votes_aggregate, createdAt }) => (
          <Fragment key={id}>
            <ListItem button component={NextLink} href={`/poll/${id}`}>
              <Tooltip title="Antal stemmer">
                <ListItemAvatar>
                  <Badge
                    color="secondary"
                    max={1000}
                    badgeContent={votes_aggregate().aggregate?.count()}
                  >
                    <Avatar sx={{ backgroundColor: "#ec407a" }}>
                      <HowToVote sx={{ color: "#fff" }} />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                primary={`${new Date(createdAt).toLocaleString("da-DK")}`}
              />
              {session?.roles?.includes("admin") && (
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

export default function PollList({ id }: { id: string }) {
  return (
     <Suspense fallback={null}>
       <PollListRaw id={id} />
     </Suspense>
  );
}