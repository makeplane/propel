import { SolidIcon, type SolidIconProps } from "./solid-icon";

export function SolidInfo(props: SolidIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 5a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 7Zm1 4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0v-5Z" />
    </SolidIcon>
  );
}
