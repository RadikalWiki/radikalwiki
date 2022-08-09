import { order_by } from "gql";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
} from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Delete } from "@mui/icons-material";
import { Node, useNode } from "hooks";

export default function MembersDataGrid({ node }: { node: Node }) {
  const query = node.useQuery()
  const member = node.useMember()

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
            onClick={() => member.delete(id.toString())}
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
    await member.update(id, set);
  };

  const rows = query
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
    <Box sx={{ m: 0 }}>
      <DataGrid
        autoHeight
        columns={columns}
        rows={rows}
        onCellEditCommit={handleCellEditCommit}
      />
    </Box>
  );
}
