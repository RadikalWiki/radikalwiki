import React from "react";
import { Card, CardHeader, Typography } from "@mui/material";

export default function HeaderCard({
  children,
  title,
  avatar,
  subtitle,
  action,
}: {
  children?: any;
  title: string;
  avatar?: any;
  subtitle?: string;
  action?: any;
}) {
  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        action={action}
        subheader={subtitle}
        title={<Typography color="secondary">{title}</Typography>}
        avatar={avatar}
      />
      {children}
    </Card>
  );
}
