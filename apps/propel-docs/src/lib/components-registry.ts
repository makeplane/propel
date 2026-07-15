export type ComponentEntry = {
  slug: string;
  title: string;
  description: string;
};

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: "button",
    title: "Button",
    description: "Triggers an action or event, such as submitting a form or opening a dialog.",
  },
  {
    slug: "input-field",
    title: "Input Field",
    description: "A labeled single-line text field with optional hint and error messaging.",
  },
  {
    slug: "select",
    title: "Select",
    description: "Lets a user choose one option from a list in a popup.",
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "A modal overlay for focused tasks and confirmations.",
  },
  {
    slug: "table",
    title: "Table",
    description: "Displays rows of data in columns, with optional sortable and pinned headers.",
  },
  {
    slug: "accordion",
    title: "Accordion",
    description: "A vertically stacked set of panels that expand and collapse one at a time.",
  },
];
