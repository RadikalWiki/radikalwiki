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
  FileApp
} from "comps";
import { useRouter } from "next/router";

export default function MimeLoader(param?: { id?: string }) {
  const node = useNode({ id: param?.id });
  const router = useRouter();
  if (!node.query?.mimeId || !router.query.path) return null;

  switch (node.query.mimeId) {
    case "wiki/folder":
      return <FolderApp />;
    case "wiki/document":
      return <ContentApp />;
    case "wiki/file":
      return <FileApp />;
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
