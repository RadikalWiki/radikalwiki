import { Avatar, Tooltip, Fade } from "@mui/material";
import { Lock } from "@mui/icons-material";
import {
  useQuery,
  Maybe,
  contents,
  contents_order_by,
  order_by,
} from "gql";

function ContentAvatar({ content }: { content: Maybe<contents> }) {

  const getLetter = (index: number) => {
    let res = String.fromCharCode(65 + (index % 26));
    if (index >= 26) {
      res = String.fromCharCode(64 + Math.floor(index / 26)) + res;
    }
    return res;
  };

  const index = content?.parent
    ? content?.parent
        ?.children({
          where: { published: { _eq: true } },
          order_by: [{ priority: order_by.asc }, { createdAt: order_by.asc }],
        })
        .findIndex((e: any) => e.id === content.id)
    : content?.folder
        ?.contents({
          where: { published: { _eq: true }, parentId: { _is_null: true } },
          order_by: [{ priority: order_by.asc }, { createdAt: order_by.asc }],
        })
        .findIndex((e: any) => e.id === content.id) ?? 0;

  return (
    <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
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
  );
}

export default ContentAvatar;
