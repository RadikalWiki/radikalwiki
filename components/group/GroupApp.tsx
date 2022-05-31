import { FolderApp, ContentApp } from "comps";

export default function GroupApp() {
  return (
    <>
      <ContentApp hideMembers />
      <FolderApp />
    </>
  );
}
