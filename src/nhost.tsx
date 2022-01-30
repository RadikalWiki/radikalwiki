import { createClient } from "nhost-js-sdk";

const config = {
  baseURL: process.env.NEXT_PUBLIC_NHOST_BACKEND || "",
};

const { auth, storage } = createClient(config);

export { auth, storage };
