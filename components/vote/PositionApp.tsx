import React from "react";
import { ContentApp, PollList, CandidateList, AddContentFab, FolderDial, QuestionList } from "comps";
import { Node } from "hooks";

export default function PositionApp({ node }: { node: Node }) {
  return (
    <>
      <ContentApp node={node} />
      <CandidateList node={node} />
      <QuestionList node={node} />
      <PollList node={node} />
      <AddContentFab node={node} />
      <FolderDial node={node} />
    </>
  );
}
