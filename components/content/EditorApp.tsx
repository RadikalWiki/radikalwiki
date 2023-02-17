import { Suspense } from 'react';
import { Editor } from 'comps';
import { Node } from 'hooks';

export default function EditorApp({ node }: { node: Node }) {
  return (
    <Suspense fallback={null}>
      <Editor node={node} />
    </Suspense>
  );
}
