import React, { Suspense } from 'react';
import { Typography, CardContent, Grid, Avatar } from '@mui/material';
import { AddContentFab, HeaderCard, InvitesUserList } from 'comps';
import { useNode } from 'hooks';
import { Hail } from '@mui/icons-material';
import { useAuthenticationStatus, useUserDisplayName } from '@nhost/nextjs';
import { useId } from 'core/path';

const AddContentFabSuspense = ({ id } : { id: string }) => {
  const node = useNode({ id });
  return <AddContentFab node={node} />;
};

const HomeApp = () => {
  const { isAuthenticated } = useAuthenticationStatus();
  const displayName = useUserDisplayName();

  const id = useId();
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
          <CardContent>
            {(!isAuthenticated && (
              <>
                <Typography>
                  Log ind eller registrer dig til venstre.
                </Typography>
                <Typography>
                  Husk at bruge den email, som du registrerede dig med hos RU.
                </Typography>
              </>
            )) || (
              <>
                <Typography sx={{ mb: 1 }}>Hej {displayName}!</Typography>
                <Typography sx={{ mb: 1 }}>
                  Accepter venligst dine invitationer til grupper og
                  begivenheder.
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
            {id && <AddContentFabSuspense id={id} />}
          </Suspense>
        </Grid>
      )}
    </Grid>
  );
};

export default HomeApp;
