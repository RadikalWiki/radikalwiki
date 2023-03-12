import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { resolved, query, order_by } from 'gql';
import { Node, useNode } from 'hooks';

const InvitesTextField = ({ node }: { node: Node }) => {
  const nodeMembers = node.useMembers();
  const [users, setUsers] = useState<any[]>([]);

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

  const [options, setOptions] = useState<any[]>([]);
  const [inputValue, setInputValue] = React.useState('');

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
        inputValue ? [{ name: 'N/A', email: inputValue }] : []
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
          getOptionLabel={(option) => option.email ?? option?.name ?? ''}
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
}

export default InvitesTextField;