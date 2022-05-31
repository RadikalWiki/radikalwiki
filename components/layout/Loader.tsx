import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { Box } from "@mui/system";
import { MimeLoader, AppLoader } from "comps";

export default function Loader({ app }: { app?: string }) {
  const router = useRouter();
  return router.query.app || app ? (
    <AppLoader app={(router.query.app as string) ?? app} />
  ) : (
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
