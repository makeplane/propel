import { Button } from "@makeplane/propel/components/button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "@makeplane/propel/components/drawer";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { X } from "lucide-react";

export default function BasicDemo() {
  return (
    <Drawer>
      <DrawerTrigger
        render={
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            label="Open details"
          />
        }
      />
      <DrawerPanel side="end">
        <DrawerHeader>
          <DrawerHeaderContent>
            <DrawerTitle>Work item details</DrawerTitle>
            <DrawerDescription>Edit the fields for this work item.</DrawerDescription>
          </DrawerHeaderContent>
          <DrawerClose
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                aria-label="Close"
                icon={<Icon icon={X} />}
              />
            }
          />
        </DrawerHeader>
        <DrawerBody>Panel body content goes here.</DrawerBody>
        <DrawerFooter>
          <DrawerClose
            render={
              <Button
                sizing="hug"
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                label="Cancel"
              />
            }
          />
          <Button sizing="hug" prominence="primary" tone="neutral" magnitude="lg" label="Save" />
        </DrawerFooter>
      </DrawerPanel>
    </Drawer>
  );
}
