import React from "react";
import { Fab, useScrollTrigger, Zoom, Box } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Container } from "@mui/system";

export default function Scroll({ children }: any) {
  const trigger = useScrollTrigger({
    target:
      typeof document !== "undefined"
        ? document.querySelector("#scroll") || undefined
        : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (_: any) => {
    const scroll = document.querySelector("#scroll");
    if (scroll) {
      scroll.scrollTo({ behavior: "smooth", top: 0 });
    }

    const anchor = document.querySelector("#top-scroll");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box id="top-anchor" />
      <Box
        id="scroll"
        sx={{
          // Disable scroll (Firefox)
          scrollbarWidth: "none",
          // Disable scroll (Webkit)
          "::-webkit-scrollbar": {
            display: "none",
          },
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          height: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
      <Zoom in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{
            position: "fixed",
            bottom: (t) => t.spacing(9),
            left: (t) => t.spacing(3),
          }}
        >
          <Fab color="primary" size="small">
            <KeyboardArrowUp />
          </Fab>
        </Box>
      </Zoom>
    </Box>
  );
}
