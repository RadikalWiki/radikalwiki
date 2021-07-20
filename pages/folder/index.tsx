import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { EVENT_GET_FOLDER } from "gql";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Vote() {
  const router = useRouter();
  const [session] = useSession();
  const { data } = useQuery(EVENT_GET_FOLDER, {
    variables: { id: session?.event.id },
  });

  useEffect(() => {
    if (data) {
      router.push(`/folder/${data.event.folderId}`);
    }
  }, [data]);

  return null;
}
