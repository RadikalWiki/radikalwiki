import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useMutation, useSubscription, order_by } from "gql";
import { useSession } from "hooks";
import { avatars } from "components";
import { TransitionGroup } from "react-transition-group";

export default function SpeakerCard({
  interactive,
}: {
  interactive?: boolean;
}) {
  const [session] = useSession();
  const subscription = useSubscription();
  const event = subscription.events_by_pk({
    id: session?.event?.id,
  });
  const speakerlist = event?.speakerlist;
  const speakers = speakerlist?.speakers({
    order_by: [{ type: order_by.desc }, { createdAt: order_by.asc }],
  });

  const [deleteSpeak] = useMutation((mutation, id: string) => {
    return mutation.delete_speaks_by_pk({ id })?.id;
  });

  const handleRemoveSpeak = (value: any) => (_: any) => {
    deleteSpeak({ args: value });
  };

  const speaks = speakers?.filter((s) => s.type == 0);
  const others = speakers?.filter((s) => s.type != 0);

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title="Talerliste"
        sx={{
          bgcolor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.secondary.contrastText,
        }}
      />
      <List>
        <TransitionGroup>
          {speaks?.map(({ id = 0, user, type }) => (
            <Collapse key={id}>
              <ListItem key={id} button>
                <Tooltip title={avatars[type ?? 0].name}>
                  <ListItemAvatar>{avatars[type ?? 0].avatar}</ListItemAvatar>
                </Tooltip>
                <ListItemText primary={user?.identity?.displayName} />
                {interactive &&
                  (user?.id == session?.user?.id ||
                    session?.roles?.includes("admin")) && (
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={handleRemoveSpeak(id)}
                        color="primary"
                        edge="end"
                        aria-label="Fjern fra talerliste"
                        size="large"
                      >
                        <Cancel />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <List>
        <TransitionGroup>
          {others?.map(({ id = 0, user, type }) => (
            <Collapse key={id}>
              <ListItem key={id} button>
                <Tooltip title={avatars[type ?? 0].name}>
                  <ListItemAvatar>{avatars[type ?? 0].avatar}</ListItemAvatar>
                </Tooltip>
                <ListItemText primary={user?.identity?.displayName} />
                {interactive &&
                  (user?.id == session?.user?.id ||
                    session?.roles?.includes("admin")) && (
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={handleRemoveSpeak(id)}
                        color="primary"
                        edge="end"
                        aria-label="Fjern fra talerliste"
                        size="large"
                      >
                        <Cancel />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Card>
  );
}
