import React from "react";
import { Card, Typography } from "@material-ui/core";
import { useStyles } from "hooks";

export default function HeaderCard({ children }: any) {
  const classes = useStyles();
  return (
    <Card>
      <Typography variant="h5" className={classes.header}>
        Adminpanel
      </Typography>
      {children}
    </Card>
  );
}
