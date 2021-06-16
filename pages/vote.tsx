import React, { useEffect } from "react";
import { PollAdmin, VoteForm } from "components";
import { useQuery } from "@apollo/client";
import { EVENT_CHECK_VOTE_ACTION } from "gql";
import { useRouter } from "next/router";

export default function Vote() {
  const router = useRouter();
  const { data, loading } = useQuery(EVENT_CHECK_VOTE_ACTION);

  useEffect(() => {
    if (data?.hasVoted) {
      const pollId = data.hasVoted.pollId;
      router.push(`/poll/${pollId}`);
    }
  }, [data, loading]);

  return (
    <>
      <VoteForm />
      <PollAdmin />
    </>
  );
}
