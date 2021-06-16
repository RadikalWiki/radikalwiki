import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useSession({ redirectTo = "" } = {}) {
  const { data: session, mutate: mutateSession } = useSWR("/api/session");

  useEffect(() => {
    if (!redirectTo || !session) return;

    if (redirectTo && !session?.isLoggedIn) {
      Router.push(redirectTo);
    }
  }, [session, redirectTo]);

  return { session, mutateSession };
}
