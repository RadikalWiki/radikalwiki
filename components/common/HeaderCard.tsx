import React from 'react';
import { Card, CardHeader, Typography } from '@mui/material';

const HeaderCard = ({
  children,
  title,
  avatar,
  subtitle,
  action,
}: {
  children?: any;
  title: string;
  avatar?: any;
  subtitle?: string;
  action?: any;
}) => (
  <Card sx={{ m: 0 }}>
    <CardHeader
      action={action}
      subheader={subtitle}
      title={<Typography>{title}</Typography>}
      avatar={avatar}
    />
    {children}
  </Card>
);

export default HeaderCard;
