import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Stack,
  Skeleton,
  Typography,
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "gql";
import { useSession, usePath } from "hooks";
import { Suspense, useEffect, useState } from "react";
import { Link as NextLink } from "comps";
import { getIcon } from "mime";
import { toWhere } from "core/path";

const BreadcrumbsLink = ({
  path,
  open,
  setOpen,
  index,
}: {
  path: string[];
  open: boolean[];
  setOpen: Function;
  index: number;
}): any => {
  const query = useQuery();
  const node = query.nodes(toWhere(path.slice(0, index)))[0];
  return (
    <Link
      underline="none"
      key={node?.id ?? 0}
      component={NextLink}
      sx={{ alignItems: "center", display: "flex" }}
      color="primary"
      href={`/${path.slice(0, index).join("/")}`}
      onMouseEnter={() => {
        const newOpen = [
          ...open.slice(0, index),
          true,
          ...new Array(path.length - index ? path.length - index : 0).fill(
            false
          ),
        ];
        setOpen(newOpen);
      }}
    >
      <>
        {getIcon(node?.mimeId!)}
        <Collapse orientation="horizontal" in={open[index]}>
          <Typography noWrap color="secondary" sx={{ ml: 0.5 }}>
            {node?.name ?? "Ukendt"}
          </Typography>
        </Collapse>
      </>
    </Link>
  );
};

const HomeLink = ({
  path,
  open,
  setOpen,
}: {
  path: string[];
  open: boolean[];
  setOpen: Function;
}) => {
  return (
    <Link
      underline="none"
      key={-1}
      component={NextLink}
      sx={{ alignItems: "center", display: "flex" }}
      color="primary"
      href="/"
      onMouseEnter={() => {
        const newOpen = [
          true,
          ...new Array(path.length ? path.length : 0).fill(false),
        ];
        setOpen(newOpen);
      }}
    >
      <>
        {getIcon("wiki/home")}
        <Collapse orientation="horizontal" in={open[0]}>
          <Typography noWrap color="secondary" sx={{ ml: 0.5 }}>
            {"Hjem"}
          </Typography>
        </Collapse>
      </>
    </Link>
  );
};

const range = (start: number, end: number) =>
  Array.from(Array(end + 1).keys()).slice(start);

export default function Breadcrumbs() {
  const [session] = useSession();
  const path = usePath();
  const [open, setOpen] = useState<boolean[]>([]);

  const initOpen = [...new Array(path.length).fill(false), true];

  useEffect(() => {
    if (path.length > 0) setOpen(initOpen);
  }, [path]);

  const prefix = session?.prefix?.path ?? [];

  const sliced = path.slice(0, prefix.length);
  const start =
    prefix.length !== 0 && sliced.length === prefix.length && sliced.every((v, i) => v === prefix[i])
      ? prefix.length
      : 1;

  console.log(start)

  const home = <HomeLink path={path} open={open} setOpen={setOpen} />;
  const links = range(start, path.length).map((index) => (
    <Suspense
      key={path.slice(0, index).join("/")}
      fallback={<Skeleton variant="circular" width={20} key={0} />}
    >
      <BreadcrumbsLink
        path={path}
        open={open}
        setOpen={setOpen}
        index={index}
      />
    </Suspense>
  ));

  return (
    <Stack sx={{ p: 2 }}>
      <Box
        onMouseLeave={() => {
          setOpen(initOpen);
        }}
        sx={{ height: 48, alignItems: "center", display: "flex" }}
      >
        <MuiBreadcrumbs>{[home, ...links]}</MuiBreadcrumbs>
      </Box>
    </Stack>
  );
}
