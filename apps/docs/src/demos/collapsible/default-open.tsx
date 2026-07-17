import { Collapsible } from "@makeplane/propel/components/collapsible";

export default function DefaultOpenDemo() {
  return (
    <Collapsible trigger="Recent activity" indicator defaultOpen>
      3 work items updated in the last hour.
    </Collapsible>
  );
}
