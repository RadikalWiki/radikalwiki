import { Node } from "hooks";
import dynamic from "next/dynamic";
import nhost from "nhost";
import { useEffect, useState } from "react";
import { SpreadSheetViewer, VideoViewer } from "comps";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
});

export default function FileLoader({ node }: { node: Node }) {
  const [file, setFile] = useState<any>(null);
  const data = node.query?.data();

  useEffect(() => {
    const fetch = async () => {
      if (data?.fileId) {
        const { presignedUrl } = await nhost.storage.getPresignedUrl({
          fileId: data?.fileId,
        });
        setFile(presignedUrl?.url);
      }
    };
    fetch();
  }, [data]);

  switch (data?.type) {
    case "application/pdf":
      return <PdfViewer file={file} />;
    case "video/mp4":
      return <VideoViewer file={file} />;
    default:
  }

  if (data?.type?.includes("spreadsheet"))
    return <SpreadSheetViewer file={file} />

  return null;
}
