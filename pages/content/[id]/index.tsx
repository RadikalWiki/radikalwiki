import React, { Suspense, useEffect } from "react";
import { ChildList, FolderBreadcrumbs, ContentCard, PollList } from "comps";
import { useRouter } from "next/router";

export default function Id() {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) return null;

  return (
    <>
      <FolderBreadcrumbs />
      <ContentCard id={id} />
      <ChildList id={id} />
      <PollList id={id} />
    </>
  );
}
