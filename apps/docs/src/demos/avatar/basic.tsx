import { Avatar } from "@makeplane/propel/components/avatar";

export default function BasicDemo() {
  return (
    <Avatar
      magnitude="md"
      alt="Ada Lovelace"
      fallback="AL"
      src="https://i.pravatar.cc/128?img=47"
    />
  );
}
