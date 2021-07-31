import React, { useEffect, useState } from "react";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { useSession, useStyles } from "hooks";
import { useMutation } from "@apollo/client";
import { TIMER_SET } from "gql";

const timeString = (time: number) => {
  let sec = String(time % 60);
  sec = sec.length > 1 ? sec : `0${sec}`;
  let min = String(Math.floor(time / 60));
  min = min.length > 1 ? min : `0${min}`;

  return `${min}:${sec}`;
};

export default function Countdown({
  timer,
  interactive,
}: {
  timer: any;
  interactive?: boolean;
}) {
  const [session] = useSession();
  const [time, setTime] = useState(0);
  const [timeBox, setTimeBox] = useState(120);
  const [setTimer] = useMutation(TIMER_SET);
  const classes = useStyles();

  const handleTimerSet = (time: number) => {
    setTimer({ variables: { id: timer?.id, time } });
  };

  useEffect(() => {
    const now = new Date();
    const created = new Date(timer?.updatedAt);
    let sec = Math.floor(
      timer?.time - (now.getTime() - created.getTime()) / 1000
    );
    sec = sec >= 0 ? sec : 0;
    setTime(sec);
    const interval = setInterval(() => {
      setTime((time) => (time > 1 ? time - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Card className={classes.countdown}>
      <Typography className={classes.text} variant="h5">
        Taletid: {timeString(time)}
      </Typography>
      {interactive && session?.roles.includes("admin") && (
        <>
          <TextField
            id="filled-number"
            label="Taletid"
            type="number"
            color="secondary"
            value={timeBox}
            className={classes.adminTextField}
            InputLabelProps={{
              shrink: true,
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
            onChange={(e) => setTimeBox(parseInt(e.target.value))}
            variant="filled"
          />
          <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.adminButton}
            onClick={() => handleTimerSet(time > 0 ? 0 : timeBox)}
          >
            {time == 0 ? "Start" : "Stop"}
          </Button>
        </>
      )}
    </Card>
  );
}
