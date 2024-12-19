import Link from "next/link";
import React, { ReactNode } from "react";

type LinkPropsType = {
  href: string;
  classes?: string;
};

const LinkElement = ({ href, classes, children }: LinkPropsType & { children: ReactNode }) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full ${classes}`}
    >
      {children}
    </Link>
  );
};

export default LinkElement;
