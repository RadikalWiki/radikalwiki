import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Fade,
  IconButton,
  Tooltip,
  Collapse,
  Popover,
  Slider,
  Paper,
} from "@material-ui/core";
import { useStyles } from "hooks";
import { useQuery } from "@apollo/client";
import { Content } from "comps";
import { CONTENT_GET_CARD } from "gql";
import { ExpandMore, ZoomIn } from "@material-ui/icons";
import clsx from "clsx";

export default function ContentCard({
  contentId,
  expanded,
}: {
  contentId: string;
  expanded?: boolean;
}) {
  const classes = useStyles();
  const {
    data: { content } = {},
    loading,
    error,
  } = useQuery(CONTENT_GET_CARD, {
    variables: { id: contentId },
  });
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

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  return (
    <>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <CardHeader
            title={content.name}
            subheader={formatAuthors(content.authors)}
            subheaderTypographyProps={{ color: "inherit" }}
            className={classes.cardHeader}
            action={[
              <IconButton
                color="inherit"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <Tooltip title="Zoom">
                  <ZoomIn />
                </Tooltip>
              </IconButton>,
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expand,
                })}
                color="inherit"
                onClick={() => setExpand(!expand)}
              >
                <Tooltip title={expand ? "Skjul" : "Vis"}>
                  <ExpandMore />
                </Tooltip>
              </IconButton>,
            ]}
          />
          <Collapse in={expand}>
            <Content contentId={contentId} fontSize={fontSize} />
          </Collapse>
        </Card>
      </Fade>
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
            style={{ width: 200, margin: 20 }}
            min={50}
            max={250}
            defaultValue={200}
            step={50}
            marks={marks}
            onChange={(event, newValue) => setFontSize(`${newValue}%`)}
          />
        </Paper>
      </Popover>
    </>
  );
}
