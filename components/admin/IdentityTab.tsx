import { useQuery } from "gql";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns: any[] = [
  { field: "displayName", headerName: "Navn", width: 200 },
  { field: "id", headerName: "E-Mail", width: 200 },
];


export default function IdentityTab() {
  const query = useQuery();

  const rows = query.identities().map(({email , displayName }) => ({ id: email, displayName }) );

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
