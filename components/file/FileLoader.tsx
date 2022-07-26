import { Node } from "hooks";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false
});


export default function FileLoader({ node }: { node: Node }) {
	const data = node.query?.data()
  switch (data?.type) {
    case "application/pdf":
      return <PdfViewer node={node} fontSize="100%" />
    default:
  }

  return null;
}
