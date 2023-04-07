import { Event, EventBusy, Group, GroupRemove } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useUserId } from '@nhost/nextjs';
import { fromId } from 'core/path';
import { order_by, resolved, useQuery } from 'gql';
import { useLink, useSession } from 'hooks';
import { startTransition } from 'react';

const abriv: {[name: string]: string} = {
  "Hovedbestyrelsesmøde": "HB",
  "Landsmøde": "LM",
}

const abrivContextName = (name?: string) => {
  const split = name
    ?.trim()
    .split(' ')
    .filter((name) => name[0] === name[0].toUpperCase() && !(/[0-9]/.test(name) && name.length > 1))
    .map(name => abriv[name] ? abriv[name] : name[0])

  switch (split?.length) {
    case 1:
      return split[0];
    case 2:
      return split[0] + split[1];
    case 3:
      return split[0] + split[1] + split[2];
  }
};

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
          _or: [
            { ownerId: { _eq: userId } },
            {
              members: {
                _and: [
                  { accepted: { _eq: true } },
                  { nodeId: { _eq: userId } },
                ],
              },
            },
          ],
        },
      ],
    },
  });
  const groups = query.nodes({
    order_by: [{ createdAt: order_by.desc }],
    where: {
      _and: [
        { mimeId: { _eq: 'wiki/group' } },
        {
          _or: [
            { ownerId: { _eq: userId } },
            {
              members: {
                _and: [
                  { accepted: { _eq: true } },
                  { nodeId: { _eq: userId } },
                ],
              },
            },
          ],
        },
      ],
    },
  });

  const handleContextSelect = (id: string) => async () => {
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
      link.id(id);
    });
  };

  return (
    <>
      <List>
        <ListItem key={-1}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <Group />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Grupper" />
        </ListItem>
        <Divider />
        {groups.map(({ id = '0', name }) => {
          const item = (
            <ListItemButton
              key={id}
              hidden={id == '0'}
              onClick={handleContextSelect(id)}
            >
              <ListItemIcon>
                {
                  <Avatar sx={{ width: 34, height: 34 }}>
                    <Typography fontSize={15}>
                      {abrivContextName(name)}
                    </Typography>{' '}
                  </Avatar>
                }
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          );
          return id ? item : null;
        })}
        {!groups?.[0]?.id && (
          <ListItem key={-2}>
            <ListItemIcon>
              <GroupRemove />
            </ListItemIcon>
            <ListItemText primary="Ingen grupper" />
          </ListItem>
        )}
      </List>
      <Divider />
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
        {events.map(({ id = '0', name }) => {
          const item = (
            <ListItemButton
              key={id}
              hidden={id == '0'}
              onClick={handleContextSelect(id)}
            >
              <ListItemIcon>
                {
                  <Avatar sx={{ width: 34, height: 34 }}>
                    <Typography fontSize={15}>
                      {abrivContextName(name)}
                    </Typography>{' '}
                  </Avatar>
                }
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
};

export default HomeList;
