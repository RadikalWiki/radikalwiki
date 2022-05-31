import React from "react";
import { FolderApp, ContentApp, PollList } from "comps";
import { useNode } from "hooks";

export default function PositionApp() {
  const { query } = useNode();
  return (
    <>
      <ContentApp />
      <FolderApp />
      <PollList id={query?.id} />
    </>
  );
}
