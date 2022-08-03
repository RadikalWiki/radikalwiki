import { useEffect, useRef, useState } from "react";

export default function MsOfficeViewer({ file }: { file: any }) {
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const scroll = document.querySelector("#scroll");
    setHeight(`${(scroll?.scrollHeight ?? 0) - 310}px`);
  }, []);

  return (
    file && (
      <iframe
        width="100%"
        height={height}
        frameBorder="0"
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
          file
        )}`}
      />
    )
  );
}
