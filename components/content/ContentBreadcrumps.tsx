import { Subject } from "@mui/icons-material";
import { Breadcrumbs, Tooltip, Link, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Link as NextLink } from "comps";
import { useQuery } from "gql";

export default function ContentBreadcrumps({ id }: { id: string }) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });

  return (
    <Stack sx={{ p: 2 }}>
      <Box sx={{ height: 48, alignItems: "center", display: "flex" }}>
        <Breadcrumbs>
          <Link
            component={NextLink}
            sx={{ alignItems: "center", display: "flex" }}
            color="primary"
            href="/folder"
          >
            <Tooltip title="Indhold">
              <Subject />
            </Tooltip>
          </Link>
          {content?.parent ? (
            <Link
              component={NextLink}
              color="primary"
              href={`/content/${content?.parent.id}`}
            >
              {content?.parent.name || ""}
            </Link>
          ) : (
            content?.folder?.parentId && (
              <Link
                component={NextLink}
                color="primary"
                href={`/folder/${content?.folder.id}`}
              >
                {content?.folder.name || ""}
              </Link>
            )
          )}
          <Link component={NextLink} color="primary" href={`/content/${id}`}>
            {content?.name || ""}
          </Link>
        </Breadcrumbs>
      </Box>
    </Stack>
  );
}
