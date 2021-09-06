import { useQuery, useApolloClient } from "@apollo/client";
import { useStyles } from "hooks";
import { EVENT_ADMISSIONS_GET, ADMISSION_UPDATE } from "gql";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

const columns: any[] = [
  { field: "displayName", headerName: "Navn", width: 200 },
  { field: "email", headerName: "E-Mail", width: 200 },
  {
    field: "voting",
    type: "boolean",
    editable: true,
    headerName: "Stemmeret",
    width: 150,
  },
  {
    field: "checkedIn",
    type: "boolean",
    editable: true,
    headerName: "Tjekket ind",
    width: 150,
  },
];

const getUsers = (admissions: any) => {
  return admissions?.map((admission: any) => ({
    id: admission.id,
    email: admission.identity.email,
    displayName: admission.identity.displayName,
    voting: admission.voting,
    checkedIn: admission.checkedIn,
  }));
};

export default function AdmissionsDataGrid({ eventId }: { eventId: string }) {
  const classes = useStyles();
  const { data, error } = useQuery(EVENT_ADMISSIONS_GET, {
    variables: { id: eventId },
  });
  const client = useApolloClient();

  const handleCellEditCommit = async ({
    id,
    field,
    props,
  }: {
    id: any;
    field: any;
    props: any;
  }) => {
    console.log({ id, field, props });
    if (!props.value) return;
    const set: Record<string, any> = {};
    set[field] = props.value;
    await client.mutate({
      mutation: ADMISSION_UPDATE,
      variables: { id, set },
    });
  };

  const rows = getUsers(data?.event.admissions);

  if (!rows) return null;

  return (
    <DataGrid
      className={classes.dataGrid}
      autoHeight
      columns={columns}
      rows={rows}
      components={{
        Toolbar: GridToolbar,
      }}
      onEditCellChangeCommitted={handleCellEditCommit}
    />
  );
}
