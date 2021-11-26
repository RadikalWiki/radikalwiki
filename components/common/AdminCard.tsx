import React from "react";
import { Card, Typography, Fade, CardHeader } from "@mui/material";
import { useSession } from "hooks";
import { AnyMxRecord } from "dns";

export default function AdminCard({
  children,
  title,
  action
}: {
  children: any;
  title: string;
  action?: any;
}) {
  const [session] = useSession();

  if (!session?.roles?.includes("admin")) return null;

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={title}
        sx={{
          bgcolor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.secondary.contrastText,
        }}
        action={action}
      />
      {children}
    </Card>
  );
}
