import React from "react";
import { Typography, CardContent } from "@material-ui/core";
import { HeaderCard } from "comps";

export default function Unverified() {
  return (
    <HeaderCard title="Verificer din e-mail">
      <CardContent>
        <Typography>
          Du skulle gerne have modtaget en verifications e-mail.
        </Typography>
        <Typography>Brug den til at aktivere din bruger.</Typography>
        <Typography>Tjek eventuelt om e-mailen er endt i spam.</Typography>
      </CardContent>
    </HeaderCard>
  );
}
