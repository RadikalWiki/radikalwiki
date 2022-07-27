import React from "react";
import { ContentApp, PollList, CandidateList, AddContentFab, FolderDial, QuestionList } from "comps";
import { useNode } from "hooks";

export default function PositionApp() {
  const node = useNode();
  return (
    <>
      <ContentApp />
      <CandidateList />
      <QuestionList node={node} />
      <PollList node={node} />
      <AddContentFab node={node} />
      <FolderDial node={node} />
    </>
  );
}
