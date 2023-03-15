import { Maybe, order_by } from 'gql';
import { withSuspense } from 'hoc';
import { Node, useNode } from 'hooks';
import { IconId } from 'mime';
import { MimeSkeleton } from 'comps';

const MimeIcon = ({
  mimeId,
  index,
  name,
}: {
  mimeId: Maybe<string | undefined>;
  index?: number;
  name?: string;
}) => <IconId mimeId={mimeId} index={index} name={name} />;

const Icon = ({ node }: { node: Node }) => {
  const query = node.useQuery();
  const type = query?.data?.({ path: 'type' });
  const mimeId = query?.mimeId;
  const id = type ?? mimeId;
  const name = query?.name;
  const index =
    query?.parent
      ?.children({
        where: {
          _and: [
            { mutable: { _eq: false } },
            { mime: { icon: { _in: ['number', 'letter'] } } },
          ],
        },
        order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      })
      .findIndex((child) => child.id === node.id) ?? 0;
  return <IconId name={name} mimeId={id} index={index} />;
};

const MimeIconNode = withSuspense(Icon, MimeSkeleton);
const MimeIconId = withSuspense(({ id }: { id: string }) => {
  const node = useNode({ id });
  return <Icon node={node} />;
}, MimeSkeleton);

export { MimeIcon, MimeIconNode, MimeIconId };
