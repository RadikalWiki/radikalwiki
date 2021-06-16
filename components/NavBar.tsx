import React, { useState } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";

import {
  Airplay,
  HowToVote,
  RecordVoiceOver,
  Subject,
  SupervisedUserCircle,
} from "@material-ui/icons";
import { Link } from "components";
import { useStyles, useSession } from "hooks";
import { useRouter } from "next/router";

const getState = (path: string) => {
  if (path.includes("poll") || path.includes("vote")) return "vote";
  if (path.includes("category") || path.includes("content")) return "content";
  if (path.includes("speak")) return "speak";
  if (path.includes("admin")) return "admin";
};

export default function NavBar() {
  const { session } = useSession();
  const { pathname } = useRouter();
  const [state, setState] = useState(getState(pathname));
  const classes = useStyles();

  if (pathname == "/screen") return null;

  return (
    <AppBar color="primary" className={classes.appBar}>
      <BottomNavigation
        value={state}
        showLabels
        onChange={(_, value: string) => {
          if (value != "screen") setState(value);
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
          href="/category"
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
        {session?.role == "admin" && (
          <BottomNavigationAction
            component={Link}
            href="/admin"
            value="admin"
            label="Admin"
            icon={<SupervisedUserCircle />}
          />
        )}
        <BottomNavigationAction
          component={Link}
          href="/screen"
          label="Skærm"
          value="screen"
          target="_blank"
          icon={<Airplay />}
        />
      </BottomNavigation>
    </AppBar>
  );
}
