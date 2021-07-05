import { useEffect, createContext, useContext } from "react";

export const SessionContext = createContext<any>(null);

export default function useSession() {
  const [session, setSession] = useContext(SessionContext);

  useEffect(() => {
    if (!session && localStorage.session) {
      setSession(JSON.parse(localStorage.session));
    }
  }, [session]);

  const mutateSession = (props: any) => {
    const newSession =
      !session || props === null ? props : { ...session, ...props };
    localStorage.session = JSON.stringify(newSession);
    setSession(newSession);
  };

  return [session, mutateSession];
}
