import React, { useState } from "react";
import {
  Link as NextLink,
  AddAdmissionsFab,
  AdmissionsDataGrid,
  AdmissionsTextField,
} from "comps";
import { useStyles } from "hooks";
import { EVENT_GET, EVENT_ADMISSIONS_GET, ADMISSIONS_ADD } from "gql";
import {
  Breadcrumbs,
  Tooltip,
  Link,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { Event, SupervisorAccount } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";

export default function Index() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useQuery(EVENT_GET, { variables: { id } });
  const [users, setUsers] = useState<any[]>([]);
  const [addAdmissions] = useMutation(ADMISSIONS_ADD);

  const handleAddAdmissions = async () => {
    console.log(users);
    const admissions = users.map((user) => ({
      eventId: id,
      email: user.identity.email,
    }));
    await addAdmissions({
      variables: {
        objects: admissions,
      },
      refetchQueries: [{ query: EVENT_ADMISSIONS_GET, variables: { id } }],
    });
    setUsers([]);
  };

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
      <Grid style={{ margin: 2 }} container spacing={2}>
        <Grid item xs={6}>
          <AdmissionsTextField value={users} onChange={setUsers} />
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleAddAdmissions}
            color="primary"
            variant="contained"
          >
            Tilføj
          </Button>
        </Grid>
      </Grid>
      <AdmissionsDataGrid eventId={id as string} />
      <AddAdmissionsFab eventId={id as string} />
    </>
  );
}
