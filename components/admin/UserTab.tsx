import { useQuery } from "@apollo/client";
import { useStyles } from "hooks";
import { USERS_GET } from "gql";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const numColWidth = 200;
const columns: any[] = [
  { field: "id", headerName: "Id", width: numColWidth },
  { field: "email", headerName: "E-Mail", width: 200 },
];

const getUsers = (users: any) => {
  return users?.map((user: any) => ({ id: user.id, email: user.display_name }));
};

export default function UserTab() {
  const classes = useStyles();
  const { data } = useQuery(USERS_GET);

  const rows = getUsers(data?.users);

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
