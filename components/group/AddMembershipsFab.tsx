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
} from "@mui/material";
import { Add, GroupAdd } from "@mui/icons-material";
import { useSession } from "hooks";
import {
  memberships_insert_input,
  roles_insert_input,
  useMutation,
} from "gql";
import { useRouter } from "next/router";
import { CSVReader } from "comps";

export default function AddMembershipsFab({ groupId }: { groupId?: string }) {
  const [session] = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [addMemberships] = useMutation(
    (mutation, args: memberships_insert_input[]) => {
      return mutation.insert_memberships({ objects: args })?.returning;
    }
  );
  const [addRoles] = useMutation((mutation, args: roles_insert_input[]) => {
    return mutation.insert_roles({ objects: args })?.returning;
  });

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
    const newMembership = await addMemberships({
      args: memberships,
    });
    const roles = newMembership?.map((m: any) => ({
      membershipId: m.id,
      role: "member",
    }));
    if (roles) await addRoles({ args: roles });
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
        sx={{
          position: "fixed",
          bottom: 9,
          right: 3,
        }}
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
