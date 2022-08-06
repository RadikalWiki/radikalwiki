import { Search } from "@mui/icons-material";
import {
  alpha,
  Autocomplete,
  CircularProgress,
  InputBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { fromId } from "core/path";
import { useLazyQuery } from "gql";
import { useSession } from "hooks";
import { MimeIcon } from "mime";
import { useRouter } from "next/router";
import { useState } from "react";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "200px",
      "&:focus": {
        width: "400px",
      },
    },
  },
}));

export default function SearchField() {
  const router = useRouter();
  const [session] = useSession()
  const [open, setOpen] = useState(false);
  const [search, { data: data, isLoading }] = useLazyQuery(
    (query, name: string) => {
      return query
        .nodes({ where: { _and: [{ contextId: { _eq: session?.prefix?.id } }, { name: { _ilike: `%${name}%` } }] }, limit: name ? 10 : 0 })
        .map(({ id, name, mimeId, parent }) => ({ id, name, mimeId, parent: { name: parent?.name } }));
    }
  );
  const options = data ?? [];

  const goto = (id: string) => async () => {
    const path = await fromId(id);

    router.push("/" + path.join("/"));
    setOpen(false);
  }

  return (
    <Autocomplete
      sx={{ width: 500 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      noOptionsText="Intet resultat"
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name ?? ""}
      options={options}
      loading={isLoading}
      onInputChange={(_, value) => search({ args: value })}
      renderOption={(props, option) => (
        <ListItemButton onClick={goto(option.id)}>
          <ListItemIcon>
            <MimeIcon node={option as any} />
          </ListItemIcon>
          <ListItemText secondary={option.parent.name} >{option.name}</ListItemText>
        </ListItemButton>
      )}
      renderInput={(params) => (
        <SearchBox ref={params.InputProps.ref}>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Søg…"
            inputProps={{
              ...params.inputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        </SearchBox>
        // <SearchBox key="search" {...params}>
        //   <SearchIconWrapper>
        //     <Search />
        //   </SearchIconWrapper>
        //   <StyledInputBase
        //     placeholder="Søg…"
        //     inputProps={{
        //       endAdornment: (
        //         <>
        //           {loading ? (
        //             <CircularProgress color="inherit" size={20} />
        //           ) : null}
        //           {params.InputProps.endAdornment}
        //         </>
        //       ),
        //     }}
        //   />
        // </SearchBox>
      )}
    />
  );
}
/*
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
        */
