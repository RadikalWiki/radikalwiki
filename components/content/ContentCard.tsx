import React from "react";
import { Card, CardHeader, Typography } from "@material-ui/core";
import { useStyles } from "hooks";

export default function ContentCard({ content }: { content: any }) {
  const classes = useStyles();

  if (!content) return null;

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  return (
    <Card className={classes.card}>
      <CardHeader
        title={content.name}
        subheader={formatAuthors(content.authors)}
        subheaderTypographyProps={{ color: "inherit" }}
        className={classes.cardHeader}
      />
      <Typography className={classes.text} style={{ whiteSpace: "pre-line" }}>
        <div dangerouslySetInnerHTML={{ __html: content?.data }} />
      </Typography>
    </Card>
  );
}
