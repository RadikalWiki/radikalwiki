import { useNode } from "hooks";
import { PermList } from ".";

export default function PermApp() {
  const { query } = useNode();
  return <PermList id={query?.id} />;
}
