import React from "react";
import { Typography, CardContent, Avatar, Divider } from "@mui/material";
import { BrowserNotSupported } from "@mui/icons-material";
import { Container } from "@mui/system";
import { HeaderCard } from "comps/common";
import platform from 'platform';

export default function OldBrowser() {
  return (
    <Container>
      <HeaderCard
        title="Forældet Browser"
        avatar={
          <Avatar
            sx={{
              bgcolor: (t) => t.palette.primary.main,
            }}
          >
            <BrowserNotSupported />
          </Avatar>
        }
      >
        <Divider />
        <CardContent>
          <>
            <Typography sx={{ mb: 1 }}>
              {`Din browser "${platform}" er ikke understøttet af RadikalWiki.`}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Opdater venligst din browser, eller installer en understøttet
              browser.
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Skamløst forslag: <a href="https://firefox.com">Firefox 🦊</a>
            </Typography>
            <Typography  sx={{ mb: 1, fontWeight: 'bold' }}>
              OBS: På iOS er det kun muligt at bruge Safari. (Opdater Safari!)
            </Typography>
            <Typography sx={{ fontStyle: "italic", mb: 1 }} >
              Chrome og Firefox er blot et skin over Safari på iOS
            </Typography>
          </>
        </CardContent>
      </HeaderCard>
    </Container>
  );
}
