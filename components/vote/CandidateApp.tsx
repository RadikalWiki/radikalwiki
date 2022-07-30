import React from "react";
import { ContentApp } from "comps";
import { Node } from "hooks";

export default function CandidateApp({ node }: { node: Node }) {
  return <ContentApp node={node} hideMembers />;
}
