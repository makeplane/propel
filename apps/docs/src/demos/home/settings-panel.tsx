import { Slider } from "@makeplane/propel/components/slider";
import { SwitchField } from "@makeplane/propel/components/switch-field";
import { Tab, Tabs, TabsList, TabsPanel } from "@makeplane/propel/components/tabs";
import * as React from "react";

export default function SettingsPanelDemo() {
  const [zoom, setZoom] = React.useState(1);

  return (
    <div className="w-full max-w-72">
      <Tabs appearance="underline" defaultValue="notifications">
        <TabsList>
          <Tab value="notifications" label="Notifications" />
          <Tab value="appearance" label="Appearance" />
        </TabsList>
        <TabsPanel value="notifications">
          <div className="flex flex-col gap-4 pt-4">
            <SwitchField
              name="mentions"
              label="Mentions"
              magnitude="md"
              description="Notify me when someone mentions me."
              defaultChecked
            />
            <SwitchField
              name="digest"
              label="Daily digest"
              magnitude="md"
              description="A summary of activity, once a day."
            />
          </div>
        </TabsPanel>
        <TabsPanel value="appearance">
          <div className="flex flex-col gap-4 pt-4">
            <Slider
              label="Interface zoom"
              magnitude="md"
              value={zoom}
              onValueChange={(next) => setZoom(next as number)}
              min={0.75}
              max={1.5}
              step={0.05}
              format={{ style: "percent", maximumFractionDigits: 0 }}
            />
            <SwitchField
              name="reduceMotion"
              label="Reduce motion"
              magnitude="md"
              description="Minimize non-essential animation."
            />
          </div>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
