import { Tab, Tabs, TabsList, TabsPanel } from "@makeplane/propel/components/tabs";

const TAB_ITEMS = [
  { value: "overview", label: "Overview", panel: "A high-level summary of the project." },
  { value: "activity", label: "Activity", panel: "The latest activity feed." },
  { value: "settings", label: "Settings", panel: "Configuration and preferences." },
];

export default function UnderlineDemo() {
  return (
    <Tabs appearance="underline" defaultValue="overview">
      <TabsList>
        {TAB_ITEMS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
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
