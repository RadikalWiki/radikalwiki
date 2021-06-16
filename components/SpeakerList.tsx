import React, { useState } from "react";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useMutation, useSubscription } from "@apollo/client";
import { SPEAK_DEL, SPEAK_SUB } from "gql";
import { useSession } from "hooks";
import { avatars } from "components";
import { TransitionGroup } from "react-transition-group";

type SpeakerListProps = {
  interactive?: boolean;
};

export default function SpeakerList({ interactive }: SpeakerListProps) {
  const { session } = useSession({ redirectTo: "/login" });
  const { data: { speak } = {} } = useSubscription(SPEAK_SUB);
  const [removeSpeak] = useMutation(SPEAK_DEL);

  const handleRemoveSpeak = (value: any) => (_: any) => {
    removeSpeak({ variables: { id: value } });
  };

  return (
    <TransitionGroup>
      <List>
        {speak?.map(
          (speak: { user: any; created: any; id: any; type: number }) => (
            <Collapse in={true} key={speak.id}>
              <ListItem key={speak.id} button>
                <Tooltip title={avatars[speak.type].name}>
                  <ListItemAvatar>{avatars[speak.type].avatar}</ListItemAvatar>
                </Tooltip>
                <ListItemText primary={speak.user.name} />
                {interactive &&
                  (speak.user.id == session.id || session.role == "admin") && (
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={handleRemoveSpeak(speak.id)}
                        color="primary"
                        edge="end"
                        aria-label="Fjern fra talerliste"
                      >
                        <Cancel />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
              </ListItem>
            </Collapse>
          )
        )}
      </List>
    </TransitionGroup>
  );
}
