import { Avatar } from "@makeplane/propel/components/avatar";

export default function StatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar
        magnitude="lg"
        alt="Ada Lovelace"
        fallback="AL"
        src="https://i.pravatar.cc/128?img=47"
      />
      <Avatar magnitude="lg" alt="Ada Lovelace" fallback="AL" />
      <Avatar magnitude="lg" alt="Ada Lovelace" />
    </div>
  );
}
