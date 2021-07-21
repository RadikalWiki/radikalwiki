import React from "react";
import { AutoButton } from "comps";
import { PlusOne } from "@material-ui/icons";
import { useSession } from "hooks";
import { CONTENTS_ADD, AUTHORSHIPS_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

type mode = "candidates" | "changes";

export default function AddChildButton({ content }: { content: any }) {
  const [session] = useSession();
  const router = useRouter();
  const [addContents] = useMutation(CONTENTS_ADD);
  const [addAuthors] = useMutation(AUTHORSHIPS_ADD);

  const contentType =
    content?.folder.mode == "candidates" ? "Kandidatur" : "Ændringsforslag";
  const name =
    content?.folder.mode == "candidates"
      ? session?.displayName
      : content?.parent
      ? `Ændringsforslag ${content?.children.length + 1} til "${content?.name}"`
      : `Ændringsforslag ${content?.children.length + 1}`;

  const handleSubmit = async () => {
    const { data } = await addContents({
      variables: {
        objects: [
          {
            name,
            folderId: content?.folder.id,
            data: "",
            creatorId: session?.user.id,
            parentId: content?.id,
          },
        ],
      },
    });
    const contentId = data.insert_contents.returning[0].id;
    const objects = [
      {
        email: session.user.email,
        contentId,
      },
    ];
    await addAuthors({ variables: { objects } });
    router.push(`/content/${contentId}/edit`);
  };

  return (
    <AutoButton text={contentType} icon={<PlusOne />} onClick={handleSubmit} />
  );
}
