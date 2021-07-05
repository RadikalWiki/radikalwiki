import React, { useEffect, useState, createContext, useContext } from "react";
import { SessionContext } from "hooks/useSession";

export default function SessionProvider({ children }: { children?: any }) {
  const [session, setSession] = useState<any>(null);

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  );
}
