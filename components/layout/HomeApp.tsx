import React, { Suspense } from 'react';
import { Typography, CardContent, Grid, Avatar, Divider } from '@mui/material';
import { AddContentFab, HeaderCard, InvitesUserList } from 'comps';
import { useNode } from 'hooks';
import { Hail } from '@mui/icons-material';
import { useAuthenticationStatus, useUserDisplayName } from '@nhost/nextjs';

const AddContentFabSuspense = () => {
  const node = useNode();
  return <AddContentFab node={node} />;
};

export default function HomeApp() {
  const { isAuthenticated } = useAuthenticationStatus();
  const displayName = useUserDisplayName();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md>
        <HeaderCard
          title="Velkommen til RadikalWiki"
          avatar={
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
              }}
            >
              <Hail />
            </Avatar>
          }
        >
          <Divider />
          <CardContent>
            {(!isAuthenticated && (
              <>
                <Typography>
                  Log ind eller registrer dig i toppanelet.
                </Typography>
                <Typography>
                  Husk at bruge den e-mail, som du registrerede dig med hos RU.
                </Typography>
              </>
            )) || (
              <>
                <Typography sx={{ mb: 1 }}>Hej {displayName}!</Typography>
                <Typography sx={{ mb: 1 }}>
                  Accepter venligst dine invitationer til grupper og
                  begivenheder.
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Det vil give dig mulighed til at kunne vælge begivenhederne i
                  toppanelet og få adgang til mappen, afstemninger og
                  talerlisten.
                </Typography>
                <Typography>
                  Hvis der ikke forekommer nogen invitationer, så har du højst
                  sandsynligt brugt en anden email, end den som er registreret
                  ved Radikal Ungdom.
                </Typography>
              </>
            )}
          </CardContent>
        </HeaderCard>
      </Grid>
      {isAuthenticated && (
        <Grid item xs={12} md={4}>
          <InvitesUserList />
          <Suspense fallback={null}>
            <AddContentFabSuspense />
          </Suspense>
        </Grid>
      )}
    </Grid>
  );
}
