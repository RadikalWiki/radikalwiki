import React from "react";
import { Card, CardHeader, Typography, Fade } from "@material-ui/core";
import { useStyles } from "hooks";
import { useQuery } from "@apollo/client";
import { Content } from "comps";
import { CONTENT_GET_CARD } from "gql";

export default function ContentCard({ contentId }: { contentId: string }) {
  const classes = useStyles();
  const {
    data: { content } = {},
    loading,
    error,
  } = useQuery(CONTENT_GET_CARD, {
    variables: { id: contentId },
  });

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
        />
        <Content contentId={contentId} />
      </Card>
    </Fade>
  );
}
