import { Input } from "@mui/material";
import { storage } from "nhost";
import { join } from "path";
import { files_insert_input, useMutation } from "gql";

export default function FileUploader({
  children,
  contentId,
  onNewFile,
}: {
  children: any;
  contentId: string;
  onNewFile: any;
}) {
  //const [addFiles] = useMutation((mutation, args: files_insert_input[]) => {
  //  return mutation.insert_files({ objects: args })?.returning;
  //});

  const handleChangeFile = async (e: any) => {
    const file = e.target.files[0];
    //const path = join(`/content/${session?.user?.id}/`, files[0].name);
    //const file = await storage.put(path, files[0]);
    const res = await storage.upload({ file });
    //const objects = [
    //  { userId, path, token: file.Metadata.token },
    //];
    //const newFiles = await addFiles({ args: objects });
    //if (!newFiles) return;
    //onNewFile({ id: newFiles[0].id, path, token: file.Metadata.token });
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
