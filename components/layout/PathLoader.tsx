import { Slide, Typography } from "@mui/material";
import { useQuery } from "gql";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function PathLoader({
  namespaces,
  id,
  fullpath,
}: {
  namespaces: string[];
  id?: string;
  fullpath: string[];
}) {
  const [namespace, setNamespace] = useState<string | undefined>();
  const query = useQuery();
  const where = {
    _and: [
      { namespace: { _eq: namespaces.at(-1) } },
      id ? { parentId: { _eq: id } } : { parentId: { _is_null: true } },
    ],
  };
  const node = query.nodes({ where }).at(0);

  const selected =
    namespaces.length === fullpath.length &&
    namespaces.every((v, i) => v === fullpath[i]);

  return selected ? (
    <Loader id={node?.id} />
  ) : (
    <PathLoader
      namespaces={[...namespaces, fullpath[namespaces.length]]}
      id={node?.id}
      fullpath={fullpath}
    />
  );
}
