import React from "react";
import { Card, CardHeader } from "@material-ui/core";
import { useStyles } from "hooks";
import { Countdown, SpeakerAdmin, SpeakerDial, SpeakerList } from "components";

export default function Speak() {
  const classes = useStyles();

  return (
    <>
      <SpeakerAdmin />
      <Countdown interactive />
      <Card className={classes.speakerCard}>
        <CardHeader title="Talerliste" className={classes.cardHeader} />
        <SpeakerList interactive />
      </Card>
      <SpeakerDial />
    </>
  );
}
