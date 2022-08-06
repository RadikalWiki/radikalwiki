import React from "react";
import { Button, useMediaQuery, IconButton, Tooltip } from "@mui/material";

export default function AutoButton({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: any;
  onClick: any;
}) {
  const largeScreen = useMediaQuery("(min-width:1200px)");

  return largeScreen ? (
    <Button
      color="secondary"
      variant="outlined"
      endIcon={icon}
      onClick={onClick}
    >
      {text}
    </Button>
  ) : (
    <IconButton color="secondary" onClick={onClick} size="large">
      <Tooltip title={text}>{icon}</Tooltip>
    </IconButton>
  );
}
