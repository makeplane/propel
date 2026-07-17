import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@makeplane/propel/components/accordion";
import { Icon } from "@makeplane/propel/components/icon";
import { CircleHelp } from "lucide-react";

const ITEMS = [
  {
    value: "what",
    label: "What is Plane?",
    body: "Plane is an open-source project management tool for tracking issues, sprints, and product roadmaps.",
  },
  {
    value: "pricing",
    label: "How does pricing work?",
    body: "Plane is free to self-host. Managed plans add hosting, backups, and support.",
  },
  {
    value: "import",
    label: "Can I import my existing data?",
    body: "Yes — Plane can import work items from common trackers so you can migrate without losing history.",
  },
];

export default function WithIconDemo() {
  return (
    <Accordion defaultValue={["what"]}>
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger
              icon={<Icon icon={CircleHelp} tint="secondary" />}
              label={item.label}
            />
          </AccordionHeader>
          <AccordionPanel>{item.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
