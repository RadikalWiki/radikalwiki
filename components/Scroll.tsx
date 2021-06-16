import React from "react";
import { useStyles } from "hooks";
import { Fab, useScrollTrigger, Zoom } from "@material-ui/core";
import { KeyboardArrowUp } from "@material-ui/icons";

export default function Scroll({ children }: any) {
  const classes = useStyles();
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
    <>
      <div id="top-anchor" />
      <div className={classes.scroll} id="scroll">
        {children}
      </div>
      <Zoom in={trigger}>
        <div
          onClick={handleClick}
          role="presentation"
          className={classes.fabButton}
        >
          <Fab color="primary" size="small">
            <KeyboardArrowUp />
          </Fab>
        </div>
      </Zoom>
    </>
  );
}
