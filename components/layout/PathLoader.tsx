import { Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "gql";
import { useSession } from "hooks";
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
  const [session, setSession] = useSession()
  const where = {
    _and: [
      { namespace: { _eq: namespaces.at(-1) } },
      parentId
        ? { parentId: { _eq: parentId } }
        : { parentId: { _is_null: true } },
    ],
  };
  const node = query.nodes({ where }).at(0);
  const nodeId = node?.id;
  const name = node?.name;
  const selected =
    namespaces.length === fullpath.length &&
    namespaces.every((v, i) => v === fullpath[i]);
  useEffect(() => {
    if (selected) {
      // eslint-disable-next-line functional/immutable-data
      document.title = name ?? "RadikalWiki";
      setSession({ nodeId });
    }
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
