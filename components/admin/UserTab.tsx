import { useQuery } from "gql";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const numColWidth = 200;
const columns: any[] = [
  { field: "id", headerName: "Id", width: numColWidth },
  { field: "email", headerName: "E-Mail", width: 200 },
];

export default function UserTab() {
  const query = useQuery();
  const rows = query.users().map(({ id, display_name}) => ({ id, email: display_name }));
  if (!rows) return null;

  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={rows}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
}
