import { Input } from "@mui/material";
import { storage } from "nhost";

export default function FileUploader({
  children,
  contentId,
  onNewFile,
}: {
  children: any;
  contentId: string;
  onNewFile: any;
}) {
  const handleChangeFile = async (e: any) => {
    const file = e.target.files[0];
    const res = await storage.upload({ file });
    onNewFile({ fileId: res.fileMetadata?.id })
  };

  return (
    <>
      <Input
        id="input-file"
        type="file"
        onChange={handleChangeFile}
        sx={{ display: "none" }}
      />
      <label htmlFor="input-file">{children}</label>
    </>
  );
}
