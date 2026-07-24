import { Avatar } from "@makeplane/propel/components/avatar";

const MEMBERS = [
  { alt: "Aarav Sharma", fallback: "AS" },
  { alt: "Brenda Lee", fallback: "BL" },
  { alt: "Chen Wei", fallback: "CW" },
  { alt: "Diya Patel", fallback: "DP" },
  { alt: "Elena Garcia", fallback: "EG" },
  { alt: "Farhan Khan", fallback: "FK" },
];

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {MEMBERS.map(({ alt, fallback }) => (
        <Avatar key={alt} magnitude="lg" alt={alt} fallback={fallback} />
      ))}
    </div>
  );
}
