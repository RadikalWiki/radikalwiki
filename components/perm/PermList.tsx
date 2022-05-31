import React, { Suspense, useState } from "react";
import { useRouter } from "next/router";
import { ExpandMore, ExpandLess, Policy } from "@mui/icons-material";
import {
  Avatar,
  Collapse,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { mimes, permissions, useQuery } from "gql";
import { getIcon } from "mime";

function PermListElement({
  perm,
  index,
}: {
  perm: permissions;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem>
        <ListItemText primary={perm?.name} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
            size="large"
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <Collapse in={open}>
        <FormGroup>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="space-evenly"
          >
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Select"
            />
            <FormControlLabel control={<Switch />} label="Insert" />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Update"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Delete"
            />
          </Stack>
        </FormGroup>
      </Collapse>
    </>
  );
}

function MimeListElement({ mime, index }: { mime: mimes; index: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: (theme) => theme.palette.secondary.main,
            }}
          >
            {getIcon(mime)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={mime?.name} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
            size="large"
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      {mime.permisssions().map((perm, index) => (
        <PermListElement key={perm.id ?? 0} perm={perm} index={index} />
      ))}
    </>
  );
}

function ChildList({ id }: { id?: string }) {
  const query = useQuery();
  const node = query.node({ id });
  const mimes = node?.mimes();

  return (
    <List>
      {mimes?.map((mime, index: number) => {
        return (
          <MimeListElement key={mime?.id ?? 0} mime={mime} index={index} />
        );
      })}
      {mimes?.length == 0 && (
        <ListItem button>
          <ListItemText primary="Ingen mimes" />
        </ListItem>
      )}
    </List>
  );
}

export default function PermList({ id }: { id: string }) {
  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={<Typography color="secondary">Rettigheder</Typography>}
        avatar={
          <Avatar
            sx={{
              bgcolor: (theme) => theme.palette.secondary.main,
            }}
          >
            <Policy />
          </Avatar>
        }
      />
      <Divider />
      <Suspense fallback={null}>
        <ChildList id={id} />
      </Suspense>
    </Card>
  );
}
