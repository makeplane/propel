import type * as React from "react";

export type StatusIconProps = React.SVGProps<SVGSVGElement>;

export function SolidIcon(props: StatusIconProps) {
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
