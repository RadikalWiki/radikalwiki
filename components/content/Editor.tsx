import React from "react";
import { Box } from "@mui/material";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";

export default function Editor({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) {

  return (
    <Box sx={{ m: 1}}>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </Box>
  );
}
