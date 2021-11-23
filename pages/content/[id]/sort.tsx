import React, { Suspense, useEffect } from "react";
import { ChildListSort, FolderBreadcrumbs, ContentCard, PollList } from "comps";
import { useRouter } from "next/router";

export default function Id() {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) return null;

  return (
    <>
      <FolderBreadcrumbs />
      <ChildListSort id={id} />
    </>
  );
}
