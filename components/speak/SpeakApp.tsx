import React, { Suspense, useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Collapse,
  Grid,
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
import { useMutation, order_by } from "gql";
import { useNode, useSession } from "hooks";
import { avatars, SpeakDial, SpeakAdmin } from "comps";
import { TransitionGroup } from "react-transition-group";
import SpeakCard from "./SpeakCard";

export default function SpeakApp({ screen }: { screen?: boolean }) {
  const [session] = useSession();
  const [time, setTime] = useState(0);
  const { sub, subGet } = useNode();

  const speakerlist = subGet("speakerlist");

  const data = speakerlist?.data();

  useEffect(() => {
    if (!session?.timeDiff) return;
    const now = new Date();
    const updatedAt = new Date(data?.updatedAt);
    const sec = Math.floor(
      (data?.time ?? 0) -
        (now.getTime() - updatedAt.getTime() - session?.timeDiff) / 1000
    );
    setTime(sec >= 0 ? sec : 0);
    const interval = setInterval(() => {
      setTime((time) => (time > 1 ? time - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [time, data?.time, data?.updatedAt, session?.timeDiff]);

  const owner = sub?.isContextOwner;

  return (
    <>
      <Grid container justifyContent="center">
        {!screen && owner && (
          <Grid item xs={12} md={6}>
            <SpeakAdmin speakerlist={speakerlist!} time={time} />
          </Grid>
        )}
        <Grid item xs={12} md={!screen ? 6 : 12}>
          <SpeakCard speakerlist={speakerlist!} time={time} />
        </Grid>
      </Grid>
      {!screen && speakerlist?.id && (
        <Suspense fallback={null}>
          <SpeakDial id={speakerlist?.id} />{" "}
        </Suspense>
      )}
    </>
  );
}
