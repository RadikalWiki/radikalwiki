import { order_by } from "gql";
import { MimeAvatar } from "mime";
import { Node } from "hooks";

export default function ContentAvatar({ node }: { node: Node }) {
  const index =
    node.query?.parent
      ?.children({
        where: {
          _and: [
            { mutable: { _eq: false } },
            { mime: { icon: { _in: ["number", "letter"] } } },
          ],
        },
        order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      })
      .findIndex((child) => child.id === node.query?.id) ?? 0;
  return <MimeAvatar node={node.query} index={index} />;
}
