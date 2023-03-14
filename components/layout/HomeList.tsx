import { Event, EventBusy } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useUserId } from '@nhost/nextjs';
import { fromId } from 'core/path';
import { order_by, resolved, useQuery } from 'gql';
import { useLink, useSession } from 'hooks';
import { startTransition } from 'react';

const HomeList = ({ setOpen }: { setOpen: Function }) => {
  const link = useLink();
  const userId = useUserId();
  const query = useQuery();
  const [_, setSession] = useSession();
  const events = query.nodes({
    order_by: [{ createdAt: order_by.desc }],
    where: {
      _and: [
        { mimeId: { _eq: 'wiki/event' } },
        {
          members: {
            _and: [{ accepted: { _eq: true } }, { nodeId: { _eq: userId } }],
          },
        },
      ],
    },
  });

  const handleEventSelect = (id: string) => async () => {
    const prefix = await resolved(() => {
      const node = query.node({ id });
      return {
        id: node?.id,
        name: node?.name ?? '',
        mime: node?.mimeId!,
        namespace: node?.namespace,
      };
    });

    const path = await fromId(id);
    startTransition(() => {
      setSession({
        prefix: {
          ...prefix,
          path,
        },
      });
      setOpen(false);
      link.id(id)
    });
  };

  return (
    <>
      <List>
        <ListItem key={-1}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <Event />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Begivenheder" />
        </ListItem>
        <Divider />
        {events.map(({ id = "0", name }) => {
          const item = (
            <ListItemButton
              key={id}
              hidden={id == "0"}
              onClick={handleEventSelect(id)}
            >
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          );
          return id ? item : null;
        })}
        {!events?.[0]?.id && (
          <ListItem key={-2}>
            <ListItemIcon>
              <EventBusy />
            </ListItemIcon>
            <ListItemText primary="Ingen begivenheder" />
          </ListItem>
        )}
      </List>
      <Divider />
    </>
  );
}

export default HomeList;