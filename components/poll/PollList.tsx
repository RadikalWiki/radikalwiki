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
import { useRouter } from "next/router";
import { IconId } from "mime";
import { Node, useScreen } from "hooks";

function PollListSuspense({ node }: { node: Node }) {
  const router = useRouter();
  const query = node.useQuery();
  const $delete = node.useDelete();
  const polls = query?.children({
    where: { mimeId: { _eq: "vote/poll" } },
  });
  const handleDeletePoll = (id: string) => async () => {
    await $delete({ id });
  };

  const owner = query?.isContextOwner;

  const card = (
    <HeaderCard
      avatar={
        <Avatar
          sx={{
            bgcolor: "secondary.main",
          }}
        >
          <IconId mimeId="vote/poll" />
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
                        bgcolor: "secondary.main",
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

  return polls?.[0]?.id ? card : null;
}

export default function PollList({ node }: { node: Node }) {
  const screen = useScreen();

  if (screen) return null;
  return (
    <Suspense fallback={null}>
      <PollListSuspense node={node} />
    </Suspense>
  );
}
