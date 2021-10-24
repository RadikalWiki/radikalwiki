import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "hooks";
import { timers_set_input, useMutation, useSubscription } from "gql";

const timeString = (time: number) => {
  let sec = String(time % 60);
  sec = sec.length > 1 ? sec : `0${sec}`;
  let min = String(Math.floor(time / 60));
  min = min.length > 1 ? min : `0${min}`;

  return `${min}:${sec}`;
};

export default function Countdown({ interactive }: { interactive?: boolean }) {
  const [session] = useSession();
  const [time, setTime] = useState(0);
  const [timeBox, setTimeBox] = useState(120);
  const [setTimer] = useMutation((mutation, args: timers_set_input) => {
    return mutation.update_timers({
      where: { eventId: { _eq: session?.event?.id } },
      _set: args,
    })?.affected_rows;
  });
  const subscription = useSubscription();
  const timer = subscription.events_by_pk({ id: session?.event?.id })?.timer;

  const handleTimerSet = (time: number) => {
    setTimer({
      args: { time },
    });
  };

  useEffect(() => {
    if (!session?.timeDiff) return;
    const now = new Date();
    const created = new Date(timer?.updatedAt);
    let sec = Math.floor(
      timer?.time ??
        0 - (now.getTime() - created.getTime() - session?.timeDiff) / 1000
    );
    sec = sec >= 0 ? sec : 0;
    setTime(sec);
    const interval = setInterval(() => {
      setTime((time) => (time > 1 ? time - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, session?.timeDiff]);

  return (
    <Card
      sx={{
        m: 1,
        bgcolor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.secondary.contrastText,
      }}
    >
      <CardContent>
        <Typography variant="h5">Taletid: {timeString(time)}</Typography>
      </CardContent>
      {interactive && session?.roles?.includes("admin") && (
        <>
          <TextField
            id="filled-number"
            label="Taletid"
            type="number"
            color="secondary"
            value={timeBox}
            sx={{
              bgcolor: (theme) => theme.palette.secondary.main,
              borderColor: "white",
              m: 2,
            }}
            InputLabelProps={{
              shrink: true,
              sx: { color: "#fff" },
            }}
            InputProps={{
              sx: { color: "#fff" },
            }}
            onChange={(e) => setTimeBox(parseInt(e.target.value))}
            variant="filled"
          />
          <Button
            color="secondary"
            variant="contained"
            size="large"
            sx={{ color: "#fff", m: 2 }}
            onClick={() => handleTimerSet(time > 0 ? 0 : timeBox)}
          >
            {time == 0 ? "Start" : "Stop"}
          </Button>
        </>
      )}
    </Card>
  );
}
