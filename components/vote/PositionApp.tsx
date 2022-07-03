import React from "react";
import { FolderApp, ContentApp, PollList, CandidateList } from "comps";
import { useNode } from "hooks";

export default function PositionApp() {
  const { query } = useNode();
  return (
    <>
      <ContentApp />
      <CandidateList />
      <PollList id={query?.id} />
    </>
  );
}
