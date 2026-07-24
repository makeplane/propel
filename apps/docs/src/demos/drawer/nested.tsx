import { Button } from "@makeplane/propel/components/button";
import {
  Drawer,
  DrawerBody,
  DrawerDescription,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "@makeplane/propel/components/drawer";

export default function NestedDemo() {
  return (
    <Drawer>
      <DrawerTrigger
        render={<Button fillType="hug" variant="secondary" size="xl" label="Open settings" />}
      />
      <DrawerPanel side="end">
        <DrawerHeader>
          <DrawerHeaderContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Workspace-wide preferences.</DrawerDescription>
          </DrawerHeaderContent>
        </DrawerHeader>
        <DrawerBody>
          <Drawer>
            <DrawerTrigger
              render={
                <Button fillType="hug" variant="secondary" size="lg" label="Advanced options" />
              }
            />
            <DrawerPanel side="end">
              <DrawerHeader>
                <DrawerHeaderContent>
                  <DrawerTitle>Advanced options</DrawerTitle>
                </DrawerHeaderContent>
              </DrawerHeader>
              <DrawerBody>Nested drawer content.</DrawerBody>
            </DrawerPanel>
          </Drawer>
        </DrawerBody>
      </DrawerPanel>
    </Drawer>
  );
}
