import { Input } from "@material-ui/core";
import { storage } from "utils/nhost";

export default function FileUploader({ children }: { children: any }) {
  const handleChangeFile = (e: any) => {
    const reader = new FileReader();
    const files = e.target.files;
    storage.getMetadata("/");
  };

  return (
    <>
      <Input
        id="input-file"
        type="file"
        onChange={handleChangeFile}
        style={{ display: "none" }}
      />
      <label htmlFor="input-file">{children}</label>
    </>
  );
}
