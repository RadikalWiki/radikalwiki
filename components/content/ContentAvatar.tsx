import { Avatar, Tooltip, Fade } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { useStyles } from "hooks";
import { useQuery } from "@apollo/client";
import { CONTENT_GET_AVATAR } from "gql";
import { memo } from "react";

function ContentAvatar({ contentId }: any) {
  const classes = useStyles();
  const {
    loading,
    data: { content } = {},
    error,
  } = useQuery(CONTENT_GET_AVATAR, {
    variables: { id: contentId },
  });

  const getLetter = (index: number) => {
    let res = String.fromCharCode(65 + (index % 26));
    if (index >= 26) {
      res = String.fromCharCode(64 + Math.floor(index / 26)) + res;
    }
    return res;
  };

  const index = content?.parent
    ? content?.parent?.children.findIndex((e: any) => e.id === contentId)
    : content?.folder.contents.findIndex((e: any) => e.id === contentId);

  return (
    <Fade in={!loading}>
      <Avatar className={classes.avatar}>
        {!content?.published ? (
          <Tooltip title="Ikke indsendt">
            <Avatar>
              <Lock color="primary" />
            </Avatar>
          </Tooltip>
        ) : content?.parent ? (
          index + 1
        ) : (
          getLetter(index)
        )}
      </Avatar>
    </Fade>
  );
}

export default memo(ContentAvatar);