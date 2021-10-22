import React, { Suspense } from "react";
import {
  ChildList,
  ContentBreadcrumps,
  ContentCard,
} from "comps";
import { useRouter } from "next/router";

export default function Id() {
  const router = useRouter();
  const id = router.query.id as string;

  if(!id) return null

  return (
    <Suspense fallback={null}>
      <ContentBreadcrumps id={id} />
      <ContentCard id={id} />
      <ChildList id={id} />
    </Suspense>
  );
}
