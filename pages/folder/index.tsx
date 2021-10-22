import React, { useEffect } from "react";
import { useQuery } from "gql";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Folder() {
  const router = useRouter();
  const [session] = useSession();
  const query = useQuery();
  const event = query.events_by_pk({ id: session?.event?.id })

  useEffect(() => {
    if (event?.folderId)
      router.push(`/folder/${event?.folderId}`);
  });

  return null;
}
