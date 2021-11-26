import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useLazyQuery, useMutation,  query, resolved, mutation, useSubscription, events_set_input } from "gql";
import { useSession } from "hooks";

export default function SpeakerTextField() {
  const [value, setValue] = useState<any>(null);
  const [session] = useSession();
  const subscription = useSubscription();
  const [getSpeakerlists, { isLoading, data: speakerlists }] = useLazyQuery(
    (query) => {
      return query
        .events_by_pk({ id: session?.event?.id })
        ?.speakerlists()
        .map(({ id, name }) => ({ id, name, new: false }));
    }
  );

  const [updateEvent] = useMutation(
    (mutation, args: any) => {
      return mutation.update_events_by_pk({ pk_columns: { id: session?.event?.id }, _set: args })?.id;
    },
    //{
    //  refetchQueries: [query.contents_by_pk({ id: contentId })],
    //}
  );
	
  const event = subscription.events_by_pk({
    id: session?.event?.id,
  });
  const speakerlist = event?.speakerlist;
  const [options, setOptions] = useState<any[]>([]);
  const [inputValue, setInputValue] =
    useState<{ name: string; new: boolean }>();

  useEffect(() => {
    const fetch = async () => {
      //const speakerlists = await resolved(() => {
      //  return query
      //    .events_by_pk({ id: session?.event?.id })
      //    ?.speakerlists()
      //    .map(({ id, name }) => ({ id, name, new: false }));
      //});
			await getSpeakerlists();
      let newOpts: any[] = speakerlists ? speakerlists : [];

      console.log("effect");
      console.log(newOpts);
      newOpts = !newOpts.some((opt) => inputValue?.name == opt.name)
        ? [...newOpts, inputValue]
        : newOpts;

      setOptions(newOpts);
    };
    fetch();
  }, [inputValue]);

  return (
    <Autocomplete
      sx={{ m: 1 }}
      color="primary"
      options={options}
      getOptionLabel={(option) => option?.name ?? ""}
      isOptionEqualToValue={(option, value) => option?.name == value?.name}
      defaultValue={speakerlist}
      value={value}
      filterSelectedOptions
      autoComplete
      autoHighlight
      onChange={async (_, newValue) => {
        console.log(value);
        console.log(options);

        // Delete
        if (newValue == null) {
          await resolved(() => {
            return mutation.delete_speakerlists_by_pk({
              id: value?.id,
            })?.id;
          });
          //console.log(value)
          //console.log(options.filter((opt) => opt?.id !== value.id))
          setOptions(options.filter((opt) => opt?.id !== value.id));
          setValue(newValue);
          return;
        }

				let newOpt: any
        // New
        if (newValue?.new) {
          const timerId = await resolved(() => {
            return mutation.insert_timers_one({
              object: { eventId: session?.event?.id },
            })?.id;
          });
          const speakerlistId = await resolved(() => {
            return mutation.insert_speakerlists_one({
              object: {
                name: newValue.name,
                eventId: session?.event?.id,
                timerId,
              },
            })?.id;
          });
          newOpt = { id: speakerlistId, name: newValue.name, new: false };
          setOptions([newOpt, ...options]);
        } else {
					newOpt = newValue
				}
        // Old
        setValue(newOpt);
				updateEvent({ args: { speakerlistId: newOpt.id } })
        //setOptions(
        //  newValue && !options.some((opt) => newValue.name == opt.name)
        //    ? [newValue, ...options]
        //    : options
        //);
      }}
      onInputChange={(_, newInputValue) => {
        //setOptions(
        //  newInputValue && !options.some((opt) => newInputValue == opt?.name)
        //    ? [{ name: newInputValue, new: true }, ...options]
        //    : options
        //);
        setInputValue({ name: newInputValue, new: true });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          color="primary"
          variant="outlined"
          label="Talerlister"
          placeholder="Vælg talerliste"
        />
      )}
    />
  );
}
