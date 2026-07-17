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
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="sm"
            label="Learn more"
          />
          <Button
            sizing="hug"
            prominence="primary"
            tone="neutral"
            magnitude="sm"
            label="Update now"
          />
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="md"
            aria-label="Dismiss"
            icon={<Icon icon={X} />}
          />
        </>
      }
    />
  );
}
