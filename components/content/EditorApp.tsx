import { Suspense } from "react";
import { Editor } from "comps";

export default function EditorApp() {
  return (
    <Suspense fallback={null}>
      <Editor />
    </Suspense>
  );
}
