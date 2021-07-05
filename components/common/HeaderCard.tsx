import React from "react";
import { Card, CardHeader } from "@material-ui/core";
import { useStyles } from "hooks";

export default function HeaderCard({
  children,
  title,
  avatar,
}: {
  children: any;
  title: string;
  avatar?: any;
}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title={title} avatar={avatar} />
      {children}
    </Card>
  );
}
