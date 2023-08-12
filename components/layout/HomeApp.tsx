import React, { Suspense } from 'react';
import {
  Typography,
  CardContent,
  Grid,
  Avatar,
  Card,
  useMediaQuery,
} from '@mui/material';
import { AddContentFab, HeaderCard, HomeList, InvitesUserList } from 'comps';
import { useNode, usePath } from 'hooks';
import { Hail } from '@mui/icons-material';
import { useAuthenticationStatus, useUserDisplayName } from '@nhost/nextjs';

const AddContentFabSuspense = () => {
  const node = useNode();
  return <AddContentFab node={node} />;
};

const HomeApp = () => {
  const { isAuthenticated } = useAuthenticationStatus();
  const displayName = useUserDisplayName();
  const largeScreen = useMediaQuery('(min-width:1200px)');

  return (
    <Grid direction={largeScreen ? 'row-reverse' : 'row'} container spacing={1}>
      {isAuthenticated && (
        <Grid item xs={12} lg={4}>
          <InvitesUserList />
          <Suspense fallback={null}>
            <AddContentFabSuspense />
          </Suspense>
        </Grid>
      )}
      <Grid item xs={12} lg>
        {isAuthenticated && !largeScreen ? (
          <Card>
            <HomeList />
          </Card>
        ) : (
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
        )}
      </Grid>
    </Grid>
  );
};

export default HomeApp;
