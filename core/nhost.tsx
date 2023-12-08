import { NhostClient } from '@nhost/nextjs';

const nhost = new NhostClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND,
  region: "eu-central-1"
});

export { nhost };
