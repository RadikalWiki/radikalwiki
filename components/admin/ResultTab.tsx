import { useSubscription } from "@apollo/client";
import { useStyles } from "hooks";
import { POLL_SUB_ALL_RESULT } from "gql";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

const numColWidth = 90;
const columns: any[] = [
  { field: "name", headerName: "Afstemning", width: 200 },
  { field: "for", headerName: "For", width: numColWidth },
  { field: "against", headerName: "Imod", width: numColWidth },
  { field: "blank", headerName: "Blank", width: numColWidth },
  { field: "total", headerName: "Total", width: numColWidth },
];

const countData = (poll: any) => {
  let res: any[] = [];
  for (const opt of poll.content.pollType.options) {
    res.push({ option: opt.name, count: 0 });
  }
  for (const vote of poll.votes) {
    for (const index of vote.value) {
      res[index].count += 1;
    }
  }

  return res;
};

const getRows = (data: any) => {
  let index = 0;
  if (!data) return [];
  return data.map((poll: any) => {
    const counts = countData(poll);
    let res = {
      id: index,
      name: poll.content.name,
      for: counts[0].count,
      against: counts[1].count,
      blank: counts[2].count,
      total: poll.total.aggregate.count,
    };
    index += 1;
    return res;
  });
};

export default function ResultsGrid() {
  const classes = useStyles();
  const { data } = useSubscription(POLL_SUB_ALL_RESULT);

  const rows = getRows(data?.poll);

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
