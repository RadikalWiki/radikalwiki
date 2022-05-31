import { Suspense } from "react";
import { Editor } from "comps";
import { useNode } from "hooks";

export default function EditorApp() {
  const { query } = useNode();
  return (
    <Suspense fallback={null}>
      <Editor id={query?.id} />
    </Suspense>
  );
}
