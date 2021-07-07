import React from "react";
import { Fragment, ReactNode, useState } from "react";
import { Link as NextLink } from "comps";
import { useStyles } from "hooks";
import { GROUP_GET_MEMBERS } from "gql";
import {
  Breadcrumbs,
  Card,
  Link,
  Typography,
  Box,
  CardContent,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AddMembershipsFab } from "comps";

export default function Id() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useQuery(GROUP_GET_MEMBERS, {
    variables: { id },
  });

  const group = data?.group;

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Breadcrumbs>
            <Link component={NextLink} color="primary" href="/group">
              <Typography>Grupper</Typography>
            </Link>
            <Link component={NextLink} color="primary" href={`/group/${id}`}>
              <Typography>{group?.name}</Typography>
            </Link>
          </Breadcrumbs>
        </CardContent>
      </Card>
      <AddMembershipsFab groupId={id as string} />
    </>
  );
}
