import React, { useEffect } from "react";
import { VoteForm } from "comps/vote";
import { useQuery } from "@apollo/client";
import { EVENT_CHECK_VOTE_ACTION } from "gql";
import { useRouter } from "next/router";
import { useSession, query } from "hooks";


export default function Vote() {
  const router = useRouter();
  const [session] = useSession();
  const { data, loading, error } = useQuery(EVENT_CHECK_VOTE_ACTION, {
    variables: { id: session?.event.id },
  });

  useEffect(() => {
    console.log(data)
    if (data?.canVote.canVote === false && data?.event.poll.active) {
      const pollId = data.canVote.pollId;
      router.push(`/poll/${pollId}`);
    }
  }, [data]);

  if (loading) return null;

  return <VoteForm />;
}
