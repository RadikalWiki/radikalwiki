import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Loader } from "comps";
import { fromId } from "core/path";
import { usePath } from "hooks";

export default function Path() {
  const router = useRouter();
  const path = usePath();

  // Redirect uuid v4 to full path
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      path.length == 1 &&
      path[0].match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    )
      fromId(path[0]).then((path) => {
        if (path.length == 0) return;
        router.push("/" + path.join("/"));
      });
  }, [path]);

  return <Loader />;
}
