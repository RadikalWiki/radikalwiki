import React, { Suspense, useEffect } from "react";
import { VoteForm } from "comps";
import { useQuery } from "gql";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Vote() {
  const router = useRouter();
  const [session] = useSession();
  const query = useQuery();
  const poll = query.events_by_pk({ id: session?.event?.id })?.poll;
  useEffect(() => {
    const res = query.canVote({ eventId: session?.event?.id });
    if (!res) return;
    if (res.canVote === false && poll?.active) {
      router.push(`/poll/${res.pollId}`);
    }
  }, [query, router, session?.event?.id]);

  return (
    <Suspense fallback={null}>
      <VoteForm />
    </Suspense>
  );
}
