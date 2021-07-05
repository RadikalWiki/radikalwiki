import { useStyles } from "hooks";
import React, { useState } from "react";
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
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
}
