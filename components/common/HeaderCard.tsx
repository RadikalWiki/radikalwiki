import React from "react";
import { Card, CardHeader } from "@mui/material";

export default function HeaderCard({
  children,
  title,
  avatar,
}: {
  children: any;
  title: string;
  avatar?: any;
}) {
  return (
    <Card elevation={3} sx={{ m: (t) => t.spacing(1) }}>
      <CardHeader title={title} avatar={avatar} />
      {children}
    </Card>
  );
}
