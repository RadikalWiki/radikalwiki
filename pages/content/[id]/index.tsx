import React, { Suspense, useEffect } from "react";
import { ChildList, ContentBreadcrumps, ContentCard, PollList } from "comps";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Id() {
  const [_, setSession] = useSession();
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    if (id) setSession({ path: `/content/${id}` });
  }, [id]);

  if (!id) return null;

  return (
    <Suspense fallback={null}>
      <ContentBreadcrumps id={id} />
      <ContentCard id={id} />
      <ChildList id={id} />
      <PollList id={id} />
    </Suspense>
  );
}
