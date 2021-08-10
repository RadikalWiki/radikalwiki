import React from "react";
import { PollAdmin, PollChart, Link as NextLink } from "components";
import { useRouter } from "next/router";
import { Fade, Card, Breadcrumbs, Tooltip, Link } from "@material-ui/core";
import { Subject, HowToVote } from "@material-ui/icons";
import { useQuery } from "@apollo/client";
import { POLL_GET_CONTENT } from "gql";
import { useStyles } from "hooks";

export default function Id() {
  const { query } = useRouter();
  const classes = useStyles();
  const { data, loading } = useQuery(POLL_GET_CONTENT, {
    variables: { id: query?.id },
  });

  const content = data?.poll?.content;

  return (
    <>
      <Fade in={!loading}>
        <Breadcrumbs className={classes.bread}>
          <Link
            component={NextLink}
            className={classes.breadText}
            color="primary"
            href="/folder"
          >
            <Tooltip title="Indhold">
              <Subject />
            </Tooltip>
          </Link>
          {content?.parent ? (
            <Link
              component={NextLink}
              color="primary"
              href={`/content/${content?.parent.id}`}
            >
              {content?.parent.name}
            </Link>
          ) : (
            <Link
              component={NextLink}
              color="primary"
              href={`/folder/${content?.folder.id}`}
            >
              {content?.folder.name}
            </Link>
          )}
          <Link
            component={NextLink}
            color="primary"
            href={`/content/${content?.id}`}
          >
            {content?.name}
          </Link>
          <Link
            component={NextLink}
            color="primary"
            href={`/poll/${query?.id}`}
            className={classes.breadText}
          >
            <Tooltip title="Afstemning">
              <HowToVote />
            </Tooltip>
          </Link>
        </Breadcrumbs>
      </Fade>
      <PollAdmin pollId={query?.id as string} />
      <PollChart pollId={query?.id as string} />
    </>
  );
}
