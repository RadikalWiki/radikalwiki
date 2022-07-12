import React from "react";
import { ChangeList, ContentApp, PollList, FolderDial } from "comps";
import { useNode } from "hooks";

export default function PolicyApp() {
  const node = useNode();
  return (
    <>
      <ContentApp />
      <ChangeList node={node} />
      <PollList node={node} />
      <FolderDial node={node} />
    </>
  );
}
