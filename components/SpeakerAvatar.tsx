import React from "react";
import { Avatar } from "@material-ui/core";
import { green, orange, red, yellow } from "@material-ui/core/colors";
import {
  Announcement,
  EmojiPeople,
  LiveHelp,
  PanTool,
  RecordVoiceOver,
} from "@material-ui/icons";

export default function SpeakerAvatar(icon: any, color: any): any {
  const avatarStyle = {
    color: "#fff",
    backgroundColor: color,
  };
  return <Avatar style={avatarStyle}>{icon}</Avatar>;
}

const avatars = [
  {
    name: "Tal",
    value: 0,
    avatar: SpeakerAvatar(<RecordVoiceOver />, "#303f9f"),
  },
  {
    name: "Spørgsmål",
    value: 1,
    avatar: SpeakerAvatar(<LiveHelp />, yellow[700]),
  },
  {
    name: "Opklar",
    value: 2,
    avatar: SpeakerAvatar(<EmojiPeople />, green[700]),
  },
  {
    name: "Misforstået",
    value: 3,
    avatar: SpeakerAvatar(<Announcement />, orange[700]),
  },
  {
    name: "Procedure",
    value: 4,
    avatar: SpeakerAvatar(<PanTool />, red[700]),
  },
];

export { avatars };
