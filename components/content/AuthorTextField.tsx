import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useStyles } from "hooks";
import { useApolloClient } from "@apollo/client";
import { IDENTITIES_FIND } from "gql";

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
  const [inputValue, setInputValue] = React.useState("");
  const client = useApolloClient();

  useEffect(() => {
    const fetch = async () => {
      const like = `%${inputValue}%`;
      const {
        data: { identities },
      } = await client.query({
        query: IDENTITIES_FIND,
        variables: { like },
      });
      let newOptions: any[] = [];

      if (value) {
        newOptions = value;
      }

      if (identities) {
        newOptions = [
          ...identities.map((identity: any) => ({ identity })),
          ...newOptions,
        ];
      }

      newOptions = [
        ...newOptions,
        {
          name: capitalize(inputValue),
        },
      ];
      setOptions(newOptions);
    };
    fetch();
  }, [value, inputValue]);

  return (
    <Autocomplete
      multiple
      color="primary"
      options={options}
      getOptionLabel={(option) => option?.identity?.displayName ?? option.name}
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
          label="Forfattere"
          placeholder="Tilføj Forfatter"
        />
      )}
    />
  );
}
