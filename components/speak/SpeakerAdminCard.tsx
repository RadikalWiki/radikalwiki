import React, { useState } from "react";
import {
  Autocomplete,
  Card,
  CardActions,
  CardHeader,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Tooltip,
} from "@mui/material";
import { Cancel, Clear, Lock, LockOpen } from "@mui/icons-material";
import { useMutation, useSubscription, order_by } from "gql";
import { useSession } from "hooks";
import { AdminCard, AutoButton, avatars } from "comps";
import { TransitionGroup } from "react-transition-group";
import { TimePicker } from "@mui/lab";
import SpeakerTextField from "./SpeakerTextField";

export default function SpeakerAdminCard() {
  const [session] = useSession();
  const [time, setTime] = React.useState<Date | null>(new Date());
  const [options, setOptions] = useState<any[]>([]);
  const subscription = useSubscription();
  const event = subscription.events_by_pk({
    id: session?.event?.id,
  });
  console.log(event)
  console.log(event?.speakerlistId)
  const speakerlist = event?.speakerlist;
  const speakers = speakerlist?.speakers({
    order_by: [
      { priority: order_by.desc },
      { type: order_by.desc },
      { createdAt: order_by.asc },
    ],
  });

  const [deleteSpeak] = useMutation((mutation, id: string) => {
    return mutation.delete_speaks_by_pk({ id })?.id;
  });

  const [deleteSpeakAll] = useMutation((mutation, args) => {
    return mutation.delete_speaks({
      where: { speakerlistId: { _eq: event?.speakerlistId } },
    })?.affected_rows;
  });

  const [updateSpeakerlist] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_speakerlists_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    }
  );

  const handleLockSpeak = async (locked: boolean) => {
    await updateSpeakerlist({
      args: { id: event?.speakerlistId as string, set: { locked } },
    });
  };

  return (
    <Card sx={{ m: 1 }}>
        <SpeakerTextField />
        <CardActions>
          <AutoButton
            text={event?.speakerlist?.locked ? "Åben" : "Luk"}
            icon={event?.speakerlist?.locked ? <Lock /> : <LockOpen />}
            onClick={() => handleLockSpeak(!event?.speakerlist?.locked)}
          />
          <AutoButton
            text="Ryd"
            icon={<Clear />}
            onClick={() => deleteSpeakAll()}
          />
        </CardActions>
      <List>
        <TransitionGroup>
          {speakers?.map(({ id = 0, user, type }, index) => (
            <Collapse key={id}>
              <ListItem key={id} button>
                <Tooltip title={avatars[type ?? 0].name}>
                  <ListItemAvatar>{avatars[type ?? 0].avatar}</ListItemAvatar>
                </Tooltip>
                <ListItemText primary={user?.identity?.displayName} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => deleteSpeak({ args: id })}
                    color="primary"
                    edge="end"
                    aria-label="Fjern fra talerliste"
                    size="large"
                  >
                    <Cancel />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Card>
  );
}
