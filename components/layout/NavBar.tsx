import React, { useEffect, useState } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { HowToVote, RecordVoiceOver, Subject } from "@mui/icons-material";
import { Link } from "comps";
import { useSession } from "hooks";
import { useRouter } from "next/router";

const getState = (path: string) =>
  path.includes("vote")
    ? "vote"
    : path.includes("folder") ||
      path.includes("content") ||
      path.includes("poll")
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

  useEffect(() => {
    setState(getState(pathname));
  }, [pathname]);

  if (!session?.event?.id) return null;

  return (
    <AppBar sx={{ position: "fixed", top: "auto", bottom: 0 }}>
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
  );
}
