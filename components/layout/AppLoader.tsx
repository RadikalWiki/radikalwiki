import {
  EditorApp,
  SpeakApp,
  SortApp,
  VoteApp,
  ScreenApp,
  MemberApp,
  PermApp,
  HomeApp,
} from "comps";

export default function AppLoader({ app }: { app?: string }) {
  if (app) {
    switch (app) {
      case "member":
        return <MemberApp />;
      case "perm":
        return <PermApp />;
      case "editor":
        return <EditorApp />;
      case "speak":
        return <SpeakApp />;
      case "sort":
        return <SortApp />;
      case "vote":
        return <VoteApp />;
      case "screen":
        return <ScreenApp />;
      case "home":
        return <HomeApp />;
      default:
    }
  }

  return null;
}
