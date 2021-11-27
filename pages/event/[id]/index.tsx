import React, { Suspense } from "react";
import { Link as NextLink } from "comps";
import { Breadcrumbs, Link, Typography, Tooltip } from "@mui/material";
import { Event } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useQuery } from "gql";

function IndexRaw() {
  const router = useRouter();
  const { id } = router.query;
  const query = useQuery();
  const event = query.events_by_pk({ id })

  return (
    <Breadcrumbs sx={{ p: [2, 0, 2, 2]}}>
      <Link
        component={NextLink}
        sx={{ alignItems: "center", display: "flex" }}
        color="primary"
        href="/event"
      >
        <Tooltip title="Begivenheder">
          <Event />
        </Tooltip>
      </Link>
      <Link component={NextLink} color="primary" href={`/event/${id}`}>
        <Typography sx={{ alignItems: "center", display: "flex" }}>
          {event?.name}
        </Typography>
      </Link>
    </Breadcrumbs>
  );
}

export default function Index() {
	return <Suspense fallback={null}>
		<IndexRaw />
	</Suspense>
}