import { Subject } from "@mui/icons-material";
import { Breadcrumbs, Tooltip, Link } from "@mui/material";
import { Link as NextLink } from "comps"
import { useQuery } from "gql";

export default function ContentBreadcrumps({ id }: { id: string }) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });

  return (
    <Breadcrumbs sx={{ p: [2, 0, 2, 2] }}>
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
  );
}
