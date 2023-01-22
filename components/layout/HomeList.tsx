import { Event, EventBusy } from "@mui/icons-material";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from "@mui/material";
import { useUserId } from "@nhost/react";
import { fromId } from "core/path";
import { order_by, resolved, useQuery } from "gql";
import { useSession } from "hooks";
import { useRouter } from "next/router";
import { startTransition } from "react";

export default function HomeList({ setOpen }: { setOpen: Function }) {
  const router = useRouter();
  const userId = useUserId();
  const query = useQuery();
  const [_, setSession] = useSession();
  const events = query.nodes({
    order_by: [{ createdAt: order_by.desc }],
    where: {
      _and: [
        { mimeId: { _eq: "wiki/event" } },
        {
          members: {
            _and: [{ accepted: { _eq: true } }, { nodeId: { _eq: userId } }],
          },
        },
      ],
    },
  });

  const handleEventSelect = (id: any) => async () => {
    const prefix = await resolved(() => {
      const node = query.node({ id });
      return {
        id: node?.id,
        name: node?.name ?? "",
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
      router.push(`/${path.join("/")}`);
    });
  };

  return (
    <>
      <List>
        <ListItem key={-1}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: (t) => t.palette.secondary.main }}>
              <Event />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Begivenheder" />
        </ListItem>
        <Divider />
        {events.map(({ id = 0, name }) => {
          const item = (
            <ListItem
              key={id}
              hidden={id == 0}
              button
              onClick={handleEventSelect(id)}
            >
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
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