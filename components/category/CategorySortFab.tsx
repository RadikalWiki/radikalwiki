import React from "react";
import { Fab, Tooltip } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { useStyles, useSession } from "hooks";
import { CATEGORY_UPDATE } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function CategorySortFab({ categories }: { categories: any }) {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [updateCategory] = useMutation(CATEGORY_UPDATE);

  const handleClick = () => {
    categories.map(async (cat: any, index: number) => {
      const set = { priority: index };
      await updateCategory({ variables: { id: cat.id, set } });
    });
    router.push("/category");
  };

  return (
    <Tooltip title="Gem sortering">
      <Fab className={classes.speedDial} color="primary" onClick={handleClick}>
        <Save />
      </Fab>
    </Tooltip>
  );
}
