import React, { Suspense, useEffect } from "react";
import {
  ChildList,
  ContentBreadcrumps,
  ContentCard,
} from "comps";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Id() {
  const [_, setSession] = useSession() 
  const router = useRouter();
  const id = router.query.id as string;

  if(!id) return null
  useEffect(() => {
    setSession({ path: `/content/${id}` })
  }, [id]);

  return (
    <Suspense fallback={null}>
      <ContentBreadcrumps id={id} />
      <ContentCard id={id} />
      <ChildList id={id} />
    </Suspense>
  );
}
