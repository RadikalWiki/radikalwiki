import React, { Suspense, useState } from "react";
import {
  Link as NextLink,
  AddAdmissionsFab,
  AdmissionsDataGrid,
  AdmissionsTextField,
} from "comps";
import {
  Breadcrumbs,
  Tooltip,
  Link,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Event, SupervisorAccount } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useQuery, useMutation, admissions_insert_input, resolved } from "gql";

function IndexRaw() {
  const router = useRouter();
  const { id } = router.query;
  const query = useQuery();
  const event = query.events_by_pk({ id });
  const [users, setUsers] = useState<any[]>([]);
  const [addAdmissions] = useMutation(
    (mutation, args: admissions_insert_input[]) => {
      return mutation.insert_admissions({ objects: args })?.affected_rows;
    },
    {
      refetchQueries: [event],
    }
  );

  const handleAddAdmissions = async () => {
    const admissions = await resolved(() => users.map((user) => ({
      eventId: id,
      email: user.email,
    })));
    await addAdmissions({
      args: admissions,
    });
    setUsers([]);
  };


  if (!id) return null;

  return (
    <>
      <Breadcrumbs sx={{ p: [2, 0, 2, 2] }}>
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
        <Link
          component={NextLink}
          sx={{ alignItems: "center", display: "flex" }}
          color="primary"
          href={`/event/${id}/admin`}
        >
          <Tooltip title="Admin">
            <SupervisorAccount />
          </Tooltip>
        </Link>
      </Breadcrumbs>
      <Grid style={{ margin: 1 }} container spacing={2}>
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

export default function Index() {
	return <Suspense fallback={null}>
		<IndexRaw />
	</Suspense>
}