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
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useMutation, useSubscription } from "@apollo/client";
import { SPEAK_DEL, EVENT_SUB_SPEAK } from "gql";
import { useSession, useStyles } from "hooks";
import { avatars } from "components";

export default function SpeakerCard({
  interactive,
}: {
  interactive?: boolean;
}) {
  const [session] = useSession();
  const classes = useStyles();
  const { error, data: { speaks } = {} } = useSubscription(EVENT_SUB_SPEAK, {
    variables: { id: session?.event?.id },
  });
  const [removeSpeak] = useMutation(SPEAK_DEL);

  const handleRemoveSpeak = (value: any) => (_: any) => {
    removeSpeak({ variables: { id: value } });
  };

  return (
    <Card className={classes.card}>
      <CardHeader title="Talerliste" className={classes.cardHeader} />
      <List>
        {speaks?.map(
          (speak: { user: any; created: any; id: any; type: number }) => (
            <Collapse in={true} key={speak.id}>
              <ListItem key={speak.id} button>
                <Tooltip title={avatars[speak.type].name}>
                  <ListItemAvatar>{avatars[speak.type].avatar}</ListItemAvatar>
                </Tooltip>
                <ListItemText primary={speak.user.identity.displayName} />
                {interactive &&
                  (speak.user.id == session?.user.id ||
                    session?.roles.includes("admin")) && (
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
    </Card>
  );
}
