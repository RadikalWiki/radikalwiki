import { NhostClient } from "@nhost/react";

const { auth, functions, graphql, storage } = new NhostClient({
  autoRefreshToken: false,
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND ?? "",
  clientStorageType: "cookie",  
});

export { auth, functions, graphql, storage };

export default { auth, functions, graphql, storage };
