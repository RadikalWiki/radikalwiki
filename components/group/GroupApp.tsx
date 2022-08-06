import { FolderApp, ContentApp } from "comps";
import { Node } from "hooks";

export default function GroupApp({ node }: { node: Node }) {
  return (
    <>
      <ContentApp node={node} hideMembers />
      <FolderApp node={node} child />
    </>
  );
}
