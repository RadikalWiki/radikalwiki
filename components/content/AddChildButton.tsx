import React from "react";
import { AutoButton } from "comps";
import { PlusOne } from "@mui/icons-material";
import { useSession } from "hooks";
import {
  authorships_insert_input,
  contents_insert_input,
  useMutation,
} from "gql";
import { useRouter } from "next/router";
import { useQuery } from "gql";

type mode = "candidates" | "changes";

export default function AddChildButton({ contentId }: { contentId: any }) {
  const [session] = useSession();
  const router = useRouter();
  const query = useQuery();
  const content = query.contents_by_pk({ id: contentId });
  const [addContents] = useMutation(
    (mutation, args: contents_insert_input) => {
      return mutation.insert_contents_one({ object: args })?.id;
    },
    {
      refetchQueries: [query.contents_by_pk({ id: contentId })],
    }
  );
  const [addAuthors] = useMutation(
    (mutation, args: authorships_insert_input[]) => {
      return mutation.insert_authorships({ objects: args })?.returning;
    }
  );

  const contentType =
    content?.folder?.mode == "candidates" ? "Kandidatur" : "Ændringsforslag";
  const children = content?.children().map((c) => c.id);
  const name =
    content?.folder?.mode == "candidates"
      ? session?.user?.name
      : content?.parent
      ? `Ændringsforslag ${(children?.length ?? 0) + 1} til "${content?.name}"`
      : `Ændringsforslag ${(children?.length ?? 0) + 1}`;

  const handleSubmit = async () => {
    const contentId = await addContents({
      args: {
        name,
        folderId: content?.folder?.id,
        data: "",
        creatorId: session?.user?.id,
        parentId: content?.id,
      },
    });
    if (!contentId) return;
    const objects = [
      {
        email: session?.user?.email,
        contentId,
      },
    ];
    await addAuthors({ args: objects });
    router.push(`/content/${contentId}/edit`);
  };

  if (content?.folder?.lockChildren) return null;

  return (
    <AutoButton text={contentType} icon={<PlusOne />} onClick={handleSubmit} />
  );
}
