import {
  Avatar,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import { Node, useScreen } from "hooks";
import { getIconFromId } from "mime";
import { Image } from "comps";
import { useRouter } from "next/router";
import { query, resolved } from "gql";
import { toId } from "core/path";
import { Box } from "@mui/system";
import { useUserId } from "@nhost/nextjs";
import { nhost } from "nhost";
import { useEffect, useState } from "react";

export default function CandidateList({ node }: { node: Node }) {
  const router = useRouter();
  const screen = useScreen();
  const largeScreen = useMediaQuery("(min-width:1200px)");
  const userId = useUserId();
  const [images, setImages] = useState<string[]>([]);

  const children = node.useQuery()?.children({
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

  const imageIds = children?.map((child) => child.data()?.image);

  useEffect(() => {
    const fetch = async () => {
      setImages([]);
      const preUrls = await Promise.all(
        imageIds?.map((fileId) =>
          fileId
            ? nhost.storage.getPresignedUrl({ fileId })
            : Promise.resolve(null)
        ) ?? []
      );
      setImages(preUrls.map((preUrl) => preUrl?.presignedUrl?.url ?? "") ?? []);
    };
    fetch();
  }, [JSON.stringify(imageIds)]);

  if (screen) return null;

  const handleOnClick = (namespace?: string) => async () => {
    const path = `${router.asPath}/${namespace}`.substring(1).split("/");
    const id = await toId(path);
    await resolved(() => {
      const node = query?.node({ id });
      node?.id;
      node?.name;
      node?.mimeId;
    });

    router.push(`${router.asPath}/${namespace}`);
  };

  return (
    <ImageList cols={largeScreen ? 2 : 1} sx={{ m: 0 }}>
      {children?.map(({ id, name, namespace }, index) => {
        return !id ? null : (
          <ImageListItem
            key={id ?? 0}
            sx={{ borderRadius: "70px", cursor: "pointer" }}
            onClick={handleOnClick(namespace)}
          >
            {images?.[index] ? (
              <Image
                alt="Billede for indhold"
                layout="fill"
                src={images?.[index]}
              />
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
                    color: "primary.main",
                  }}
                >
                  {getIconFromId("vote/candidate")}
                </Avatar>
              }
            />
          </ImageListItem>
        );
      }) ?? []}
    </ImageList>
  );
}
