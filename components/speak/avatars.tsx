import { green, orange, red, yellow } from "@mui/material/colors";
import {
  Announcement,
  EmojiPeople,
  LiveHelp,
  PanTool,
  RecordVoiceOver,
} from "@mui/icons-material";
import { SpeakAvatar } from "comps/speak";

const avatars: { [id: string]: any } = {
  0: {
    name: "Tal",
    priority: 0,
    avatar: SpeakAvatar(<RecordVoiceOver />, "#303f9f"),
  },
  1: {
    name: "Spørgsmål",
    priority: 1,
    avatar: SpeakAvatar(<LiveHelp />, yellow[700]),
  },
  2: {
    name: "Opklar",
    priority: 2,
    avatar: SpeakAvatar(<EmojiPeople />, green[700]),
  },
  3: {
    name: "Misforstået",
    priority: 3,
    avatar: SpeakAvatar(<Announcement />, orange[700]),
  },
  4: {
    name: "Procedure",
    priority: 4,
    avatar: SpeakAvatar(<PanTool />, red[700]),
  },
};

export default avatars;
