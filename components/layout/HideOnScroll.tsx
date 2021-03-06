import { useScrollTrigger, Slide } from "@mui/material";

export default function HideOnScroll({ children }: any) {
  const trigger = useScrollTrigger({
    target:
      typeof document !== "undefined"
        ? document.querySelector("#scroll") || undefined
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
