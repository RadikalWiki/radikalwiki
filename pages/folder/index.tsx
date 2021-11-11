import React, { useEffect } from "react";
import { useQuery } from "gql";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Folder() {
  const router = useRouter();
  const [session] = useSession();
  useEffect(() => {
    let path = session?.path
    if (path && (typeof path != "string") && path.length > 0) {
      router.push(path[path.length - 1].url);
    } else if (session?.event?.folderId)
      router.push(`/folder/${session?.event?.folderId}`);
  });

  return null;
}
