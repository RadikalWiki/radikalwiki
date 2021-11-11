import { Search, Subject, Poll } from "@mui/icons-material";
import {
  Autocomplete,
  Breadcrumbs,
  Card,
  CardContent,
  ClickAwayListener,
  Grow,
  Grid,
  Popper,
  TextField,
  Tooltip,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "gql";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useState } from "react";
import { Link as NextLink } from "comps";
import { useSession, Path } from "hooks";

const getBreadcrumbIcon = (icon: string) => {
  switch (icon) {
    case "root":
      return <Subject />;
    case "poll":
      return <Poll />;
    default:
      throw Error(`Unknown icon: ${icon}`);
  }
};

export default function FolderBreadcrumbs({
  filter,
  setFilter,
}: {
  filter?: string;
  setFilter?: Function;
}) {
  const [session] = useSession();
  const [searchOpen, setSearchOpen] = useState(false);

  const path = [{
      name: "Indhold",
      url: `/folder/${session?.event?.folderId}`,
      icon: "root",
    }].concat(session?.path && typeof session.path != "string" ? session.path as any : [])
  
  return (
    <Stack spacing={1} alignItems="center" direction="row" sx={{ p: 2 }}>
      <Box
        sx={{
          height: 48,
          width: "100%",
          alignItems: "center",
          display: "flex",
        }}
      >
        {searchOpen && setFilter ? (
          <TextField
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Søg"
            autoFocus
            fullWidth
          />
        ) : (
          <Breadcrumbs>
            {path.map((e) => (
              <Link
                key={e.url}
                component={NextLink}
                color="primary"
                href={e.url}
                sx={{ alignItems: "center", display: "flex" }}
              >
                {e.icon ? (
                  <Tooltip title={e.name}>{getBreadcrumbIcon(e.icon)}</Tooltip>
                ) : (
                  <Typography>{e.name}</Typography>
                )}
              </Link>
            ))}
          </Breadcrumbs>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {setFilter && (
        <Box sx={{ height: 48, alignItems: "center", display: "flex" }}>
          <IconButton onClick={() => setSearchOpen(!searchOpen)} size="large">
            <Search />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
}
