import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSession } from "hooks";
import { useRouter } from "next/router";

import { useMutation, useQuery } from "gql";

export default function AddContentFab({ id }: { id: string }) {
  const [session] = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const query = useQuery();
  const folder = query.folders_by_pk({ id });
  const [addContents] = useMutation(
    (
      mutation,
      object: {
        name: string;
        folderId: string;
        data: string;
        creatorId: string;
      }
    ): string => {
      return mutation.insert_contents_one({ object })?.id;
    },
    {
      refetchQueries: [
        query.folders_by_pk({ id }),
      ],
    }
  );
  const [addAuthors] = useMutation(
    (mutation, objects: { email: string; contentId: string }[]) => {
      mutation.insert_authorships({ objects })?.affected_rows;
    }
  );

  const handleSubmit = async () => {
    const contentId = await addContents({
      args: {
        name,
        folderId: folder?.id,
        data: "",
        creatorId: session?.user?.id as string,
      },
    });
    const args = [{ email: session?.user?.email as string, contentId }];
    await addAuthors({ args });
    router.push(`/content/${contentId}/edit`);
  };

  if (folder?.lockContent) return null;

  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          bottom: (t) => t.spacing(9),
          right: (t) => t.spacing(3),
        }}
        variant="extended"
        color="primary"
        aria-label="Tilføj indhold"
        onClick={() => setOpen(true)}
      >
        <Add sx={{ mr: 1 }} />
        Indhold
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Tilføj indhold</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titel"
            placeholder="Fx afskaf ananas på pizza"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="primary"
          >
            Anuller
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Tilføj
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
