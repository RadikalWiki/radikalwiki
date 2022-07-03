import {
  Event,
  Folder,
  Gavel,
  Group,
  HowToReg,
  Person,
  Subject,
  RateReview,
  HelpOutline,
  Home,
  Poll,
  Face,
  Article,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

const getLetter = (index: number) => {
  const f = String.fromCharCode(65 + (index % 26));
  return index >= 26 ? String.fromCharCode(64 + Math.floor(index / 26)) + f : f;
};

const getIcon = (mimeId?: string, index?: number): any => {
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
    case "wiki/user":
      return <Person />;
    case "text/plain":
      return <Subject />;
    case "vote/policy":
      return index !== undefined ? getLetter(index) : <Gavel />;
    case "vote/position":
      return <HowToReg />;
    case "vote/candidate":
      return <Face />;
    case "vote/change":
      return index !== undefined ? index + 1 : <RateReview />;
    case "vote/poll":
      return <Poll />;
    default:
      return <Skeleton variant="circular" width={24} height={24} />
  }
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
    default:
      return "Ukendt";
  }
};

export { getIcon, getName };
