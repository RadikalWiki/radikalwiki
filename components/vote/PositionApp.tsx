import React from "react";
import { FolderApp, ContentApp, PollList, CandidateList, AddContentFab, FolderDial } from "comps";
import { useNode } from "hooks";

export default function PositionApp() {
  const node = useNode();
  return (
    <>
      <ContentApp />
      <CandidateList />
      <PollList node={node} />
      <AddContentFab node={node} />
      <FolderDial node={node} />
    </>
  );
}
