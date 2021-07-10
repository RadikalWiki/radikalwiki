import { Input } from "@material-ui/core";
import { storage } from "utils/nhost";
import { join } from "path"
import { useMutation } from "@apollo/client";
import { FILES_ADD, CONTENT_UPDATE } from "gql";
import { useSession } from "hooks";
import { useState } from "react";
import Image from "material-ui-image";


const getFileUrl = (file: any) => file ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${file.path}?token=${file.token}` : null;

export default function FileUploader({ children, contentId, onNewFile }: { children: any, contentId: string, onNewFile: any }) {
  const [addFiles] = useMutation(FILES_ADD);
  const [updateContent] = useMutation(CONTENT_UPDATE);
  const [session] = useSession()

  const handleChangeFile = async (e: any) => {
    const files = e.target.files;
    const path = join(`/content/${session?.user.id}/`, files[0].name);
    const file = await storage.put(path, files[0]);
    const objects = [{ userId: session?.user.id, path, token: file.Metadata.token, }]
    const { data } = await addFiles({ variables: { objects } });
    onNewFile({ id: data.insert_files.returning[0].id,  path, token: file.Metadata.token })
  };

  return (
    <>
      <Input
        id="input-file"
        type="file"
        onChange={handleChangeFile}
        style={{ display: "none" }}
      />
      <label htmlFor="input-file">{
        children
      }</label>
    </>
  );
}
