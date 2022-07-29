import {
  Box,
  MobileStepper,
  Button,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import * as XLSX from "xlsx";
import DataGrid from "react-data-grid";

type DataSet = {
  [index: string]: XLSX.WorkSheet;
};

function getRowsCols(
  data: DataSet,
  sheetName: string
): {
  rows: Row[];
  columns: Column[];
} {
  const rows: Row[] = XLSX.utils.sheet_to_json(data[sheetName], {
    header: 1,
    raw: false,
  });
  const columns = rows.reduce((columns, row) => {
    const keys = Object.keys(row);
    return keys.length > columns.length
      ? keys.map((key) => ({
          key,
          name: XLSX.utils.encode_col(+key),
          resizable: true,
        }))
      : columns;
  }, []);

  return { rows, columns };
}

type Row = any[];

type Column = {
  key: string;
  name: string;
};

export default function SpreadSheetViewer({ file }: { file: any }) {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<XLSX.WorkSheet>();

  const loading = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: `600px`,
      }}
    >
      <CircularProgress />
    </Box>
  );

  useEffect(() => {
    const get = async () => {
      const rawData = await (await fetch(file)).arrayBuffer();
      const workbook = XLSX.read(rawData, { type: "binary" });
      setData(workbook);
      setNumPages(workbook.SheetNames.length);
    };
    if (file) {
      get();
    }
  }, [file]);

  useEffect(() => {
    if (data) {
      const sheetName = data.SheetNames[pageNumber - 1];
      const { rows, columns } = getRowsCols(data.Sheets, sheetName);
      setRows(rows);
      setColumns(columns);
    }
  }, [data, pageNumber]);


  return (
    <Stack>
      {data ? <DataGrid columns={columns} rows={rows} /> : loading}
      <Divider />
      <MobileStepper
        variant="text"
        position="static"
        steps={numPages}
        activeStep={pageNumber - 1}
        nextButton={
          <Button
            size="small"
            color="secondary"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={numPages === pageNumber}
          >
            <Typography>Næste</Typography>
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            color="secondary"
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            <KeyboardArrowLeft />
            <Typography>Tilbage</Typography>
          </Button>
        }
      />
    </Stack>
  );
}
