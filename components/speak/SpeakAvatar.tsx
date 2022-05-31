import React from "react";
import { Avatar } from "@mui/material";

export default function SpeakerAvatar(icon: any, color: any): any {
  return (
    <Avatar
      sx={{
        color: "#fff",
        backgroundColor: color,
      }}
    >
      {icon}
    </Avatar>
  );
}
