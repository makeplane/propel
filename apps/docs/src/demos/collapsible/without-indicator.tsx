import { Collapsible } from "@makeplane/propel/components/collapsible";

export default function WithoutIndicatorDemo() {
  return (
    <Collapsible trigger="Recent activity" indicator={false}>
      3 work items updated in the last hour.
    </Collapsible>
  );
}
