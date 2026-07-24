import { Banner } from "@makeplane/propel/components/banner";
import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { X } from "lucide-react";

export default function BasicDemo() {
  return (
    <Banner
      placement="page"
      tone="neutral"
      title="A new version of the workspace is available"
      description="Reload to get the latest features and fixes for your projects."
      actions={
        <>
          <Button fillType="hug" variant="secondary" size="sm" label="Learn more" />
          <Button fillType="hug" variant="primary" size="sm" label="Update now" />
          <IconButton variant="ghost" size="md" aria-label="Dismiss" icon={<Icon icon={X} />} />
        </>
      }
    />
  );
}
