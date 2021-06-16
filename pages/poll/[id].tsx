import React from "react";
import { PollAdmin, PollChart } from "components";
import { useRouter } from "next/router";

export default function Id() {
  const { query } = useRouter();
  return (
    <>
      <PollChart interactive id={query?.id as string} />
      <PollAdmin />
    </>
  );
}
