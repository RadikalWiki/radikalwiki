import React from "react";
import { Typography, CardContent } from "@mui/material";
import { HeaderCard } from "comps";
import { useSession } from "hooks";

export default function Index() {
  const [session] = useSession();

  return (
    <HeaderCard title="Velkommen til RadikalWiki">
      <CardContent>
        {(session === null && (
          <>
            <Typography>Log ind eller registrer dig i toppanelet.</Typography>
            <Typography>
              Husk at bruge den e-mail, som du registrerede dig med hos RU.
            </Typography>
          </>
        )) ||
          (session?.user?.name === session?.user?.email && (
            <>
              <Typography>
                Du har brugt e-mailen {session?.user?.email}.
              </Typography>
              <Typography>
                Denne e-mail er ikke registreret i RUs medlemsregister.
              </Typography>
              <Typography>
                Kontakt venligst ru@radikalungdom.dk for at få oplyst den
                e-mail, som er registreret hos RU.
              </Typography>
            </>
          )) || (
            <>
              <Typography>Heyo {session?.user?.name}!</Typography>
              <Typography>
                Vælg en begivenhed i toppanelet for at begynde.
              </Typography>
              <Typography>
                Herefter vil du få adgang til afstemninger, de politiske
                dokumenter og talerlisten.
              </Typography>
            </>
          )}
      </CardContent>
    </HeaderCard>
  );
}
