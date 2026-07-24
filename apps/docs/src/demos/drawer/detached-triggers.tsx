import { Button } from "@makeplane/propel/components/button";
import {
  createDrawerHandle,
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "@makeplane/propel/components/drawer";

// A handle shared by triggers that live far from the drawer they open — the
// same details panel launched from unrelated corners of the UI, no lifted state.
const detailsDrawer = createDrawerHandle();

export default function DetachedTriggersDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <DrawerTrigger
        handle={detailsDrawer}
        payload="WEB-101"
        render={<Button fillType="hug" variant="secondary" size="xl" label="WEB-101" />}
      />
      <DrawerTrigger
        handle={detailsDrawer}
        payload="WEB-202"
        render={<Button fillType="hug" variant="secondary" size="xl" label="WEB-202" />}
      />
      <Drawer handle={detailsDrawer}>
        {({ payload }) => (
          <DrawerPanel side="end">
            <DrawerHeader>
              <DrawerHeaderContent>
                <DrawerTitle>{typeof payload === "string" ? payload : "Details"}</DrawerTitle>
                <DrawerDescription>Work item details.</DrawerDescription>
              </DrawerHeaderContent>
            </DrawerHeader>
          </DrawerPanel>
        )}
      </Drawer>
    </div>
  );
}
