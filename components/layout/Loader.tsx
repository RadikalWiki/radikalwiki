import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { Box } from "@mui/system";
import { MimeLoader, AppLoader, HomeApp } from "comps";

export default function Loader({ app }: { app?: string }) {
  const router = useRouter();

  if (!router.query.app && app === "home") {
    return <HomeApp />;
  } else if (router.query.app || app) {
    return <AppLoader app={(router.query.app as string) ?? app} />;
  } else {
    return (
      <Suspense
        fallback={
          <Box
            sx={{
              mt: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <MimeLoader />
      </Suspense>
    );
  }
}
