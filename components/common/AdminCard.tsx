import React from "react";
import { Card, Typography, Fade } from "@mui/material";
import { useSession } from "hooks";

export default function AdminCard({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  const [session] = useSession();

  if (!session?.roles?.includes("admin")) return null;

  return (
    <Card elevation={3} sx={{ m: 1, bgcolor: (theme) => theme.palette.primary.main }}>
      <Typography variant="h5" sx={{ color: "#fff", m: 2}}>
        {title}
      </Typography>
      {children}
    </Card>
  );
}
