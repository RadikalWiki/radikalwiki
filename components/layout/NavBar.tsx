import React, { useState } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { HowToVote, RecordVoiceOver, Subject } from "@material-ui/icons";
import { Link } from "comps/common";
import { useStyles, useSession } from "hooks";
import { useRouter } from "next/router";

const getState = (path: string) =>
  path.includes("poll") || path.includes("vote")
    ? "vote"
    : path.includes("folder") || path.includes("content")
    ? "content"
    : path.includes("speak")
    ? "speak"
    : path.includes("admin")
    ? "admin"
    : "";

export default function NavBar() {
  const [session] = useSession();
  const { pathname } = useRouter();
  const [state, setState] = useState(getState(pathname));
  const classes = useStyles();

  if (!session?.event?.id) return null;

  return (
    <>
      <AppBar className={classes.appBar}>
        <BottomNavigation
          value={state}
          showLabels
          onChange={(_, value: string) => {
            setState(value);
          }}
        >
          <BottomNavigationAction
            component={Link}
            href="/vote"
            value="vote"
            label="Stem"
            icon={<HowToVote />}
          />
          <BottomNavigationAction
            component={Link}
            href="/folder"
            value="content"
            label="Indhold"
            icon={<Subject />}
          />
          <BottomNavigationAction
            component={Link}
            href="/speak"
            value="speak"
            label="Tal"
            icon={<RecordVoiceOver />}
          />
        </BottomNavigation>
      </AppBar>
    </>
  );
}
