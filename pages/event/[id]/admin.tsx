import React from "react";
import { Link as NextLink, AddAdmissionsFab, AdmissionsDataGrid } from "comps";
import { useStyles } from "hooks";
import { EVENT_GET } from "gql";
import { Breadcrumbs, Tooltip, Link, Typography } from "@material-ui/core";
import { Event, SupervisorAccount } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

export default function Index() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useQuery(EVENT_GET, { variables: { id } });

  return (
    <>
      <Breadcrumbs className={classes.bread}>
        <Link
          component={NextLink}
          className={classes.breadText}
          color="primary"
          href="/event"
        >
          <Tooltip title="Begivenheder">
            <Event />
          </Tooltip>
        </Link>
        <Link component={NextLink} color="primary" href={`/event/${id}`}>
          <Typography className={classes.breadText}>
            {data?.event.name}
          </Typography>
        </Link>
        <Link
          component={NextLink}
          className={classes.breadText}
          color="primary"
          href={`/event/${id}/admin`}
        >
          <Tooltip title="Admin">
            <SupervisorAccount />
          </Tooltip>
        </Link>
      </Breadcrumbs>
      <AdmissionsDataGrid eventId={id as string} />
      <AddAdmissionsFab eventId={id as string} />
    </>
  );
}
