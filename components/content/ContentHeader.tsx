import { CardHeader } from "@mui/material";
import { ContentAvatar, ExpandButton } from "comps";
import { useSession } from "hooks"
import { useQuery } from "gql";
import { useEffect, useState } from "react";

export default function ContentHeader({ id, expand, setExpand }: { id: string, expand: boolean, setExpand: Function }) {
	const [_, setSession] = useSession();
  const query = useQuery();
  const content = query.contents_by_pk({ id });

  useEffect(() => {
    if (content?.id && content?.folder?.id && content?.parent?.id) setSession({ path: [{ name: content.folder?.name ?? "", url: `/folder/${content.folder?.id}` }, { name: content.parent?.name ?? "", url: `/content/${content.parentId}` }, { name: content.name ?? "", url: `/content/${content.id}` }] });
    else if (content?.id && content?.folder?.id) setSession({ path: [{ name: content.folder?.name ?? "", url: `/folder/${content.folder?.id}` }, { name: content.name ?? "", url: `/content/${content.id}` }] });
  }, [id, content]);

  return (
    <CardHeader
      title={content?.name}
      avatar={<ContentAvatar id={id} />}
      subheader={
        !(content?.parent && content?.folder?.mode == "candidates")
          ? content
              ?.authors()
              .map((a) => a.identity?.displayName ?? a.name)
              .join(", ")
          : ""
      }
      action={
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)} />
      }
    />
  );
}
