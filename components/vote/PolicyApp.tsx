import React from "react";
import { ChangeList, ContentApp, PollList, FolderDial } from "comps";
import { Node } from "hooks";

export default function PolicyApp({ node }: { node: Node }) {
  return (
    <>
      <ContentApp node={node} />
      <ChangeList node={node} />
      <PollList node={node} />
      <FolderDial node={node} />
    </>
  );
}
