import { parse, ParseConfig } from "papaparse";
import { Input } from "@mui/material";
export default function CSVReader({
  children,
  parseOptions,
  onFileLoaded,
}: {
  children: any;
  parseOptions?: ParseConfig;
  onFileLoaded: any;
}) {
  const handleChangeFile = (e: any) => {
    const files = e.target.files;

    if (files.length > 0) {
      const reader = {
        ...new FileReader(),
        onload: (e: any) => {
          const data = parse(reader.result as string, parseOptions);
          onFileLoaded(data?.data ?? []);
        },
      };

      reader.readAsText(files[0]);
    }
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
