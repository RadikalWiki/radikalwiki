import { Search, Subject } from "@mui/icons-material";
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
import { useState } from "react";
import { Link as NextLink } from "comps";

export default function FolderCard({
  id,
  filter,
  setFilter,
}: {
  id: string;
  filter: string;
  setFilter: Function;
}) {
  const query = useQuery();
  const folder = query.folders_by_pk({ id });
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Stack spacing={1} alignItems="center" direction="row" sx={{ p: 2 }}>
      <Box sx={{ height: 48, width: "100%", alignItems: "center", display: "flex" }}>
        {searchOpen ? (
          <TextField
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Søg"
            autoFocus
            fullWidth
          />
        ) : (
          <Breadcrumbs>
            <Link
              component={NextLink}
              color="primary"
              href={`/folder`}
              sx={{ alignItems: "center", display: "flex" }}
            >
              <Tooltip title="Indhold">
                <Subject />
              </Tooltip>
            </Link>
            {folder?.parent && folder?.parent.parentId && (
              <Link
                component={NextLink}
                color="primary"
                href={`/folder/${folder?.parent.id}`}
              >
                <Typography>{folder?.parent.name}</Typography>
              </Link>
            )}
            {folder?.parent && (
              <Link component={NextLink} color="primary" href={`/folder/${id}`}>
                <Typography>{folder?.name}</Typography>
              </Link>
            )}
          </Breadcrumbs>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ height: 48, alignItems: "center", display: "flex" }}>
        <IconButton onClick={() => setSearchOpen(!searchOpen)} size="large">
          <Search />
        </IconButton>
      </Box>
    </Stack>
  );
}
