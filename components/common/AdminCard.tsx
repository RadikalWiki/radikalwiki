import React from "react";
import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import { SupervisorAccount } from "@mui/icons-material";

export default function AdminCard({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  return (
    <Card elevation={3} sx={{ m: 1, bgcolor: (t) => t.palette.primary.main }}>
      <CardHeader
        title={
          <Typography variant="h5" sx={{ color: "#fff" }}>
            {title}
          </Typography>
        }
        avatar={
          <Avatar
            sx={{
              bgcolor: (t) => t.palette.secondary.main,
            }}
          >
            <SupervisorAccount />
          </Avatar>
        }
      />
      {children}
    </Card>
  );
}
