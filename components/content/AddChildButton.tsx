import React from "react";
import { Button, Fab } from "@material-ui/core";
import { PlusOne } from "@material-ui/icons";
import { useSession } from "hooks";
import { CONTENT_ADD, AUTHORSHIPS_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

type mode = "candidates" | "changes";

export default function AddChildButton({ content }: { content: any }) {
  const [session] = useSession();
  const router = useRouter();
  const [addContent] = useMutation(CONTENT_ADD);
  const [addAuthors] = useMutation(AUTHORSHIPS_ADD);

  const contentType =
    content?.category.childMode == "candidates"
      ? "Kandidatur"
      : "Ændringsforslag";
  const name =
    content?.category.childMode == "candidates"
      ? session?.displayName
      : content?.parent
      ? `Ændringsforslag ${content?.children.length + 1} til "${content?.name}"`
      : `Ændringsforslag ${content?.children.length + 1}`;

  const handleSubmit = async () => {
    const { data } = await addContent({
      variables: {
        name,
        categoryId: content?.category.id,
        data: "",
        creatorId: session?.user.id,
        parentId: content?.id,
      },
    });
    const objects = [
      { email: session.user.email, contentId: data.insert_contents_one.id },
    ];
    await addAuthors({ variables: { objects } });
    router.push(`/content/${data.insert_contents_one.id}/edit`);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<PlusOne />}
      onClick={() => handleSubmit()}
    >
      {contentType}
    </Button>
  );
}
