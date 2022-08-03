import React from "react";
import { Fab, Zoom } from "@mui/material";
import { Download } from "@mui/icons-material";
import { Node } from "hooks";
import { nhost } from "nhost";

export default function AddContentFab({ node }: { node: Node }) {
  const data = node.query?.data();
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
          variant="extended"
          color="primary"
          aria-label="Download fil"
          onClick={download}
        >
          <Download sx={{ mr: 1 }} />
          Download
        </Fab>
      </Zoom>
    </>
  );
}
