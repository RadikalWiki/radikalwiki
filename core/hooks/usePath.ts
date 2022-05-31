import { useRouter } from "next/router";

const usePath = () => {
  const router = useRouter();
  const query = router.query;
  return Array.isArray(query.path) ? query.path : query.path ? [query.path] : [];
}


export default usePath