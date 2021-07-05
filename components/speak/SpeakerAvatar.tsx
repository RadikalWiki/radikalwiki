import React from "react";
import { Avatar } from "@material-ui/core";

export default function SpeakerAvatar(icon: any, color: any): any {
  const avatarStyle = {
    color: "#fff",
    backgroundColor: color,
  };
  return <Avatar style={avatarStyle}>{icon}</Avatar>;
}
