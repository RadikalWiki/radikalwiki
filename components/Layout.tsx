import React from "react";
import { NavBar, Scroll } from "components";
import { useStyles } from "hooks";

export default function Layout({ children }: { children?: any }) {
  const classes = useStyles();

  return (
    <>
      <Scroll>{children}</Scroll>
      <div className={classes.pad} />
      <NavBar />
    </>
  );
}
