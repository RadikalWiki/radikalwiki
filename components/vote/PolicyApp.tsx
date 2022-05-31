import React from "react";
import { ChangeList, ContentApp, PollList, FolderDial } from "comps";
import { useNode } from "hooks";

export default function PolicyApp() {
  const { query } = useNode();
  return (
    <>
      <ContentApp />
      <ChangeList id={query?.id} />
      <PollList id={query?.id} />
      <FolderDial id={query?.id} />
    </>
  );
}
