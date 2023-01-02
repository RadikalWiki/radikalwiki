import { Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "gql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function PathLoader({
  namespaces,
  parentId,
  fullpath,
}: {
  namespaces: string[];
  parentId?: string;
  fullpath: string[];
}) {
  const query = useQuery();
  const where = {
    _and: [
      { namespace: { _eq: namespaces.at(-1) } },
      parentId
        ? { parentId: { _eq: parentId } }
        : { parentId: { _is_null: true } },
    ],
  };
  const node = query.nodes({ where }).at(0);
  const name = node?.name;
  const selected =
    namespaces.length === fullpath.length &&
    namespaces.every((v, i) => v === fullpath[i]);
  useEffect(() => {
    // eslint-disable-next-line functional/immutable-data
    if (selected) document.title = name ?? "RadikalWiki";
  }, [name, selected]);

  return selected ? (
    <Loader id={node?.id} />
  ) : (
    <PathLoader
      namespaces={[...namespaces, fullpath[namespaces.length]]}
      parentId={node?.id}
      fullpath={fullpath}
    />
  );
}
