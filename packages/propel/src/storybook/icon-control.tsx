import {
  Activity,
  Bell,
  Calendar,
  Check,
  ChevronRight,
  CircleHelp,
  Folder,
  Inbox,
  LayoutGrid,
  Mail,
  Plus,
  Search,
  Settings,
  Star,
  Tag,
  User,
} from "lucide-react";

// A curated set of lucide icons selectable from the Storybook Controls panel. Icons
// are passed bare: every propel icon slot owns its own size (`[&>svg]:size-full` or an
// `[&_svg]:size-*` row rule), so the component sizes the chosen icon. `None` maps to
// `undefined` so an icon prop can be cleared from the control.
export const STORY_ICONS: Record<string, React.ReactNode> = {
  None: undefined,
  Activity: <Activity />,
  Bell: <Bell />,
  Calendar: <Calendar />,
  Check: <Check />,
  ChevronRight: <ChevronRight />,
  CircleHelp: <CircleHelp />,
  Folder: <Folder />,
  Inbox: <Inbox />,
  LayoutGrid: <LayoutGrid />,
  Mail: <Mail />,
  Plus: <Plus />,
  Search: <Search />,
  Settings: <Settings />,
  Star: <Star />,
  Tag: <Tag />,
  User: <User />,
};

/**
 * Reusable Storybook argType for any icon-shaped prop (`inlineStartNode`, `inlineEndNode`, `icon`).
 * Icon props are `ReactNode`, which Storybook can't render as a control, so a story spreads this
 * into its `argTypes` to turn the prop into a searchable select of `STORY_ICONS`:
 *
 * `argTypes: { inlineStartNode: iconControl }`
 *
 * Per propel's convention we only hand-write an argType to give a control a usable shape (here:
 * pick an icon), never to restate a type docgen already infers.
 */
export const iconControl = {
  control: { type: "select" as const },
  options: Object.keys(STORY_ICONS),
  mapping: STORY_ICONS,
};
