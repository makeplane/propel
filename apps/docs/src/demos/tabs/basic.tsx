import { Icon } from "@makeplane/propel/components/icon";
import { Tab, Tabs, TabsList, TabsPanel } from "@makeplane/propel/components/tabs";
import { Activity, LayoutGrid, Settings } from "lucide-react";
import * as React from "react";

const TAB_ITEMS = [
  {
    value: "overview",
    label: "Overview",
    icon: <Icon icon={LayoutGrid} />,
    panel: "A high-level summary of the project.",
  },
  {
    value: "activity",
    label: "Activity",
    icon: <Icon icon={Activity} />,
    panel: "The latest activity feed.",
  },
  {
    value: "settings",
    label: "Settings",
    icon: <Icon icon={Settings} />,
    panel: "Configuration and preferences.",
  },
];

export default function BasicDemo() {
  const [value, setValue] = React.useState("overview");

  return (
    <Tabs appearance="contained" value={value} onValueChange={setValue}>
      <TabsList>
        {TAB_ITEMS.map((tab) => (
          <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
        ))}
      </TabsList>
      {TAB_ITEMS.map((tab) => (
        <TabsPanel key={tab.value} value={tab.value}>
          {tab.panel}
        </TabsPanel>
      ))}
    </Tabs>
  );
}
