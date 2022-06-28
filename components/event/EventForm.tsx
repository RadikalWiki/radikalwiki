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
import { nodes_insert_input, useMutation, useQuery } from "gql";
import { DatePicker } from "@mui/lab";

export default function EventForm() {
  const router = useRouter();
  const [_, setSession] = useSession();
  const [name, setName] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [date, setDate] = useState<string | null>();
  const query = useQuery();
  const groups = query
    .nodes({ where: { mimeId: { _eq: "wiki/group" } } })
    .map(({ id, name }) => ({ id, name }));
  const [addEvent] = useMutation((mutation, args: nodes_insert_input) => {
    const { id, name } = mutation.insertNode({ object: args })!;
    return { id, name };
  });

  const handleCreate = async () => {
    const event = await addEvent({ args: { name, parentId: group } });
    setSession({
      prefix: event as any,
    });
    router.push(event.id);
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
            <FormControl fullWidth>
              <InputLabel>Gruppe</InputLabel>
              <Select
                label="Gruppe"
                fullWidth
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              label="Dato"
              value={date}
              onChange={setDate}
              renderInput={(params) => <TextField fullWidth {...params} />}
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
