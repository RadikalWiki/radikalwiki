import { NhostClient } from "@nhost/react";

const nhost = new NhostClient({
  autoRefreshToken: false,
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND ?? "",
  clientStorageType: "cookie",  
});

export { nhost };