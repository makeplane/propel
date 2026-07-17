import { Banner } from "@makeplane/propel/components/banner";

export default function TonesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Banner placement="inline" tone="neutral" title="Your workspace settings were saved" />
      <Banner placement="inline" tone="info" title="A new project template is available to try" />
      <Banner
        placement="inline"
        tone="accent"
        title="Cycles are rolling out to your workspace this week"
      />
      <Banner placement="inline" tone="warning" title="Scheduled maintenance begins at 6 PM UTC" />
      <Banner
        placement="inline"
        tone="danger"
        title="Two projects failed to sync with the server"
      />
    </div>
  );
}
