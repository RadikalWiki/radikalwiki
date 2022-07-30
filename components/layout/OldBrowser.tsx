import React, { Suspense } from "react";
import { Typography, CardContent, Avatar, Divider, List, ListItem, ListItemAvatar } from "@mui/material";
import { BrowserNotSupported } from "@mui/icons-material";
import { Container } from "@mui/system";
import { HeaderCard } from "comps/common";

export default function OldBrowser() {
  return (
    <Container>
      <HeaderCard
        title="Forældet Browser"
        avatar={
          <Avatar
            sx={{
              bgcolor: (t) => t.palette.secondary.main,
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
              Din browser er ikke understøttet af RadikalWiki.
            </Typography>
            <Typography sx={{ mb: 1 }}>
							Opdater venligst din browser, eller installer en understøttet browser:
            </Typography>
            <Typography sx={{ mb: 1 }}>
							Fx. <a href="https://firefox.com">Firefox 🦊</a>
            </Typography>
          </>
        </CardContent>
      </HeaderCard>
    </Container>
  );
}
