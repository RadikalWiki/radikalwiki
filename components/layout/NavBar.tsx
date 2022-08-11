import React, { useEffect, useState } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { HowToVote, RecordVoiceOver, Folder } from "@mui/icons-material";
import { useSession } from "hooks";
import { useRouter } from "next/router";

const getState = (path: string) =>
  path.includes("app=vote")
    ? "vote"
    : path.includes("group")
    ? "group"
    : path.includes("event")
    ? "event"
    : path.includes("folder") ||
      path.includes("content") ||
      path.includes("poll")
    ? "folder"
    : path.includes("app=speak")
    ? "speak"
    : path.includes("admin")
    ? "admin"
    : "folder";

export default function NavBar() {
  const [session] = useSession();
  const router = useRouter();
  const [state, setState] = useState(getState(router.pathname));

  useEffect(() => {
    const state = getState(router.asPath);
    setState(state);
  }, [router.asPath]);

  const handleFolder = async () => {
    await router.push(localStorage?.path ?? session?.prefix?.path.join("/"));
    const scroll = document.querySelector("#scroll");
    scroll?.scrollTo(0, JSON.parse(localStorage.scroll ?? 0));
  };

  const handleScroll = (path: string) => async () => {
    if (state == "folder") {
      const scroll = document.querySelector("#scroll");
      localStorage.setItem("scroll", scroll?.scrollTop?.toString() ?? "0");
      localStorage.setItem("path", router.asPath ?? "");
    }
    router.push(path);
  };

  if ((session?.prefix?.path.length ?? 0) == 0) return null;

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
          onClick={handleScroll(`${session?.prefix?.path.join("/")}?app=vote`)}
          value="vote"
          label="Stem"
          icon={<HowToVote />}
        />
        <BottomNavigationAction
          onClick={handleFolder}
          value="folder"
          label="Mappe"
          icon={<Folder />}
        />
        <BottomNavigationAction
          onClick={handleScroll(`${session?.prefix?.path.join("/")}?app=speak`)}
          value="speak"
          label="Tal"
          icon={<RecordVoiceOver />}
        />
      </BottomNavigation>
    </AppBar>
  );
}
