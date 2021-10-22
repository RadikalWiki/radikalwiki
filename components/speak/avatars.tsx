import { green, orange, red, yellow } from "@mui/material/colors";
import {
  Announcement,
  EmojiPeople,
  LiveHelp,
  PanTool,
  RecordVoiceOver,
} from "@mui/icons-material";
import { SpeakerAvatar } from "comps/speak";

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

export default avatars;
