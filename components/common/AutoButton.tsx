import React from "react";
import { Button, useMediaQuery, IconButton, Tooltip } from "@material-ui/core";

export default function AutoButton({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: any;
  onClick: any;
}) {
  const largeScreen = useMediaQuery("(min-width:640px)");

  return largeScreen ? (
    <Button
      color="primary"
      variant="contained"
      endIcon={icon}
      onClick={onClick}
    >
      {text}
    </Button>
  ) : (
    <IconButton color="primary" onClick={onClick}>
      <Tooltip title={text}>{icon}</Tooltip>
    </IconButton>
  );
}
