import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Fade,
  IconButton,
  Tooltip,
  Collapse,
} from "@material-ui/core";
import { useStyles } from "hooks";
import { useQuery } from "@apollo/client";
import { Content } from "comps";
import { CONTENT_GET_CARD } from "gql";
import { ExpandMore } from "@material-ui/icons";
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

  if (!content) return null;

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  return (
    <Fade in={!loading}>
      <Card className={classes.card}>
        <CardHeader
          title={content.name}
          subheader={formatAuthors(content.authors)}
          subheaderTypographyProps={{ color: "inherit" }}
          className={classes.cardHeader}
          action={
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
            </IconButton>
          }
        />
        <Collapse in={expand}>
          <Content contentId={contentId} />
        </Collapse>
      </Card>
    </Fade>
  );
}
