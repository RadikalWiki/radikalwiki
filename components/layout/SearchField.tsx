import { SearchOff } from '@mui/icons-material';
import {
  alpha,
  Autocomplete,
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  InputBaseProps,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material';
import { query, resolved } from 'gql';
import { useLink, useSession } from 'hooks';
import { MimeAvatar, MimeIconId, Breadcrumbs } from 'comps';
import {
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';

const SearchBoxRef = (props: any, ref?: any) => (
  <Box
    {...props}
    ref={ref}
    sx={{
      position: 'relative',
      borderRadius: (t) => t.shape.borderRadius,
      backgroundColor: (t) => alpha(t.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: (t) => alpha(t.palette.common.white, 0.25),
      },
      marginLeft: {
        sm: (t) => t.spacing(1),
        md: 0,
      },
      width: '100%',
    }}
  />
);

const SearchBox = forwardRef(SearchBoxRef);

const StyledInputRef = (props: InputBaseProps, ref?: any) => (
  <InputBase
    {...props}
    ref={ref}
    sx={{
      '& .MuiInputBase-input': {
        color: 'white',
        '&::placeholder': {
          opacity: 1,
        },
        width: '100%',
        padding: (t) => t.spacing(1.5, 1, 1.5, 0),
        // vertical padding + font size from searchIcon
        //paddingLeft: `calc(1em + ${theme.spacing(6)})`,
        transition: (t) => t.transitions.create('width'),
      },
    }}
  />
);

const StyledInput = forwardRef(StyledInputRef);

const SearchField = () => {
  const link = useLink();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchMode, setSearchMode2] = useState(false);
  const [input, setInput] = useState('');
  const [session, setSession] = useSession();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<
    { id?: string; name?: string; parent: { name?: string } }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [selectIndex, setSelectIndex] = useState(0);
  const [_, startTransition] = useTransition();

  const goto = async (id?: string) => {
    if (!id) return;
    link.id(id);
    setOpen(false);
    setInput('');
  };

  const setSearchMode = (a: any) => {
    console.trace(a), setSearchMode2(a);
  };

  const search = async (name: string) => {
    setIsLoading(true);
    const nodes = await resolved(() =>
      query
        .nodes({
          where: {
            _and: [
              { mime: { hidden: { _eq: false } } },
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
        }))
    );
    setOptions(nodes);
    setIsLoading(false);
  };

  useEffect(() => {
    setSelected(options?.[selectIndex]?.id);
  }, [options, selectIndex]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey === true && event.key === 'k') {
        event.preventDefault();
        startTransition(() => setSearchMode(!searchMode));
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [searchMode]);

  const autocomplete = (
    <Autocomplete
      sx={{ width: '100%', height: '100%' }}
      open={open}
      inputValue={input}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onKeyDown={(e) =>
        startTransition(() => {
          if (e.key === 'ArrowDown')
            setSelectIndex(
              options.length - 1 > selectIndex ? selectIndex + 1 : selectIndex
            );
          if (e.key === 'ArrowUp')
            setSelectIndex(selectIndex > 0 ? selectIndex - 1 : selectIndex);
          if (e.key === 'Enter') {
            setSearchMode(false);
            if (options?.[selectIndex]?.id) goto(options?.[selectIndex]?.id);
          }
          const scroll = document.querySelector(
            `#o${options?.[selectIndex]?.id}`
          );
          scroll?.scrollIntoView();
        })
      }
      noOptionsText="Intet resultat"
      loadingText="Loader..."
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name ?? ''}
      options={options}
      loading={isLoading}
      onInputChange={async (e, value) => {
        if (e) {
          setInput(value);
          setSelectIndex(0);
          await search(value);
        }
      }}
      renderOption={(props, option) => (
        <Fragment key={option.id}>
          <ListItemButton
            key={`o${option.id}`}
            selected={selected === option.id}
            onClick={() => {
              setSearchMode(false);
              goto(option.id);
            }}
          >
            {option.id && (
              <ListItemIcon sx={{ color: 'secondary.main' }}>
                <MimeIconId id={option?.id} />
              </ListItemIcon>
            )}
            <ListItemText secondary={option.parent?.name}>
              {option.name}
            </ListItemText>
          </ListItemButton>
          <Divider />
        </Fragment>
      )}
      PaperComponent={(props) => (
        <Paper {...props} sx={{ height: '100%' }}>
          <List dense>
            <Divider />
            {props.children}
          </List>
        </Paper>
      )}
      renderInput={(params) => (
        <SearchBox ref={params.InputProps.ref}>
          <Stack direction="row">
            <IconButton>
              <MimeAvatar mimeId="app/search" />
            </IconButton>
            <StyledInput
              inputRef={(input) => {
                // eslint-disable-next-line functional/immutable-data
                inputRef.current = input;
              }}
              autoFocus
              placeholder="Søg"
              fullWidth
              inputProps={{
                ...params.inputProps,
                endadornment: isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null,
              }}
            />
            <IconButton
              onClick={() => startTransition(() => setSearchMode(false))}
            >
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <SearchOff />
              </Avatar>
            </IconButton>
          </Stack>
        </SearchBox>
      )}
    />
  );

  return searchMode ? (
    autocomplete
  ) : (
    <SearchBox>
      <Stack direction="row">
        <Breadcrumbs />
        <IconButton onClick={() => startTransition(() => setSearchMode(true))}>
          <MimeAvatar mimeId="app/search" />
        </IconButton>
      </Stack>
    </SearchBox>
  );
};

export default SearchField;
