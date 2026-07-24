import { Button } from "@makeplane/propel/components/button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "@makeplane/propel/components/drawer";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { X } from "lucide-react";

export default function StartSideDemo() {
  return (
    <Drawer>
      <DrawerTrigger
        render={<Button fillType="hug" variant="secondary" size="xl" label="Open navigation" />}
      />
      <DrawerPanel side="start">
        <DrawerHeader>
          <DrawerHeaderContent>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeaderContent>
          <DrawerClose
            render={
              <IconButton variant="ghost" size="lg" aria-label="Close" icon={<Icon icon={X} />} />
            }
          />
        </DrawerHeader>
        <DrawerBody>Navigation links go here.</DrawerBody>
      </DrawerPanel>
    </Drawer>
  );
}
