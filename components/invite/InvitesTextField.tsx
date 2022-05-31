import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import {
  resolved,
  query,
  order_by,
  useMutation,
  members_insert_input,
} from "gql";

export default function InvitesTextField({ id }: { id: string }) {
  const node = query.node({ id });
  const [users, setUsers] = useState<any[]>([]);

  const [addInvites] = useMutation(
    (mutation, args: members_insert_input[]) => {
      return mutation.insertMembers({ objects: args })?.affected_rows;
    },
    {
      refetchQueries: [
        node?.members({ order_by: [{ user: { displayName: order_by.asc } }] }),
      ],
    }
  );

  const handleAddInvites = async () => {
    const args = users.map((user) => ({
      name: user.name,
      email: user.email,
      nodeId: user.userId,
      parentId: id,
    }));
    await addInvites({ args });
    setUsers([]);
  };

  const [options, setOptions] = useState<any[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    const fetch = async () => {
      const like = `%${inputValue}%`;
      const res = await resolved(() =>
        query
          .users({
            limit: 10,
            where: {
              displayName: { _ilike: like },
            },
            order_by: [{ displayName: order_by.asc }],
          })
          .map(({ displayName, id }) => ({ name: displayName, userId: id }))
      );

      const newOptions: any[] = ([] as any[]).concat(
        users ? users : [],
        res ? res : [],
        inputValue ? [{ name: "N/A", email: inputValue }] : []
      );

      setOptions(newOptions);
    };
    fetch();
  }, [users, inputValue, query]);

  return (
    <Grid style={{ margin: 1 }} container spacing={2}>
      <Grid item xs={6}>
        <Autocomplete
          multiple
          color="primary"
          options={options}
          getOptionLabel={(option) => option.email ?? option?.name ?? ""}
          defaultValue={options}
          value={users}
          filterSelectedOptions
          includeInputInList
          autoComplete
          autoHighlight
          onChange={(_, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setUsers(newValue);
          }}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              color="primary"
              variant="outlined"
              label="Inviter"
              placeholder="Navn eller E-mail"
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Button onClick={handleAddInvites} color="primary" variant="contained">
          Tilføj
        </Button>
      </Grid>
    </Grid>
  );
}
