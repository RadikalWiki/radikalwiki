import React, { startTransition, useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { resolve, order_by } from 'gql';
import { Node } from 'hooks';

type Option = {
  name?: string;
  email?: string;
  userId?: string;
};

const InvitesTextField = ({ node }: { node: Node }) => {
  const nodeMembers = node.useMembers();
  const [users, setUsers] = useState<Option[]>([]);

  const handleAddInvites = async () => {
    const members = users.map((user) => ({
      name: user.name,
      email: user.email,
      nodeId: user.userId,
      parentId: node.id,
    }));
    await nodeMembers.insert({ members });
    setUsers([]);
  };

  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    const fetch = async () => {
      const like = `%${inputValue}%`;
      const res = await resolve(({ query }) =>
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

      const newOptions: Option[] = ([] as Option[]).concat(
        users ? users : [],
        res ? res : [],
        inputValue ? [{ name: 'N/A', email: inputValue }] : []
      );

      setOptions(newOptions);
    };
    startTransition(() => {
      fetch();
    });
  }, [JSON.stringify(users), inputValue]);

  return (
    <Grid style={{ margin: 1 }} container spacing={2}>
      <Grid item xs={6}>
        <Autocomplete
          multiple
          color="primary"
          options={options}
          getOptionLabel={(option) => option.email ?? option?.name ?? ''}
          defaultValue={options}
          value={users}
          filterSelectedOptions
          includeInputInList
          autoComplete
          autoHighlight
          onChange={(_, newValue) => {
            setOptions(newValue.length ? newValue.concat(options) : options);
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
              placeholder="Navn eller Email"
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
};

export default InvitesTextField;
