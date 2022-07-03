import React from "react";
import { FolderApp, ContentApp, PollList, CandidateList, AddContentFab, FolderDial } from "comps";
import { useNode } from "hooks";

export default function PositionApp() {
  const { query } = useNode();
  return (
    <>
      <ContentApp />
      <CandidateList />
      <PollList id={query?.id} />
      <AddContentFab id={query?.id} />
      <FolderDial id={query?.id} />
    </>
  );
}
