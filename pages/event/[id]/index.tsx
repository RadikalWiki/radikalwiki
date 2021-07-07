import React from "react";
import { Fragment, ReactNode, useState } from "react";
import { Link as NextLink } from "comps/common";
import { useStyles } from "hooks";
import { EVENT_GET } from "gql";
import { Breadcrumbs, Card, Link, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

export default function Index() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useQuery(EVENT_GET, { variables: { id } });

  return (
    <>
      <Card className={classes.card}>
        <Breadcrumbs>
          <Link component={NextLink} color="primary" href="/event">
            <Typography>Begivenheder</Typography>
          </Link>
          <Link component={NextLink} color="primary" href={`/event/${id}`}>
            <Typography>{data?.event.name}</Typography>
          </Link>
        </Breadcrumbs>
      </Card>
    </>
  );
}
