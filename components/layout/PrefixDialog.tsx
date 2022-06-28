import React from "react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { Event, EventBusy } from "@mui/icons-material";
import { useQuery, resolved } from "gql";
import { useSession } from "hooks";
import { fromId } from "core/path";
import { useUserId } from "@nhost/react";

export default function PrefixDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const router = useRouter();
  const userId = useUserId();
  const [_, setSession] = useSession();
  const query = useQuery();
  const events = query.nodes({
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
    setSession({
      prefix: {
        ...prefix,
        path,
      },
    });
    setOpen(false);
    router.push("/" + path.join("/"));
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Vælg begivenhed</DialogTitle>
      <Divider />
      <List>
        {events.map(({ id = 0, name }) => (
          <ListItem
            key={id}
            hidden={id == 0}
            button
            onClick={handleEventSelect(id)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: (t) => t.palette.secondary.main }}>
                <Event />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        ))}
        {events?.length == 0 && (
          <ListItem key={-1}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: (t) => t.palette.secondary.main }}>
                <EventBusy />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Ingen begivenheder" />
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}
