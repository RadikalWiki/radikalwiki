import { useNode } from "hooks";
import {
  FolderApp,
  ContentApp,
  GroupApp,
  PolicyApp,
  UserApp,
  PollApp,
  EventApp,
  PositionApp,
  HomeApp,
  CandidateApp,
} from "comps";

export default function MimeLoader() {
  const node = useNode();
  if (!node.query?.mime?.name) return null;

  switch (node.query.mime.name) {
    case "wiki/folder":
      return <FolderApp />;
    case "wiki/document":
      return <ContentApp />;
    case "wiki/group":
      return <GroupApp />;
    case "wiki/event":
      return <EventApp />;
    case "wiki/user":
      return <UserApp />;
    case "vote/policy":
    case "vote/change":
      return <PolicyApp />;
    case "vote/position":
      return <PositionApp />;
    case "vote/candidate":
      return <CandidateApp />;
    case "vote/poll":
      return <PollApp />;
    case "wiki/home":
      return <HomeApp />;
    default:
  }
  return null;
}
