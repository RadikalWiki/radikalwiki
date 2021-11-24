import React, { useState } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  Tooltip,
  Collapse,
  Popover,
  Slider,
  Paper,
} from "@mui/material";
import { useQuery } from "gql";
import { Content, ExpandButton } from "comps";
import { ZoomIn } from "@mui/icons-material";

export default function ContentCard({
  id,
  expanded,
}: {
  id: string;
  expanded?: boolean;
}) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const [expand, setExpand] = useState(expanded ?? true);
  const [fontSize, setFontSize] = useState("200%");
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const marks = [
    {
      value: 50,
      label: "50%",
    },
    {
      value: 100,
      label: "100%",
    },
    {
      value: 150,
      label: "150%",
    },
    {
      value: 200,
      label: "200%",
    },
    {
      value: 250,
      label: "250%",
    },
  ];

  if (!content) return null;

  return (
    <>
      <Card elevation={3} sx={{ m: 1 }}>
        <CardHeader
          title={content.name}
          subheader={content
            .authors()
            ?.map(({ identity, name }) => identity?.displayName ?? name)
            .join(", ")}
          subheaderTypographyProps={{ color: "inherit" }}
          sx={{
            bgcolor: (theme) => theme.palette.secondary.main,
            color: (theme) => theme.palette.secondary.contrastText,
          }}
          action={[
            <IconButton
              key="zoom"
              color="inherit"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              size="large"
            >
              <Tooltip title="Zoom">
                <ZoomIn />
              </Tooltip>
            </IconButton>,
            <ExpandButton key="expand" onClick={() => setExpand(!expand)} />,
          ]}
        />
        <Collapse in={expand}>
          <Content id={id} fontSize={fontSize} />
        </Collapse>
      </Card>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorEl(null)}
      >
        <Paper>
          <Slider
            sx={{ width: 200, margin: 3 }}
            min={50}
            max={250}
            defaultValue={200}
            step={50}
            marks={marks}
            onChange={(_, newValue) => setFontSize(`${newValue}%`)}
          />
        </Paper>
      </Popover>
    </>
  );
}
