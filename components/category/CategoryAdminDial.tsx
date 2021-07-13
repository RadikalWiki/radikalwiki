import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Add, Edit, LowPriority } from "@material-ui/icons";
import { useStyles } from "hooks";
import { AddCategoryDialog } from ".";
import { useRouter } from "next/router";

export default function CategoryAdminDial() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [addDialog, setAddDialog] = useState(false);

  return (
    <>
      <SpeedDial
        ariaLabel="Administrer kategori"
        className={classes.speedDial}
        icon={<Edit />}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
      >
        <SpeedDialAction
          icon={
            <Avatar className={classes.avatar}>
              <Add />
            </Avatar>
          }
          tooltipTitle="Tilføj"
          tooltipOpen
          onClick={() => setAddDialog(true) }
        />
        <SpeedDialAction
          icon={
            <Avatar className={classes.avatar}>
              <LowPriority />
            </Avatar>
          }
          tooltipTitle="Sorter"
          tooltipOpen
          onClick={() => router.push("/category/sort") }
        />
      </SpeedDial>
      <AddCategoryDialog open={addDialog} setOpen={setAddDialog} />
    </>
  );
}
