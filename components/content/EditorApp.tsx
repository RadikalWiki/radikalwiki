import { Suspense } from "react";
import { Editor } from "comps";
import { useNode } from "hooks";

export default function EditorApp() {
  const node = useNode();
  return (
    <Suspense fallback={null}>
      <Editor node={node} />
    </Suspense>
  );
}
