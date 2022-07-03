import {
  Avatar,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  useMediaQuery,
} from "@mui/material";
import { useNode } from "hooks";
import { getIcon } from "mime";
import { Image } from "comps";
import { useRouter } from "next/router";
import { query, resolved } from "gql";
import { toWhere } from "core/path";
import { Box } from "@mui/system";
import { useUserId } from "@nhost/react";

export default function CandidateList() {
  const node = useNode();
  const router = useRouter();
  const largeScreen = useMediaQuery("(min-width:640px)");
  const userId = useUserId();

  const handleOnClick = (namespace?: string) => async () => {
    const path = `${router.asPath}/${namespace}`.substring(1).split("/");
    await resolved(() => {
      const node = query?.nodes(toWhere(path))?.[0];
      node?.id;
      node?.name;
      node?.mimeId;
    });

    router.push(`${router.asPath}/${namespace}`);
  };
  return (
    <ImageList cols={largeScreen ? 2 : 1} sx={{ m: 1 }}>
      {node.query
        ?.children({
          where: {
            _and: [
              { mimeId: { _eq: "vote/candidate" } },
              {
                _or: [
                  { mutable: { _eq: false } },
                  { ownerId: { _eq: userId } },
                  { members: { nodeId: { _eq: userId } } },
                ],
              },
            ],
          },
        })
        .map((child) => {
          const image = child.data()?.image;
          return (
            <ImageListItem
              key={child.id ?? 0}
              sx={{ borderRadius: "70px" }}
              onClick={handleOnClick(child.namespace)}
            >
              {image ? (
                <Image alt="Billede for indhold" layout="fill" src={image} />
              ) : (
                <Box sx={{ height: "50px" }}></Box>
              )}
              <ImageListItemBar
                sx={{ borderRadius: "10px" }}
                title={child.name}
                position="top"
                actionPosition="left"
                actionIcon={
                  <Avatar
                    sx={{
                      m: 1,
                      height: 32,
                      width: 32,
                      bgcolor: "#ffffff",
                      color: (t) => t.palette.primary.main,
                    }}
                  >
                    {getIcon("vote/candidate")}
                  </Avatar>
                }
              />
            </ImageListItem>
          );
        }) ?? []}
    </ImageList>
  );
}
