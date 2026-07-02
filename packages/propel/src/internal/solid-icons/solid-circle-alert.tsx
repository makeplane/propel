import { SolidIcon, type SolidIconProps } from "./solid-icon";

export function SolidCircleAlert(props: SolidIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm1 5a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V7Zm-1 8.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    </SolidIcon>
  );
}
