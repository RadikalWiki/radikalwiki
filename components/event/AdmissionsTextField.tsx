import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { resolved, query, order_by } from "gql";

const capitalize = (sentence: string) =>
  sentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

export default function AdmissionsTextField({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) {
  const [options, setOptions] = useState<any[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    const fetch = async () => {
      const like = `%${inputValue}%`;
      const identities = await resolved(() =>
        query
          .identities({
            limit: 10,
            where: {
              displayName: { _ilike: like },
            },
            order_by: [{ displayName: order_by.asc }],
          })
          .map(({ displayName, email }) => ({ displayName, email }))
      );
      let newOptions: any[] = [];

      if (value) {
        newOptions = value;
      }

      if (identities) {
        newOptions = [...identities, ...newOptions];
      }

      setOptions(newOptions);
    };
    fetch();
  }, [value, inputValue, query]);

  return (
    <Autocomplete
      multiple
      color="primary"
      options={options}
      getOptionLabel={(option) =>
        option?.displayName ?? option.name ?? ""
      }
      defaultValue={options}
      value={value}
      filterSelectedOptions
      includeInputInList
      autoComplete
      autoHighlight
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          color="primary"
          variant="outlined"
          label="Tilføj adgang"
          placeholder="Medlemsnavn"
        />
      )}
    />
  );
}
