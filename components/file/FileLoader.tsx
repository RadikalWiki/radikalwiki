import { Node } from "hooks";
import dynamic from "next/dynamic";
import nhost from "nhost";
import { useEffect, useState } from "react";
import { VideoViewer, MsOfficeViewer } from "comps";

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
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return <MsOfficeViewer file={file} />
    default:
  }

  return null;
}
