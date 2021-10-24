import { Input } from "@mui/material";
import { storage } from "utils/nhost";
import { join } from "path";
import { files_insert_input, useMutation } from "gql";
import { useSession } from "hooks";

export default function FileUploader({
  children,
  contentId,
  onNewFile,
}: {
  children: any;
  contentId: string;
  onNewFile: any;
}) {
  const [session] = useSession();
  const [addFiles] = useMutation((mutation, args: files_insert_input[]) => {
    return mutation.insert_files({ objects: args })?.returning;
  });

  const handleChangeFile = async (e: any) => {
    const files = e.target.files;
    const path = join(`/content/${session?.user?.id}/`, files[0].name);
    const file = await storage.put(path, files[0]);
    const objects = [
      { userId: session?.user?.id, path, token: file.Metadata.token },
    ];
    const newFiles = await addFiles({ args: objects });
    if (!newFiles) return;
    onNewFile({ id: newFiles[0].id, path, token: file.Metadata.token });
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
