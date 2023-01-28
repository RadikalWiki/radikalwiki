import { Node } from "hooks";
import { nhost } from "nhost";
import { useEffect, useState } from "react";
import { VideoViewer, ImageViewer, MsOfficeViewer, AudioViewer, PdfViewer } from "comps";

export default function FileLoader({ node }: { node: Node }) {
  const [file, setFile] = useState<any>(null);
  const data = node.useQuery()?.data();

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
    case "image/bmp":
    case "image/jpg":
    case "image/jpeg":
    case "image/png":
    case "image/tif":
    case "image/tiff":
      return <ImageViewer file={file} />;
    case "audio/ogg":
      return <AudioViewer file={file} type={data?.type} />;
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
