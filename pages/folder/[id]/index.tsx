import React, { Suspense, useEffect, useState } from "react";
import {
  AddContentFab,
  FolderDial,
  FolderBreadcrumbs,
  FolderCard,
} from "comps";
import { useRouter } from "next/router";

export default function Id() {
  const router = useRouter();
  const id = router.query.id as string;
  const [filter, setFilter] = useState("");

  if (!id) return null;

  return (
    <>
      <FolderBreadcrumbs filter={filter} setFilter={setFilter} />
      <FolderCard id={id} filter={filter} />
      <Suspense fallback={null}>
        <AddContentFab id={id} />
        <FolderDial id={id} />
      </Suspense>
    </>
  );
}
