import { Button } from "@makeplane/propel/components/button";
import { Plus } from "lucide-react";

export default function WithIconDemo() {
  return (
    <Button
      label="New"
      prominence="primary"
      tone="neutral"
      magnitude="md"
      sizing="hug"
      startIcon={<Plus />}
    />
  );
}
