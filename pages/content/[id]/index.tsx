import React, { Fragment, useState } from "react";
import {
  Link as NextLink,
  Content,
  ContentToolbar,
  PollList,
  ContentAvatar,
  ChildList,
} from "comps";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useStyles, useSession } from "hooks";
import { ExpandMore, Subject } from "@material-ui/icons";
import { CONTENT_GET } from "gql";
import {
  Breadcrumbs,
  Collapse,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Link,
  Tooltip,
  Fade,
} from "@material-ui/core";

export default function Id() {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const {
    loading,
    data: { content } = {},
    error,
  } = useQuery(CONTENT_GET, {
    variables: { id },
  });
  const [expand, setExpand] = useState(true);

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

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
              {content?.parent.name || ""}
            </Link>
          ) : (
            content?.folder.parentId && (
              <Link
                component={NextLink}
                color="primary"
                href={`/folder/${content?.folder.id}`}
              >
                {content?.folder.name || ""}
              </Link>
            )
          )}
          <Link component={NextLink} color="primary" href={`/content/${id}`}>
            {content?.name || ""}
          </Link>
        </Breadcrumbs>
      </Fade>
      <Fade in={!loading}>
        <Card className={classes.card}>
          <CardHeader
            title={content?.name}
            avatar={<ContentAvatar contentId={id} />}
            subheader={
              !(content?.parent && content?.folder.mode == "candidates")
                ? formatAuthors(content?.authors)
                : ""
            }
            action={
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expand,
                })}
                color="primary"
                onClick={() => setExpand(!expand)}
              >
                <Tooltip title={expand ? "Skjul" : "Vis"}>
                  <ExpandMore />
                </Tooltip>
              </IconButton>
            }
          />
          <Divider />
          <Collapse in={expand}>
            <ContentToolbar contentId={id as string} />
            <Content contentId={id as string} />
          </Collapse>
        </Card>
      </Fade>
      <ChildList contentId={id as string} />
      <PollList contentId={id as string} />
    </>
  );
}
