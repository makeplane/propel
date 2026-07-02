import type * as React from "react";

export type SolidIconProps = React.SVGProps<SVGSVGElement>;

export function SolidIcon(props: SolidIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  );
}
