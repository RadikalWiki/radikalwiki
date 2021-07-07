import React, { Fragment } from "react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { Event } from "@material-ui/icons";
import { EVENTS_GET, EVENT_GET_ROLE } from "gql";
import { useQuery, useApolloClient } from "@apollo/client";
import { useSession, useStyles } from "hooks";

const getRoles = (userId: string, group: any) => {
  const roles = new Set();
  group.memberships[0].roles.forEach((e: any) => roles.add(e.role));
  if (group.creatorId == userId) {
    roles.add("admin");
  }
  return [...roles];
};

export default function EventDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const classes = useStyles();
  const [session, setSession] = useSession();
  const { loading, data, error } = useQuery(EVENTS_GET);
  const client = useApolloClient();

  const handleEventSelect = (event: any) => async () => {
    const {
      data: {
        event: { group },
      },
    } = await client.query({
      query: EVENT_GET_ROLE,
      variables: { id: event.id, email: session.user.email },
    });
    const roles = getRoles(session.user.id, group);
    setSession({ event, roles });
    setOpen(false);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Vælg Begivenhed</DialogTitle>
      <List>
        {data?.events.map((event: { name: any; id: any }) => (
          <Fragment key={event.id}>
            <ListItem button onClick={handleEventSelect(event)}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Event />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={event.name} />
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Dialog>
  );
}
