import React, { Fragment, Suspense } from 'react';
import { HeaderCard, Link as NextLink } from 'comps';
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
  ListItemButton,
} from '@mui/material';
import { Cancel, HowToVote } from '@mui/icons-material';
import { IconId } from 'mime';
import { Node, useLink, useScreen } from 'hooks';

const PollListSuspense = ({ node }: { node: Node }) => {
  const link = useLink();
  const query = node.useQuery();
  const $delete = node.useDelete();
  const polls = query?.children({
    where: { mimeId: { _eq: 'vote/poll' } },
  });
  const handleDeletePoll = (id?: string) => async () => {
    if (!id) return;
    await $delete({ id });
  };

  const owner = query?.isContextOwner;

  const card = (
    <HeaderCard
      avatar={
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
          }}
        >
          <IconId mimeId="vote/poll" />
        </Avatar>
      }
      title="Afstemninger"
    >
      <Divider />
      <List>
        {polls?.map(({ id, namespace, children_aggregate, createdAt }) => (
          <Fragment key={id ?? 0}>
            <ListItemButton
              onClick={() => link.push([namespace!])}
            >
              <Tooltip title="Antal stemmer">
                <ListItemAvatar>
                  <Badge
                    color="primary"
                    max={1000}
                    overlap="circular"
                    badgeContent={
                      children_aggregate().aggregate?.count() || '0'
                    }
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'secondary.main',
                      }}
                    >
                      <HowToVote sx={{ color: '#fff' }} />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                primary={`${new Date(createdAt!).toLocaleString('da-DK')}`}
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
            </ListItemButton>
            <Divider />
          </Fragment>
        ))}
      </List>
    </HeaderCard>
  );

  return polls?.[0]?.id ? card : null;
}

const PollList = ({ node }: { node: Node }) => {
  const screen = useScreen();

  if (screen) return null;
  return (
    <Suspense fallback={null}>
      <PollListSuspense node={node} />
    </Suspense>
  );
}

export default PollList;