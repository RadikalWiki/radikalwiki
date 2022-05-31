import { FolderApp, ContentApp } from "comps";

export default function EventApp() {
  return (
    <>
      <ContentApp hideMembers />
      <FolderApp />
    </>
  );
}
