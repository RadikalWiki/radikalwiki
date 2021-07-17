import { useAuth } from "@nhost/react-auth";
import useSession from "hooks/useSession";
import { useRouter } from "next/router";
import { auth } from "utils/nhost";

export default function Auth({ children }: { children?: any }) {
  const { signedIn } = useAuth();
  const router = useRouter();
  const [_, setSession] = useSession();

  const handleRefresh = async () => {
    await auth.refreshSession();
    if (signedIn != null && !auth.isAuthenticated()) {
      setSession(null);
      router.push("/");
    }
  };
  auth.onAuthStateChanged(handleRefresh);

  return <>{signedIn != null && children}</>;
}
