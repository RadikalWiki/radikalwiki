import {
  EditorApp,
  SpeakApp,
  SortApp,
  VoteApp,
  ScreenApp,
  MemberApp,
  PermApp,
  HomeApp,
} from 'comps';
import { useNode } from 'hooks';

export default function AppLoader({ app, id }: { app?: string; id?: string }) {
  const node = useNode({ id });

  if (app) {
    switch (app) {
      case 'member':
        return <MemberApp node={node} />;
      //case "perm":
      //  return <PermApp node={node} />;
      case 'editor':
        return <EditorApp node={node} />;
      case 'speak':
        return <SpeakApp node={node} />;
      case 'sort':
        return <SortApp node={node} />;
      case 'vote':
        return <VoteApp node={node} />;
      case 'screen':
        return <ScreenApp node={node} />;
      default:
    }
  }

  return null;
}
