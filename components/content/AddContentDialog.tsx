import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Stack,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { IconId, getName } from "mime";
import { Node } from "hooks";
import { FileUploader } from "comps";
import { v4 as uuid } from "uuid";

export default function AddContentDialog({
  node,
  open,
  setOpen,
  mimes,
  initTitel,
  redirect,
}: {
  node: Node;
  open: boolean;
  setOpen: Function;
  mimes: string[];
  initTitel?: string;
  redirect?: boolean;
}) {
  const router = useRouter();
  const [titel, setTitel] = useState<string>(initTitel ?? "");
  const [text, setText] = useState<string>("");
  const [mimeId, setMimeId] = useState(mimes?.[0] ?? "");
  const [fileId, setFileId] = useState<any>();
  const [type, setType] = useState<any>();
  const [fileName, setFileName] = useState<string>();
  const insert = node.useInsert();

  const handleSubmit = async () => {
    const { namespace } = await insert({
      name: titel,
      namespace: mimeId == "vote/question" ? uuid() : undefined,
      mimeId: mimes.length == 1 ? mimes[0] : mimeId!,
      data:
        mimeId == "wiki/file"
          ? { fileId, type }
          : mimeId == "vote/question"
          ? { text }
          : undefined,
    });
    if (!namespace) return;

    // Reset fields
    setOpen(false);
    setTitel(initTitel ?? "");
    setText("");
    setFileId(undefined);
    setFileName(undefined);

    if (redirect) router.push(`${router.asPath}/${namespace}`);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle color="secondary">
        Tilføj {mimes.length > 1 ? "indhold" : getName(mimes[0])}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {mimeId !== "vote/question" && (
            <TextField
              sx={{ mt: 1 }}
              autoFocus
              required
              label="Titel"
              fullWidth
              value={titel}
              onChange={(e) => setTitel(e.target.value)}
            />
          )}
          {mimes.length > 1 && (
            <FormControl required fullWidth>
              <InputLabel required>Type</InputLabel>
              <Select
                label="Type_"
                fullWidth
                required
                value={mimeId}
                renderValue={(mimeId) => {
                  const mime = mimes.filter((mime) => mime == mimeId)?.[0];
                  return mime ? (
                    <MenuItem sx={{ m: -1 }} key={mime} value={mime}>
                      <ListItemIcon>
                        <IconId mimeId={mime} />
                      </ListItemIcon>
                      <ListItemText>{getName(mime)}</ListItemText>
                    </MenuItem>
                  ) : null;
                }}
                onChange={(e) => setMimeId(e.target.value)}
              >
                {mimes?.map((mime) => (
                  <MenuItem key={mime ?? 0} value={mime}>
                    <ListItemIcon>
                      <IconId mimeId={mime} />
                    </ListItemIcon>
                    <ListItemText>{getName(mime)}</ListItemText>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {mimeId == "vote/question" && (
            <TextField
              sx={{ mt: 1 }}
              autoFocus
              required
              label={getName(mimeId)}
              placeholder={`Indsæt ${getName(mimeId).toLowerCase()}`}
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          )}
          {mimeId == "wiki/file" && (
            <>
              <FileUploader
                text="Upload Fil"
                onNewFile={async ({
                  fileId,
                  file,
                }: {
                  fileId: string;
                  file: any;
                }) => {
                  setFileId(fileId);
                  setType(file.type);
                  setFileName(file.name);
                  setTitel(file.name.split(".").slice(0, -1).join("."));
                }}
              />
              {fileName && (
                <Typography
                  sx={{ mt: 1 }}
                >{`Fil uploadet: ${fileName}`}</Typography>
              )}
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          color="secondary"
          variant="outlined"
        >
          Anuller
        </Button>
        <Button
          disabled={
            (mimeId != "vote/question" && !titel) ||
            (mimes.length !== 1 && !mimeId) ||
            (mimeId == "wiki/file" && !fileId) ||
            (mimeId == "vote/question" && !text)
          }
          onClick={handleSubmit}
          color="secondary"
          variant="outlined"
        >
          Tilføj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
