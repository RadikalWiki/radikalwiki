import React, { useEffect } from "react";
import { useQuery } from "gql";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Folder() {
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    if (session?.path)
      router.push(session.path);
    else if (session?.event?.folderId)
      router.push(`/folder/${session?.event?.folderId}`);
  });

  return null;
}
