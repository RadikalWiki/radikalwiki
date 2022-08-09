import { order_by } from "gql";
import { withSuspense } from "hoc";
import { Node, useNode } from "hooks";
import { getIconFromId } from "mime";
import { MimeSkeleton } from "comps";

const Icon = ({ node }: { node: Node }) => {
  const query = node.useQuery();
  const type = query?.data?.({ path: "type" });
  const mimeId = query?.mimeId;
  const id = type ?? mimeId;
  const index =
    query?.parent
      ?.children({
        where: {
          _and: [
            { mutable: { _eq: false } },
            { mime: { icon: { _in: ["number", "letter"] } } },
          ],
        },
        order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      })
      .findIndex((child) => child.id === node.id) ?? 0;
  return getIconFromId(id, index);
};

const MimeIcon = withSuspense(Icon, MimeSkeleton);
const MimeIconId = withSuspense(({ id }: { id: string }) => {
  const node = useNode({ id });
  return <Icon node={node} />;
}, MimeSkeleton);

export { MimeIcon, MimeIconId };
