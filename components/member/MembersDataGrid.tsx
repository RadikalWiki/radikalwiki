import { useQuery, useMutation, order_by } from "gql";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Delete } from "@mui/icons-material";

export default function MembersDataGrid({ id }: { id: string }) {
  const query = useQuery();
  const node = query.node({ id });
  const [memberUpdate] = useMutation(
    (mutation, { id, set }: any) => {
      return mutation.updateMember({ pk_columns: { id }, _set: set })?.id;
    },
    {
      refetchQueries: [
        node?.members({ order_by: [{ user: { displayName: order_by.asc } }] }),
      ],
    }
  );

  const [memberDelete] = useMutation(
    (mutation, id: string) => {
      return mutation.deleteMember({ id })?.id;
    },
    {
      refetchQueries: [
        node?.members({ order_by: [{ user: { displayName: order_by.asc } }] }),
      ],
    }
  );

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Navn",

      editable: true,
      width: 200,
    },
    {
      field: "email",
      headerName: "E-Mail",

      editable: true,
      width: 200,
    },
    {
      field: "hidden",
      type: "boolean",
      headerName: "Skjul",
      editable: true,
      width: 150,
    },
    {
      field: "owner",
      type: "boolean",
      headerName: "Ejer",
      editable: true,
      width: 150,
    },
    {
      field: "active",
      type: "boolean",
      editable: true,
      headerName: "Aktiv",
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            key="delete"
            onClick={() => memberDelete({ args: id.toString() })}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleCellEditCommit = async ({
    id,
    field,
    value,
  }: {
    id: any;
    field: any;
    value: any;
  }) => {
    if (typeof value != "boolean" && !["name", "email"].includes(field)) return;
    const set = { [field]: value };
    await memberUpdate({ args: { id, set } });
  };

  const rows = node
    ?.members({ order_by: [{ user: { displayName: order_by.asc } }] })
    .map(({ id, name, email, user, owner, hidden, active, accepted }) => ({
      id,
      email: user?.email ?? email,
      name: user?.displayName ?? name,
      owner,
      hidden,
      accepted,
      active,
    }));

  if (rows == undefined || rows.length == 0 || !rows[0].id) return null;

  return (
    <Box sx={{ m: 1 }}>
      <DataGrid
        autoHeight
        columns={columns}
        rows={rows}
        onCellEditCommit={handleCellEditCommit}
      />
    </Box>
  );
}
