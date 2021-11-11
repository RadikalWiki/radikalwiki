import { useEffect, createContext, useContext } from "react";

export type Path = { name: string; url: string; icon?: string }[];

export type Session = {
  path?: Path
  event?: { id: string; name: string; shortName: string, folderId: string };
  roles?: string[];
  user?: { id: string; name: string; email: string };
  timeDiff?: number;
};
type SessionSetter = (props: Session | null) => void;

export const SessionContext = createContext<
  [Session | null, SessionSetter] | null
>(null);

export default function useSession(): [Session | null, SessionSetter] {
  const [session, setCtxSession] = useContext(SessionContext) || [null, null];

  useEffect(() => {
    if (!session && setCtxSession && localStorage.session) {
      setCtxSession(JSON.parse(localStorage.session));
    }
  }, [session]);

  const setSession: SessionSetter = (props) => {
    const newSession = !session || props === null ? props : { ...session, ...props };
    localStorage.session = JSON.stringify(newSession);
    if (setCtxSession) setCtxSession(newSession);
  };

  return [session, setSession];
}
