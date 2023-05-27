import { Slide } from '@mui/material';
import { useEffect, useState, UIEvent, EventHandler, ReactNode } from 'react';

const HideOnScroll = ({ children }: { children: JSX.Element }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const scroll = document.querySelector('#scroll');
    scroll?.addEventListener('scroll', handleScroll);
    return () => scroll?.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  const handleScroll = (event: Event) => {
    const newScrollPosition = (event.target as HTMLDivElement)?.scrollTop;
    if (Math.abs(scrollPosition - newScrollPosition) > 4) {
      setShow(scrollPosition > newScrollPosition);
    }
    setScrollPosition(newScrollPosition);
  };

  return (
    <Slide direction="up" in={show}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
