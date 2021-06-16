import React from "react";
import { Card, CardHeader, Typography } from "@material-ui/core";
import { useStyles } from "hooks";
import { CONTENT_GET } from "gql";
import { useQuery } from "@apollo/client";

export default function ContentCard({ id }: { id: any }) {
  const classes = useStyles();
  const { data } = useQuery(CONTENT_GET, { variables: { id } });

  const content = data?.content;

  if (!content) return null;

  return (
    <Card className={classes.card}>
      <CardHeader title={content.name} className={classes.cardHeader} />
      <>
        <Typography className={classes.creatorTextCard} color="textSecondary">
          {content?.creators}
        </Typography>

        <Typography className={classes.text} style={{ whiteSpace: "pre-line" }}>
          {content?.data}
        </Typography>
      </>
    </Card>
  );
}
