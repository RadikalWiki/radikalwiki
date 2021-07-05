import React from "react";
import { Typography, CardContent } from "@material-ui/core";
import { HeaderCard } from "comps";
import { useSession } from "hooks";
import { USER_GET_PROFILE } from "gql";
import { useQuery } from "@apollo/client";

export default function Login() {
  const [session] = useSession();
  const { loading, data, error } = useQuery(USER_GET_PROFILE, {
    variables: { id: session?.user.id },
  });

  const user = data?.user;

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
          (session?.displayName === session?.user.email && (
            <>
              <Typography>
                Du har brugt e-mailen {session?.user.email}.
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
              <Typography>Heyo {session?.displayName}!</Typography>
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
