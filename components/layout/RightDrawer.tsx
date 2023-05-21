import {
  Drawer as MuiDrawer,
  Typography,
  IconButton,
  useMediaQuery,
  alpha,
  Toolbar,
} from '@mui/material';
import {
  Close,
} from '@mui/icons-material';
import { useSession, usePath, useNode, useLink } from 'hooks';
import { fromId } from 'core/path';
import {
  ContentToolbar,
  MimeAvatarId,
} from 'comps';
import { resolved } from 'gql';
import { useState, startTransition, useEffect } from 'react';
import { drawerWidth } from 'core/constants';
import { Box } from '@mui/system';

const Drawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const link = useLink();
  const [session, setSession] = useSession();
  const largeScreen = useMediaQuery('(min-width:1200px)');
  const path = usePath();
  const home = path.length === 0;
  const id = session?.nodeId ?? session?.prefix?.id;
  const node = useNode({
    id,
  });
  const query = node.useQuery();

  const [listOpen, setListOpen] = useState<boolean[][]>([]);

  const contextId = session?.prefix?.id ?? node?.contextId;

  const handleCurrent = async () => {
    const id = await resolved(
      () =>
        query?.context?.relations({
          where: { name: { _eq: 'active' } },
        })?.[0]?.nodeId,
      { noCache: true }
    );
    link.id(id ?? contextId!);
    setOpen(false);
  };

  useEffect(() => {
    if (session?.prefix === undefined && !home) {
      Promise.all([
        fromId(contextId),
        resolved(() => {
          const node = query?.context;
          return {
            id: node?.id,
            name: node?.name ?? '',
            mime: node?.mimeId!,
            namespace: node?.namespace,
          };
        }),
      ]).then(([path, prefix]) => {
        startTransition(() => {
          setSession({
            prefix: {
              ...prefix,
              path,
            },
          });
        });
      });
    }
  }, [session, setSession]);

  return (
    <MuiDrawer
      sx={
        largeScreen
          ? {
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                height: `calc(100% - 57px)`,
                boxSizing: 'border-box',
              },
            }
          : {
              position: 'absolute',
              width: '100%',
              '& .MuiDrawer-paper': {
                width: '100%',
              },
            }
      }
      anchor="right"
      variant={largeScreen ? 'permanent' : 'persistent'}
      open={open || largeScreen}
      onMouseLeave={() => setOpen(false)}
    >
      <Box
        sx={{
          // Disable scroll (Firefox)
          scrollbarWidth: 'none',
          // Disable scroll (Webkit)
          '::-webkit-scrollbar': {
            display: 'none',
          },
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          height: 'calc(100vh - 64px)',
        }}
      >
        <Toolbar
          onClick={() => {
            if (!home) {
              //router.push(`/${(session?.prefix?.path ?? path).join('/')}`);
              setOpen(false);
            }
          }}
          sx={{
            cursor: 'pointer',
            ml: largeScreen ? -2 : 0,
            bgcolor: 'primary.main',
            '&:hover, &:focus': {
              bgcolor: (t) => alpha(t.palette.primary.main, 0.9),
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <MimeAvatarId id={id!} />
          <Typography sx={{ pl: 1 }} color="#fff">
            {node?.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!largeScreen && (
            <IconButton
              sx={{ color: '#fff' }}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              <Close />
            </IconButton>
          )}
        </Toolbar>
        <ContentToolbar node={node} />
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
