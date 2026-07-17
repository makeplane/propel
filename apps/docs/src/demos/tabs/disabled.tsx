import { Tab, Tabs, TabsList, TabsPanel } from "@makeplane/propel/components/tabs";

const TAB_ITEMS = [
  {
    value: "overview",
    label: "Overview",
    panel: "A high-level summary of the project.",
    disabled: false,
  },
  {
    value: "activity",
    label: "Activity",
    panel: "The latest activity feed.",
    disabled: false,
  },
  {
    value: "billing",
    label: "Billing",
    panel: "Upgrade the workspace to manage billing.",
    disabled: true,
  },
];

export default function DisabledDemo() {
  return (
    <Tabs appearance="contained" defaultValue="overview">
      <TabsList>
        {TAB_ITEMS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} disabled={tab.disabled} />
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
