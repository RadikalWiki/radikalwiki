import { Search, SearchOff } from '@mui/icons-material';
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
  styled,
} from '@mui/material';
import { fromId } from 'core/path';
import { nodes, query, resolved } from 'gql';
import { useSession } from 'hooks';
import { MimeAvatar, MimeAvatarId, MimeIconId } from 'comps';
import { useRouter } from 'next/router';
import { forwardRef, Fragment, useEffect, useRef, useState } from 'react';
import Breadcrumbs from './BreadCrumbs';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: 'white',
    '&::placeholder': {
      opacity: 1,
    },
    width: '100%',
    padding: theme.spacing(1.5, 1, 1.5, 0),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    transition: theme.transitions.create('width'),
  },
}));

const SearchField = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchMode, setSearchMode] = useState(false);
  const [input, setInput] = useState('');
  const [session, setSession] = useSession();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<
    { id?: string; name?: string; parent: { name?: string } }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [selectIndex, setSelectIndex] = useState(0);

  const goto = async (id?: string) => {
    if (!id) return;
    const path = await fromId(id);
    router.push('/' + path.join('/'));
    setOpen(false);
    setInput('');
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
        setSearchMode(!searchMode);
        inputRef.current?.focus?.();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const autocomplete = (
    <Autocomplete
      sx={{ width: '100%', height: '100%' }}
      open={open}
      inputValue={input}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onKeyDown={(e) => {
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
      }}
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
            <IconButton onClick={() => setSearchMode(false)}>
              <MimeAvatar mimeId="app/search" />
            </IconButton>
            <StyledInput
              inputRef={(input) => {
                // eslint-disable-next-line functional/immutable-data
                inputRef.current = input;
              }}
              placeholder="Søg"
              fullWidth
              inputProps={{
                ...params.inputProps,
                endadornment: isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null,
              }}
            />
            <IconButton onClick={() => setSearchMode(false)}>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <SearchOff />
              </Avatar>
            </IconButton>
          </Stack>
        </SearchBox>
      )}
    />
  );

  return !searchMode ? (
    <SearchBox>
      <Stack direction="row">
        <Breadcrumbs />
        <IconButton onClick={() => setSearchMode(true)}>
          <MimeAvatar mimeId="app/search" />
        </IconButton>
      </Stack>
    </SearchBox>
  ) : (
    autocomplete
  );
};

export default SearchField;
