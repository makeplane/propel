import { Banner } from "@makeplane/propel/components/banner";

export default function PlacementsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Banner
        placement="page"
        tone="info"
        title="A new version of the workspace is available"
        description="Reload to get the latest features and fixes for your projects."
      />
      <Banner
        placement="inline"
        tone="info"
        title="A new version of the workspace is available"
        description="Reload to get the latest features and fixes for your projects."
      />
    </div>
  );
}
