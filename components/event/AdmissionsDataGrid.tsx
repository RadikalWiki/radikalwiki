import { useQuery, useMutation, mutation, admissions_update_column, admissions_set_input } from "gql";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

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

export default function AdmissionsDataGrid({ eventId }: { eventId: string }) {
  const query = useQuery();
  const event = query.events_by_pk({ id: eventId });
  const [admissionUpdate] = useMutation((mutation, { id, set }: any) => {
    mutation.update_admissions_by_pk({ pk_columns: id, _set: set } )
  })

  const handleCellEditCommit = async ({
    id,
    field,
    value,
  }: {
    id: any;
    field: any;
    value: any;
  }) => {
    if (typeof value != "boolean") return;
    const set: Record<string, any> = {};
    set[field] = value;
    await admissionUpdate({ args: { id, set } });
  };

  const rows = event
    ?.admissions()
    .map(({ id, identity, voting, checkedIn }) => ({
      id,
      email: identity?.email,
      displayName: identity?.displayName,
      voting,
      checkedIn,
    }));

  if (!rows) return null;

  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={rows}
      components={{
        Toolbar: GridToolbar,
      }}
      onCellEditCommit={handleCellEditCommit}
    />
  );
}
