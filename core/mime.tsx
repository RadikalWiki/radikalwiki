import {
  Event,
  Folder,
  Gavel,
  Group,
  HowToReg,
  Person,
  Subject,
  RateReview,
  Home,
  Poll,
  Face,
  Article,
  UploadFile,
  QuestionMark,
  InterpreterMode,
  LockOpen,
  Image,
  MusicNote,
} from "@mui/icons-material";
import MicrosoftExcelIcon from "./svg/microsoft-excel.svg";
import MicrosoftWordIcon from "./svg/microsoft-word.svg";
import FilePdfBoxIcon from "./svg/file-pdf-box.svg";
import VideoBoxIcon from "./svg/video-box.svg";
import {
  Avatar as MuiAvatar,
  Badge,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Maybe, nodes } from "./gql/schema.generated";
import { Suspense } from "react";
import useScreen from "./hooks/useScreen";

const getLetter = (index: number) => {
  const f = String.fromCharCode(65 + (index % 26));
  return index >= 26 ? String.fromCharCode(64 + Math.floor(index / 26)) + f : f;
};

const MimeIcon = ({
  node,
  index,
}: {
  node?: Maybe<Partial<nodes>>;
  index?: number;
}) => {
  return (
    <Suspense fallback={<Skeleton variant="circular" width={24} height={24} />}>
      <Icon node={node} index={index} />
    </Suspense>
  );
};

const MimeAvatar = ({
  node,
  index,
}: {
  node?: Maybe<Partial<nodes>>;
  index?: number;
}) => {
  return (
    <Suspense fallback={<Skeleton variant="circular" width={32} height={32} />}>
      <Avatar node={node} index={index} />
    </Suspense>
  );
};

const Icon = ({
  node,
  index,
}: {
  node?: Maybe<Partial<nodes>>;
  index?: number;
}) => {
  const type = node?.data?.({ path: "type" });
  const mimeId = node?.mimeId;
  const id = type ?? mimeId;
  return getIconFromId(id, index);
};

const Avatar = ({
  node,
  index,
}: {
  node?: Maybe<Partial<nodes>>;
  index?: number;
}) => {
  const screen = useScreen();
  const type = node?.data?.({ path: "type" });
  const mimeId = node?.mimeId;
  const id = type ?? mimeId;
  const avatar = (
    <MuiAvatar
      sx={{
        bgcolor: (t) =>
          screen ? t.palette.primary.main : t.palette.secondary.main,
      }}
    >
      {getIconFromId(id, index, true)}
    </MuiAvatar>
  );
  return node?.mutable && !screen ? (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={
        <Tooltip title="Ikke indsendt">
          <MuiAvatar
            sx={{
              width: 18,
              height: 18,
              bgcolor: (t) => t.palette.primary.main,
            }}
          >
            <LockOpen
              sx={{
                width: 14,
                height: 14,
                color: "#fff",
              }}
            />
          </MuiAvatar>
        </Tooltip>
      }
    >
      {avatar}
    </Badge>
  ) : (
    avatar
  );
};

const getIconFromId = (mimeId?: string, index?: number, avatar?: boolean) => {
  switch (mimeId) {
    case "wiki/home":
      return <Home />;
    case "wiki/group":
      return <Group />;
    case "wiki/event":
      return <Event />;
    case "wiki/folder":
      return <Folder />;
    case "wiki/document":
      return <Article />;
    case "wiki/file":
      return <UploadFile />;
    case "wiki/user":
      return <Person />;
    case "text/plain":
      return <Subject />;
    case "vote/policy":
      return index !== undefined && index !== -1 ? (
        avatar ? (
          <Typography fontSize={24} sx={{ color: "inherit" }}>
            {getLetter(index)}
          </Typography>
        ) : (
          <MuiAvatar sx={{ width: 24, height: 24, color: "#fff" }}>
            <Typography fontSize={18}>{getLetter(index)}</Typography>
          </MuiAvatar>
        )
      ) : (
        <Gavel />
      );
    case "vote/position":
      return <HowToReg />;
    case "vote/candidate":
      return <Face />;
    case "vote/question":
      return <QuestionMark />;
    case "vote/change":
      return index !== undefined && index !== -1 ? (
        avatar ? (
          <Typography fontSize={24} sx={{ color: "#fff" }}>
            {index + 1}
          </Typography>
        ) : (
          <MuiAvatar sx={{ width: 24, height: 24, color: "#fff", bgcolor: "inherit" }}>
            <Typography fontSize={18}>{index + 1}</Typography>
          </MuiAvatar>
        )
      ) : (
        <RateReview />
      );
    case "vote/poll":
      return <Poll />;
    case "speak/list":
      return <InterpreterMode />;
    case "application/pdf":
      return <FilePdfBoxIcon fill="currentColor" height="24" width="24" />;
    case undefined:
      return <Skeleton variant="circular" width={24} height={24} />;
    default:
  }

  if (mimeId?.includes("image/"))
    return <Image />;
  if (mimeId?.includes("audio/"))
    return <MusicNote />;
  if (mimeId?.includes("video/"))
    return <VideoBoxIcon fill="currentColor" height="24" width="24" />;
  if (mimeId?.includes("spreadsheet"))
    return <MicrosoftExcelIcon fill="currentColor" height="24" width="24" />;
  if (mimeId?.includes("document"))
    return <MicrosoftWordIcon fill="currentColor" height="24" width="24" />;

  return <QuestionMark />;
};

const getName = (mimeId?: string): string => {
  switch (mimeId) {
    case "wiki/group":
      return "Gruppe";
    case "wiki/event":
      return "Begivenhed";
    case "wiki/folder":
      return "Mappe";
    case "wiki/document":
      return "Dokument";
    case "wiki/file":
      return "Fil";
    case "wiki/user":
      return "Person";
    case "text/plain":
      return "Dokument";
    case "vote/policy":
      return "Politik";
    case "vote/position":
      return "Post";
    case "vote/change":
      return "Ændringsforslag";
    case "vote/candidate":
      return "Kandidatur";
    case "vote/question":
      return "Spørgsmål";
    case "speak/list":
      return "Talerliste";
    default:
      return "Ukendt";
  }
};

export {
  MimeIcon,
  MimeAvatar,
  getLetter,
  Icon as getIcon,
  getIconFromId,
  getName,
};
