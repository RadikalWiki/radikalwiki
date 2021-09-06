import { useQuery, useSubscription } from "@apollo/client";
import { useStyles } from "hooks";
import { IDENTITIES_GET } from "gql";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns: any[] = [
  { field: "displayName", headerName: "Navn", width: 200 },
  { field: "id", headerName: "E-Mail", width: 200 },
];

const getUsers = (identities: any) => {
  return identities?.map((identity: any) => ({
    id: identity.email,
    displayName: identity.displayName,
  }));
};

export default function IdentityTab() {
  const classes = useStyles();
  const { data } = useQuery(IDENTITIES_GET);

  const rows = getUsers(data?.identities);

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
    />
  );
}
