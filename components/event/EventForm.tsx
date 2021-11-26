import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSession } from "hooks";
import { events, events_insert_input, folders_insert_input, query, resolved, speakerlists_insert_input, timers_insert_input, useMutation, useQuery } from "gql";
import { DatePicker } from "@mui/lab";

export default function EventForm() {
  const router = useRouter();
  const [session, setSession] = useSession();
  const [name, setName] = useState<string>("");
  const [abbr, setAbbr] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [date, setDate] = useState<string | null>();
  const query = useQuery();
  const groups = query.groups().map(({ id, name }) => ({ id, name }))
  const [addEvent] = useMutation(
    (mutation, args: events_insert_input) => {
      const event = mutation.insert_events_one({ object: args }) as events;
      const { id, name, shortName } = event;
      return { id, name, shortName }
    }
  );
  const [addFolders] = useMutation((mutation, args: folders_insert_input) => {
    return mutation.insert_folders_one({ object: args })?.id;
  });
  const [addSpeakerlist] = useMutation((mutation, args: speakerlists_insert_input) => {
    return mutation.insert_speakerlists_one({ object: args })?.id;
  });
  const [addTimer] = useMutation((mutation, args: timers_insert_input) => {
    return mutation.insert_timers_one({ object: args })?.id;
  });
  const [updateEvent] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_events_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    }
  );

  const handleCreate = async () => {
    const event = await addEvent({ args: { name, shortName: abbr, groupId: group } })
    const folderId = await addFolders({
      args:
      {
        name: `${name} root`,
        eventId: event.id,
      },

    });
    const timerId = await addTimer({
      args:
      {
        eventId: event.id,
      },

    });
    const speakerlistId = await addSpeakerlist({
      args:
      {
        eventId: event.id,
        timerId
      },

    });
    await updateEvent({
      args: {
        id: event.id,
        set: { folderId, speakerlistId },
      },
    });
    setSession({
      event: event as any,
      roles: ["admin"],
    });
    router.push(`/folder/${folderId}`)
  };

  return (
    <Container sx={{ padding: 3 }} maxWidth="xs">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Navn"
              placeholder="Fx Hovedbestyrelsesmøde 1"
              name="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={abbr}
              onChange={(e) => setAbbr(e.target.value)}
              label="Forkortelse"
              placeholder="Fx HB1"
              name="short-name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Gruppe</InputLabel>
              <Select
                label="Gruppe"
                fullWidth
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                {
                  groups.map(group =>
                    <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              label="Dato"
              value={date}
              onChange={setDate}
              renderInput={(params) => <TextField fullWidth
                {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={handleCreate}
            >
              Tilføj begivenhed
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
