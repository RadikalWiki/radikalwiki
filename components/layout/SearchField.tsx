import { Search } from "@mui/icons-material";
import {
  alpha,
  Autocomplete,
  CircularProgress,
  Divider,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import { fromId } from "core/path";
import { nodes, query, resolved } from "gql";
import { useSession } from "hooks";
import { MimeIcon } from "mime";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";

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
  const [session] = useSession();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<nodes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [selectIndex, setSelectIndex] = useState(0);
  const ref = useRef<any>(null);

  const goto = (id: string) => async () => {
    const path = await fromId(id);

    router.push("/" + path.join("/"));
    setOpen(false);
  };

  const search = async (name: string) => {
    setIsLoading(true);
    const nodes = await resolved(() => {
      return query
        .nodes({
          where: {
            _and: [
              { contextId: { _eq: session?.prefix?.id } },
              { name: { _ilike: `%${name}%` } },
            ],
          },
          limit: name ? 10 : 0,
        })
        .map(({ id, name, mimeId, parent }) => ({
          id,
          name,
          mimeId,
          parent: { name: parent?.name },
        }));
    });
    setOptions(nodes as any);
    setIsLoading(false);
  };

  useEffect(() => {
    setSelected(options?.[selectIndex]?.id);
  }, [options, selectIndex]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey === true && event.key === "k") {
        event.preventDefault();
        ref.current?.focus?.();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Autocomplete
      sx={{ width: "100%", maxWidth: "750px", height: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown")
          setSelectIndex(
            options.length - 1 > selectIndex ? selectIndex + 1 : selectIndex
          );
        if (e.key === "ArrowUp")
          setSelectIndex(selectIndex > 0 ? selectIndex - 1 : selectIndex);
        if (e.key === "Enter") {
          if (options?.[selectIndex]?.id) goto(options?.[selectIndex]?.id)();
        }
        const scroll = document.querySelector(
          `#o${options?.[selectIndex]?.id}`
        );
        scroll?.scrollIntoView();
      }}
      noOptionsText="Intet resultat"
      loadingText="Loader..."
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name ?? ""}
      options={options}
      loading={isLoading}
      onInputChange={async (_, value) => {
        setSelectIndex(0);
        await search(value);
      }}
      renderOption={(props, option) => (
        <Fragment key={option.id}>
          <ListItemButton
            key={`o${option.id}`}
            selected={selected === option.id}
            onClick={goto(option.id)}
          >
            <ListItemIcon>
              <MimeIcon node={option as any} />
            </ListItemIcon>
            <ListItemText secondary={option.parent?.name}>
              {option.name}
            </ListItemText>
          </ListItemButton>
          <Divider />
        </Fragment>
      )}
      PaperComponent={(props) => {
        return (
          <Paper {...props} sx={{ height: "100%" }}>
            <List dense>
              <Divider />
              {props.children}
            </List>
          </Paper>
        );
      }}
      renderInput={(params) => (
        <SearchBox ref={params.InputProps.ref}>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            inputRef={(input) => {
              // eslint-disable-next-line functional/immutable-data
              ref.current = input;
            }}
            placeholder="Søg…"
            inputProps={{
              ...params.inputProps,
              endadornment: isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : null,
            }}
          />
        </SearchBox>
      )}
    />
  );
}
