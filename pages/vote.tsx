import React, { Suspense, useEffect } from "react";
import { VoteForm } from "comps";
import { useQuery } from "gql";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Vote() {
  const router = useRouter();
  const [session] = useSession();
  const query = useQuery();
  useEffect(() => {
    const canVote = query.canVote({ eventId: session?.event?.id });
    if (!canVote) return;
    if (canVote.canVote === false && query.events_by_pk({ id: session?.event?.id })?.poll?.active) {
      router.push(`/poll/${canVote.pollId}`);
    }
  }, [query, router, session?.event?.id]);

  return (
    <Suspense fallback={null}>
      <VoteForm />
    </Suspense>
  );
}
