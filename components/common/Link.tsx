import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  NextLinkProps;

const Link = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const { as, href, ...other } = props;

    return (
      <NextLink href={href} as={as}>
        <a {...other} ref={ref} />
      </NextLink>
    );
  }
);

export default Link;
