import React, { Suspense, useEffect, useState } from "react";
import {
  AddContentFab,
  FolderDial,
  FolderBreadcrumbs,
  FolderCard,
} from "comps";
import { useRouter } from "next/router";
import { useSession } from "hooks";

export default function Id() {
  const [_, setSession] = useSession();
  const router = useRouter();
  const id = router.query.id as string;
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (id) setSession({ path: `/folder/${id}` });
  }, [id]);

  if (!id) return null;

  return (
    <Suspense fallback={null}>
      <FolderBreadcrumbs id={id} filter={filter} setFilter={setFilter} />
      <FolderCard id={id} filter={filter} />
      <AddContentFab id={id} />
      <FolderDial id={id} />
    </Suspense>
  );
}
