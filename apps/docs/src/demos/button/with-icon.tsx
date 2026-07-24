import { Button } from "@makeplane/propel/components/button";
import { Plus } from "lucide-react";

export default function WithIconDemo() {
  return <Button label="New" variant="primary" size="md" fillType="hug" icon={<Plus />} />;
}
