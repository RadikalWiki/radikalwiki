import {
  Grid,
  Box,
  Paper,
  Collapse,
  MobileStepper,
  Button,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Slate, Image } from "comps";
import { Node } from "hooks";
import nhost from "nhost";
import { useEffect, useState } from "react";
import { toHtml } from "core/document";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "core/pdf-worker";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { gridRowsLoadingSelector } from "@mui/x-data-grid";

// eslint-disable-next-line functional/immutable-data
pdfjs.GlobalWorkerOptions.workerSrc = `/${workerSrc}`;

export default function PdfViewer({ file }: { file: any }) {
  const [numPages, setNumPages] = useState(1);
  const [height, setHeight] = useState(600);
  const [pageNumber, setPageNumber] = useState(1);

  const loading = <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: `${height}px` }}><CircularProgress /></Box>;

  return (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: `${height}px` }}>
        <Document
          file={file}
          noData=""
          loading={loading}
          onLoadSuccess={async (info) => {
            const page = await info.getPage(pageNumber)
            const { viewBox } = page.getViewport()
            setHeight(viewBox[3]);
            setNumPages(info.numPages);
          }}
        >
          <Page
            loading={loading}
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </Box>
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