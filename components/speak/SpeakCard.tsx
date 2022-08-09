import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Cancel, DoNotTouch, Lock, LockOpen } from "@mui/icons-material";
import { avatars } from "comps";
import { TransitionGroup } from "react-transition-group";
import { order_by } from "gql";
import { Node, useScreen } from "hooks";

const timeString = (time: number) => {
  const sec = String(time % 60);
  const secFmt = sec.length > 1 ? sec : `0${sec}`;
  const min = String(Math.floor(time / 60));
  const minFmt = min.length > 1 ? min : `0${min}`;

  return `${minFmt}:${secFmt}`;
};

export default function SpeakCard({
  node,
  time,
}: {
  node: Node;
  time: number;
}) {
  const screen = useScreen();
  const get = node.useSubsGet();
  const $delete = node.useDelete();
  const speakerlist = get("speakerlist");
  const speakers = speakerlist?.children({
    where: { mimeId: { _eq: "speak/speak" } },
    order_by: [{ data: order_by.desc }, { createdAt: order_by.asc }],
  });

  const handleRemoveSpeak = (id: any) => (_: any) => {
    $delete({ id });
  };

  return (
    <Card sx={{ m: 0 }}>
      <CardHeader
        title={
          <Typography variant="h5" sx={{ color: "#fff" }}>
            Talerliste
          </Typography>
        }
        avatar={
          <Avatar
            sx={{
              bgcolor: (t) =>
                speakerlist?.mutable
                  ? t.palette.success.main
                  : t.palette.error.main,
            }}
          >
            {speakerlist?.mutable ? <LockOpen /> : <Lock />}
          </Avatar>
        }
        action={
          <Paper
            sx={{
              bgcolor: (t) => t.palette.primary.main,
              pl: 2,
              pr: 2,
              pt: 0.5,
              pb: 0.5,
            }}
          >
            <Typography variant="h4" sx={{ color: "#fff" }}>
              {timeString(time)}
            </Typography>
          </Paper>
        }
        sx={{
          bgcolor: (t) => t.palette.secondary.main,
          color: (t) => t.palette.secondary.contrastText,
        }}
      />
      <List>
        <TransitionGroup>
          {speakers?.map(({ id = 0, name, isOwner, data }) => {
            const avatarData = data();
            if (!id) return null;
            return (
              <Collapse key={id}>
                <ListItem button>
                  {avatarData && (
                    <Tooltip title={avatars[avatarData]?.name}>
                      <ListItemAvatar>
                        {avatars[avatarData]?.avatar}
                      </ListItemAvatar>
                    </Tooltip>
                  )}
                  <ListItemText primary={name} />
                  {!screen &&
                    (speakerlist?.isContextOwner || speakerlist?.isOwner) && (
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
            );
          })}
          {speakers?.length == 0 && (
            <Collapse key={-1}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: (t) => t.palette.secondary.main,
                    }}
                  >
                    <DoNotTouch />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Talerlisten er tom" />
              </ListItem>
            </Collapse>
          )}
        </TransitionGroup>
      </List>
    </Card>
  );
}
