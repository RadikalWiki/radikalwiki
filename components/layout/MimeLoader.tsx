import { Node, useNode, useScreen } from "hooks";
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
  FileApp,
  ContentHeader
} from "comps";
import { useRouter } from "next/router";

function SelectApp({ mimeId, node }: { mimeId: string, node: Node }) {
  switch (mimeId) {
    case "wiki/folder":
      return <FolderApp node={node} />;
    case "wiki/document":
      return <ContentApp node={node} />;
    case "wiki/file":
      return <FileApp node={node} />;
    case "wiki/group":
      return <GroupApp node={node} />;
    case "wiki/event":
      return <EventApp node={node} />;
    case "wiki/user":
      return <UserApp node={node} />;
    case "vote/policy":
    case "vote/change":
      return <PolicyApp node={node} />;
    case "vote/position":
      return <PositionApp node={node} />;
    case "vote/candidate":
      return <CandidateApp node={node} />;
    case "vote/poll":
      return <PollApp node={node} />;
    case "wiki/home":
      return <HomeApp />;
    default:
      return null
  }
}

export default function MimeLoader(param?: { id?: string, mimeId?: string }) {
  const screen = useScreen();
  const node = useNode({ id: param?.id });
  const router = useRouter();
  if ((!node?.mimeId && !param?.mimeId) || !router.query.path) return null;

  return <>
    {screen && <ContentHeader node={node} />}
    <SelectApp mimeId={param?.mimeId ?? node.mimeId ?? ""} node={node} />
  </>
}
