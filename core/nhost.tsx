import { NhostClient } from '@nhost/nextjs';

const nhost = new NhostClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION
})

export { nhost };
