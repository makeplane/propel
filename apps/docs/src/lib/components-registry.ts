export type ComponentEntry = {
  slug: string;
  title: string;
  description: string;
};

export type ComponentGroup = {
  label: string;
  items: ComponentEntry[];
};

// The component catalog, grouped by family. `SidebarNav` and the homepage render the groups in
// this order; every page under `src/pages/components/<slug>.mdx` should have an entry here.
export const COMPONENT_GROUPS: ComponentGroup[] = [
  {
    label: "Actions",
    items: [
      {
        slug: "button",
        title: "Button",
        description: "Triggers an action or event, such as submitting a form or opening a dialog.",
      },
      {
        slug: "icon-button",
        title: "Icon Button",
        description: "An icon-only button for compact, labeled actions like adding or closing.",
      },
      {
        slug: "anchor-button",
        title: "Anchor Button",
        description:
          "An action that reads as an inline text link, with the same conventions as Button.",
      },
      {
        slug: "pill",
        title: "Pill",
        description:
          "A pill-shaped button holding a label with optional inline-start and inline-end icons.",
      },
      {
        slug: "toggle",
        title: "Toggle",
        description: "A two-state icon button that stays pressed or unpressed when clicked.",
      },
      {
        slug: "toggle-group",
        title: "Toggle Group",
        description: "A set of toggle buttons that share selection state, single or multi-select.",
      },
      {
        slug: "shortcut",
        title: "Shortcut",
        description: 'Displays a keyboard shortcut hint, such as "⌘ K", as a decorative cue.',
      },
    ],
  },
  {
    label: "Forms",
    items: [
      {
        slug: "input",
        title: "Input",
        description:
          "A single-line text field framed by a bordered group with room for inline icon slots.",
      },
      {
        slug: "input-field",
        title: "Input Field",
        description: "A labeled single-line text field with optional hint and error messaging.",
      },
      {
        slug: "text-area",
        title: "Text Area",
        description:
          "A multi-line text field with configurable text size, surface, and resize behavior.",
      },
      {
        slug: "text-area-field",
        title: "Text Area Field",
        description:
          "A labeled multi-line text field with optional description, hint, and error messaging.",
      },
      {
        slug: "number-field",
        title: "Number Field",
        description: "A bounded numeric input with decrement and increment stepper buttons.",
      },
      {
        slug: "otp-field",
        title: "OTP Field",
        description:
          "A one-time-password field — a row of slots that owns focus movement, paste, and completion.",
      },
      {
        slug: "checkbox",
        title: "Checkbox",
        description: "Lets a user toggle a single option on or off.",
      },
      {
        slug: "checkbox-field",
        title: "Checkbox Field",
        description:
          "A single checkbox as a field row with label, description, and hint or error text.",
      },
      {
        slug: "checkbox-group",
        title: "Checkbox Group",
        description: "Coordinates a set of checkboxes as one shared selected-values group.",
      },
      {
        slug: "checkbox-group-field",
        title: "Checkbox Group Field",
        description:
          "A labeled fieldset of checkbox options with description and helper or error text.",
      },
      {
        slug: "radio",
        title: "Radio",
        description: "Lets a user pick one option from a set of mutually exclusive choices.",
      },
      {
        slug: "radio-group-field",
        title: "Radio Group Field",
        description:
          "A labeled fieldset of radio options with description and helper or error text.",
      },
      {
        slug: "switch",
        title: "Switch",
        description: "Toggles a single setting on or off.",
      },
      {
        slug: "switch-field",
        title: "Switch Field",
        description: "A switch as a field row with label, description, and hint or error text.",
      },
      {
        slug: "select",
        title: "Select",
        description: "Lets a user choose one option from a list in a popup.",
      },
      {
        slug: "select-field",
        title: "Select Field",
        description: "A labeled select with description, popup options, and helper or error text.",
      },
      {
        slug: "combobox",
        title: "Combobox",
        description: "A filterable input that selects one or more options from a list in a popup.",
      },
      {
        slug: "combobox-field",
        title: "Combobox Field",
        description:
          "A labeled combobox with a filtered popup of selectable items and helper or error text.",
      },
      {
        slug: "autocomplete",
        title: "Autocomplete",
        description:
          "A searchable text input that suggests and filters matching options as you type.",
      },
      {
        slug: "autocomplete-field",
        title: "Autocomplete Field",
        description:
          "A labeled autocomplete with a filtered suggestion popup and helper or error text.",
      },
      {
        slug: "slider",
        title: "Slider",
        description: "A single-thumb control for picking a number within a range.",
      },
      {
        slug: "field",
        title: "Field",
        description:
          "The shared labeling and validation shell for composing a custom form control.",
      },
      {
        slug: "fieldset",
        title: "Fieldset",
        description: "Groups related fields under one accessible legend for the 90% case.",
      },
      {
        slug: "form",
        title: "Form",
        description:
          "A native form that consolidates server-style field errors and lays out field and action regions.",
      },
    ],
  },
  {
    label: "Overlays & menus",
    items: [
      {
        slug: "dialog",
        title: "Dialog",
        description: "A modal overlay for focused tasks and confirmations.",
      },
      {
        slug: "alert-dialog",
        title: "Alert Dialog",
        description:
          "A modal confirmation that requires an explicit response before a destructive action.",
      },
      {
        slug: "drawer",
        title: "Drawer",
        description:
          "An edge-anchored overlay panel that slides in for details, navigation, and side tasks.",
      },
      {
        slug: "popover",
        title: "Popover",
        description: "A floating panel anchored to a trigger for arbitrary controls and content.",
      },
      {
        slug: "tooltip",
        title: "Tooltip",
        description:
          "A small popup that describes the element it is attached to, shown on hover or focus.",
      },
      {
        slug: "preview-card",
        title: "Preview Card",
        description: "A non-modal rich preview that opens on hover or focus of an inline link.",
      },
      {
        slug: "menu",
        title: "Menu",
        description: "A popup list of actions or options opened from a trigger.",
      },
      {
        slug: "menubar",
        title: "Menubar",
        description:
          "An application menu bar hosting a horizontal row of menus with single-open behavior.",
      },
      {
        slug: "context-menu",
        title: "Context Menu",
        description: "A menu of actions that opens at the pointer on right click or long press.",
      },
    ],
  },
  {
    label: "Navigation",
    items: [
      {
        slug: "tabs",
        title: "Tabs",
        description: "A set of layered sections that show one panel at a time.",
      },
      {
        slug: "navigation-menu",
        title: "Navigation Menu",
        description: "A horizontal row of triggers and links that open portaled content panels.",
      },
      {
        slug: "toolbar",
        title: "Toolbar",
        description: "A row of grouped controls with a toolbar role and roving keyboard focus.",
      },
      {
        slug: "breadcrumb",
        title: "Breadcrumb",
        description: "Shows the path to the current page as a trail of navigable crumbs.",
      },
      {
        slug: "pagination",
        title: "Pagination",
        description:
          "Navigation for a paginated list or table with page numbers and prev/next controls.",
      },
    ],
  },
  {
    label: "Disclosure",
    items: [
      {
        slug: "accordion",
        title: "Accordion",
        description: "A vertically stacked set of panels that expand and collapse one at a time.",
      },
      {
        slug: "collapsible",
        title: "Collapsible",
        description: "A single show/hide disclosure that expands and collapses a panel of content.",
      },
    ],
  },
  {
    label: "Data display",
    items: [
      {
        slug: "table",
        title: "Table",
        description: "Displays rows of data in columns, with optional sortable and pinned headers.",
      },
      {
        slug: "list",
        title: "List",
        description:
          "A vertical roving-focus list of navigation and action rows, the primitive sidebars compose.",
      },
      {
        slug: "avatar",
        title: "Avatar",
        description:
          "Shows a person's photo, falling back to initials or an anonymous person icon.",
      },
      {
        slug: "avatar-group",
        title: "Avatar Group",
        description:
          'An overlapping stack of avatars that share one size and show a "+N" overflow count.',
      },
      {
        slug: "workspace-avatar",
        title: "Workspace Avatar",
        description:
          "Shows a workspace's logo in a rounded square, falling back to its colored initials.",
      },
      {
        slug: "badge",
        title: "Badge",
        description: "A small rounded pill of inline text for statuses, labels, and counts.",
      },
      {
        slug: "calendar",
        title: "Calendar",
        description: "An accessible date picker for single-date and range selection.",
      },
      {
        slug: "meter",
        title: "Meter",
        description: "A static gauge that graphs a numeric value within a known range.",
      },
      {
        slug: "linear-progress",
        title: "Linear Progress",
        description:
          "A horizontal progress bar driven by a value, with an optional trailing percentage.",
      },
      {
        slug: "circular-progress",
        title: "Circular Progress",
        description:
          "A small progress ring driven by a value, with an indeterminate spinning state.",
      },
      {
        slug: "icon",
        title: "Icon",
        description:
          "A decorative glyph slot that renders an SVG icon, sized and tinted from its container.",
      },
    ],
  },
  {
    label: "Feedback",
    items: [
      {
        slug: "banner",
        title: "Banner",
        description:
          "A message strip that surfaces status or announcements with an optional icon and actions.",
      },
      {
        slug: "toast",
        title: "Toast",
        description: "A portaled, auto-dismissing notification queued through a manager hook.",
      },
    ],
  },
  {
    label: "Layout",
    items: [
      {
        slug: "separator",
        title: "Separator",
        description:
          "A thin rule that visually divides content along a horizontal or vertical axis.",
      },
      {
        slug: "scroll-area",
        title: "Scroll Area",
        description:
          "A scroll container with propel's overlay scrollbar that reveals on hover or scroll.",
      },
    ],
  },
];

// Flat list, in group order — for the homepage's "browse" link and any consumer that wants every
// entry without the grouping.
export const COMPONENTS: ComponentEntry[] = COMPONENT_GROUPS.flatMap((group) => group.items);

export type DocEntry = {
  href: string;
  title: string;
  description: string;
};

// Root-level doc pages, rendered as the "Getting started" group above the
// component groups in the sidebar, mobile drawer, and search palette.
export const GETTING_STARTED: DocEntry[] = [
  {
    href: "/",
    title: "Home",
    description: "Propel — Plane's React component library.",
  },
  {
    href: "/introduction",
    title: "Introduction",
    description: "What Propel is and how the library is put together.",
  },
  {
    href: "/installation",
    title: "Installation",
    description: "Install @makeplane/propel and wire up its styles.",
  },
  {
    href: "/components",
    title: "Components",
    description: "Every component in the library, grouped by family.",
  },
];
