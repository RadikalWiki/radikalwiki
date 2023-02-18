import React, { useState } from 'react';
import { SessionContext } from 'hooks';

const SessionProvider = ({ children }: { children?: any }) => {
  const [session, setSession] = useState<any>(null);

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;