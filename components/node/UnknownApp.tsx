import React from 'react';
import {
  Avatar,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { HeaderCard } from 'comps';
import { QuestionMark } from '@mui/icons-material';
import { useAuthenticationStatus } from '@nhost/nextjs';

const UnknownApp = () => {
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md>
        <HeaderCard
          title="Dokumentet er ikke tilgængelig"
          avatar={
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
              }}
            >
              <QuestionMark />
            </Avatar>
          }
        >
          <Divider />
          <CardContent>
            <Typography sx={{ mb: 1 }}>
              Dokumentet er ikke tilgængelig.
            </Typography>
            <Typography sx={{ mb: isAuthenticated ? 0 : 1 }}>
              Det kan skyldes, at dokumentet ikke findes, eller at du ikke har
              adgang til det.
            </Typography>
            {!isAuthenticated && (
              <Typography>
                Du kan måske få adgang til dokumentet ved at logge ind i
                toppanelet.
              </Typography>
            )}
          </CardContent>
        </HeaderCard>
      </Grid>
    </Grid>
  );
}

export default UnknownApp;