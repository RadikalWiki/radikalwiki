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
import nhost from "nhost";
import { useEffect, useState } from "react";

export default function CandidateList() {
  const node = useNode();
  const router = useRouter();
  const largeScreen = useMediaQuery("(min-width:640px)");
  const userId = useUserId();
  const [images, setImages] = useState<string[]>([]);

  const children = node.query
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
    });

  const imageIds = children?.map(child => child.data()?.image)

  useEffect(() => {
    const fetch = async () => {
      const preUrls = await Promise.all(imageIds?.map(fileId => nhost.storage.getPresignedUrl({ fileId })) ?? []);
      setImages(preUrls.map(preUrl => preUrl.presignedUrl?.url ?? "") ?? [])
    };
    if (imageIds?.[0]) {
      fetch()
    }
  }, [imageIds]);

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
      {children?.map(({ id, name, namespace }, index) => {
        return !id ? null : (
          <ImageListItem
            key={id ?? 0}
            sx={{ borderRadius: "70px" }}
            onClick={handleOnClick(namespace)}
          >
            {images?.[index] ? (
              <Image alt="Billede for indhold" layout="fill" src={images?.[index]} />
            ) : (
              <Box sx={{ height: "50px" }}></Box>
            )}
            <ImageListItemBar
              sx={{ borderRadius: "10px" }}
              title={name}
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
