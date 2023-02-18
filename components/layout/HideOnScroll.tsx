import { useScrollTrigger, Slide } from '@mui/material';
import { ReactElement } from 'react';

const HideOnScroll = ({ children }: { children: ReactElement }) => {
  const trigger = useScrollTrigger({
    target:
      typeof document !== 'undefined'
        ? document.querySelector('#scroll') || undefined
        : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default HideOnScroll;