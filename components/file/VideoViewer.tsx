import {
  Box,
  MobileStepper,
  Button,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
export default function VideoViewer({ file }: { file: any }) {
  console.log(file);
  return (
    file && (
      <video width="100%" controls>
        <source src={file} type="video/mp4" />
      </video>
    )
  );
}
