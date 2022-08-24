import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader, PathLoader } from "comps";
import { fromId } from "core/path";
import { usePath, useSession } from "hooks";

export default function Path() {
  const router = useRouter();
  const fullpath = usePath();

  // Redirect uuid v4 to full path
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      fullpath.length == 1 &&
      fullpath[0].match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    )
      fromId(fullpath[0]).then((path) => {
        if (path.length == 0) return;
        router.push(`${path.join("/")}`);
      });
  }, [fullpath]);
 
  if (fullpath.length === 0) return null
  return <PathLoader namespaces={[]} fullpath={fullpath} />;
}
