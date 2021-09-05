import React from "react";
import { Card, Typography, Fade } from "@material-ui/core";
import { useStyles, useSession } from "hooks";

export default function AdminCard({
  children,
  show,
  title,
}: {
  children: any;
  show: boolean;
  title: string;
}) {
  const [session] = useSession();
  const classes = useStyles();

  if (!session?.roles.includes("admin")) return null;

  return (
    <Fade in={show}>
      <Card className={classes.cardAdmin}>
        <Typography variant="h5" className={classes.adminHeader}>
          {title}
        </Typography>
        {children}
      </Card>
    </Fade>
  );
}
