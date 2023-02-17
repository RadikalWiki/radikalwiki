import React, { useEffect } from 'react';
import {
  Typography,
  CardContent,
  Avatar,
  Divider,
  Container,
} from '@mui/material';
import { HeaderCard } from 'comps';
import { MarkEmailRead } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuthenticationStatus } from '@nhost/nextjs';

export default function Unverified() {
  const { push } = useRouter();
  const { isAuthenticated } = useAuthenticationStatus();

  useEffect(() => {
    if (isAuthenticated) {
      push('/');
    }
  }, [isAuthenticated]);

  return (
    <Container>
      <HeaderCard
        title="Verificer din e-mail"
        avatar={
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
            }}
          >
            <MarkEmailRead />
          </Avatar>
        }
      >
        <Divider />
        <CardContent>
          <Typography>
            Du skulle gerne have modtaget en verifications e-mail.
          </Typography>
          <Typography>Brug den til at aktivere din bruger.</Typography>
          <Typography>Tjek eventuelt om e-mailen er endt i spam.</Typography>
        </CardContent>
      </HeaderCard>
    </Container>
  );
}
