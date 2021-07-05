import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
} from "@material-ui/core";
import { Add, GroupAdd } from "@material-ui/icons";
import { useStyles, useSession } from "hooks";
import { MEMBERSHIPS_ADD, ROLES_ADD } from "gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CSVReader } from "comps";

export default function AddMembershipsFab({ groupId }: { groupId?: string }) {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [addMemberships] = useMutation(MEMBERSHIPS_ADD);
  const [addRoles] = useMutation(ROLES_ADD);

  const handleFile = async (fileData: any) => {
    const memberships = fileData.reduce(
      (a: any, m: any) =>
        m.email
          ? [
              ...a,
              {
                groupId,
                email: m.email.toLowerCase(),
              },
            ]
          : a,
      []
    );
    const { data } = await addMemberships({
      variables: {
        objects: memberships,
      },
    });
    const roles = data.insert_memberships.returning.map((m: any) => ({
      membershipId: m.id,
      role: "member",
    }));
    await addRoles({ variables: { objects: roles } });
  };

  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <CSVReader parseOptions={parseOptions} onFileLoaded={handleFile}>
      <Fab
        className={classes.speedDial}
        variant="extended"
        color="primary"
        aria-label="Tilføj medlemskaber"
        component="span"
      >
        <GroupAdd />
        medlemskaber
      </Fab>
    </CSVReader>
  );
}
