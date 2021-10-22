import React, { Suspense } from "react";
import { PollAdmin, PollChart, PollBreadcrumbs } from "components";
import { useRouter } from "next/router";

export default function Id() {
  const router = useRouter();
  const id = router.query.id as string;

  if(!id) return null

  return (
    <Suspense fallback={null}>
      <PollBreadcrumbs id={id} />
      <PollAdmin pollId={id} />
      <PollChart pollId={id} />
    </Suspense>
  );
}
