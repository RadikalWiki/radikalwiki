import React from "react";
import { Fab } from "@material-ui/core";
import { useStyles } from "hooks";
import { CATEGORY_UPDATE } from "gql";
import { useMutation } from "@apollo/client";

export default function AddCategoryFab({
  category,
  mode,
}: {
  category: any;
  mode: any;
}) {
  const classes = useStyles();
  const [updateCategory] = useMutation(CATEGORY_UPDATE);

  if (!category) return null;

  const handleClick = async () => {
    const set =
      mode == "content"
        ? { lockContent: !category.lockContent }
        : { lockChildren: !category.lockChildren };
    await updateCategory({
      variables: { id: category.id, set },
    });
  };

  const state =
    mode == "content" ? category.lockContent : category.lockChildren;
  const name =
    mode == "content"
      ? "Indhold"
      : category.childMode == "changes"
      ? "Ændringsforslag"
      : "Kandidaturer";

  return (
    <Fab
      className={mode == "content" ? classes.speedDial3 : classes.speedDial4}
      variant="extended"
      color="primary"
      onClick={handleClick}
    >
      {state ? "Åben" : "Lås"} {name}
    </Fab>
  );
}
