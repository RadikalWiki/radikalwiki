import React, { useEffect, useState } from "react";
import { Avatar, Box, Chip, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { query, resolved, order_by } from "gql";
import { getIcon } from "mime";
import { Face } from "@mui/icons-material";

const capitalize = (sentence: string) =>
  sentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

export default function AuthorTextField({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) {
  const [options, setOptions] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const like = `%${inputValue}%`;

      const nodes = await resolved(() => {
        return query
          .nodes({
            limit: 10,
            where: {
              _and: [
                { mimeId: { _eq: "wiki/group" } },
                { name: { _ilike: like } },
              ],
            },
            order_by: [{ name: order_by.asc }],
          })
          .map(({ id, name }) => ({ name, nodeId: id, mimeId: "wiki/group" }));
      });
      const users = await resolved(() => {
        return query
          .users({
            limit: 10,
            order_by: [{ displayName: order_by.asc }],
          })
          .map(({ id, displayName }) => ({
            name: displayName,
            nodeId: id,
          }));
      });

      const newOptions: any[] = ([] as any[]).concat(
        users ? users : [],
        nodes ? nodes : [],
        value ? value : [],
        inputValue ? [{ name: capitalize(inputValue) }] : []
      );

      setOptions(newOptions);
    };
    fetch();
  }, [value, inputValue]);

  return (
    <Autocomplete
      multiple
      color="primary"
      options={options}
      getOptionLabel={(option) => option?.name ?? ""}
      defaultValue={options}
      value={value}
      filterSelectedOptions
      includeInputInList
      autoComplete
      autoHighlight
      onChange={(_, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        onChange(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Chip
            variant="outlined"
            color="secondary"
            icon={option?.mimeId ? getIcon(option.mimeId) : <Face />}
            label={option?.name}
          />
        </Box>
      )}
      renderTags={(value, getCustomizedTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            color="secondary"
            icon={option?.mimeId ? getIcon(option.mimeId) : <Face />}
            label={option?.name}
            {...getCustomizedTagProps({ index })}
            key={index}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          color="primary"
          variant="outlined"
          label="Forfattere"
          placeholder="Tilføj Forfatter"
        />
      )}
    />
  );
}
