import React, { Suspense } from "react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Add, Event } from "@mui/icons-material";
import { useQuery, query, resolved } from "gql";
import { useSession } from "hooks";

export default function EventDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const router = useRouter();
  const [session, setSession] = useSession();
  const events = useQuery().events();

  const handleEventSelect = (id: any) => async () => {
    const roles = (
      await resolved(() =>
        query
          .events_by_pk({ id })
          ?.group?.memberships({
            where: { email: { _eq: session?.user?.email } },
          })
          ?.map(({ roles }) => roles().map(({ role }) => role ?? ""))
      )
    )?.flat();
    const isCreator =
      (await resolved(() => query.events_by_pk({ id })?.group?.creator?.id)) ==
      session?.user?.id;
    const event = await resolved(() => {
      const event = query.events_by_pk({ id });
      return { id: event?.id, name: event?.name ?? "", shortName: event?.shortName ?? "", folderId: event?.folderId };
    });
    setSession({
      event,
      roles: isCreator ? roles?.concat("admin") : roles,
      path: []
    });
    setOpen(false);
    router.push("/folder");
  };

  const addEvent = () => {
    router.push("/event/new")
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Vælg begivenhed</DialogTitle>
      <List>
        {events.map(({ id = 0, name }) => (
          <ListItem key={id} button onClick={handleEventSelect(id)}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
                <Event />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        ))}
        {session?.user?.sysAdmin &&
          <ListItem key="add" button onClick={addEvent}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: (t) => t.palette.secondary.main }}>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Tilføj begivenhed" />
          </ListItem>
        }
      </List>
    </Dialog>
  );
}
