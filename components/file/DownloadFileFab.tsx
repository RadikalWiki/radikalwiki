import React from "react";
import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import { Download } from "@mui/icons-material";
import { Node } from "hooks";
import { nhost } from "nhost";

export default function AddContentFab({ node }: { node: Node }) {
  const trigger = useScrollTrigger({
    target:
      typeof document !== "undefined"
        ? document.querySelector("#scroll") || undefined
        : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const data = node.useQuery()?.data();
  const download = async () => {
    const { presignedUrl } = await nhost.storage.getPresignedUrl({
      fileId: data?.fileId,
    });
    window.open(presignedUrl?.url)
  };

  return (
    <>
      <Zoom in={true}>
        <Fab
          sx={{
            position: "fixed",
            bottom: (t) => t.spacing(9),
            right: (t) => t.spacing(3),
          }}
          variant={!trigger ? "extended" : "circular"}
          color="primary"
          aria-label="Download fil"
          onClick={download}
        >
          <Download sx={{ mr: !trigger ? 1 : 0 }} />
          {!trigger && "Download"}
        </Fab>
      </Zoom>
    </>
  );
}
