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
import type * as React from "react";

import { Icon } from "../components/icon";

// A curated set of lucide icons selectable from the Storybook Controls panel. Icons
// are passed as complete icon elements so components render slots directly. `None` maps to
// `undefined` so an icon prop can be cleared from the control.
export const STORY_ICONS: Record<string, React.ReactNode> = {
  None: undefined,
  Activity: <Icon icon={Activity} />,
  Bell: <Icon icon={Bell} />,
  Calendar: <Icon icon={Calendar} />,
  Check: <Icon icon={Check} />,
  ChevronRight: <Icon icon={ChevronRight} />,
  CircleHelp: <Icon icon={CircleHelp} />,
  Folder: <Icon icon={Folder} />,
  Inbox: <Icon icon={Inbox} />,
  LayoutGrid: <Icon icon={LayoutGrid} />,
  Mail: <Icon icon={Mail} />,
  Plus: <Icon icon={Plus} />,
  Search: <Icon icon={Search} />,
  Settings: <Icon icon={Settings} />,
  Star: <Icon icon={Star} />,
  Tag: <Icon icon={Tag} />,
  User: <Icon icon={User} />,
};

/**
 * Reusable Storybook argType for any icon-shaped prop (`icon`, `startIcon`, `endIcon`, `trailing`).
 * Icon props are `ReactNode`, which Storybook can't render as a control, so a story spreads this
 * into its `argTypes` to turn the prop into a searchable select of `STORY_ICONS`:
 *
 * `argTypes: { icon: iconControl }`
 *
 * Per propel's convention we only hand-write an argType to give a control a usable shape (here:
 * pick an icon), never to restate a type docgen already infers.
 */
export const iconControl = {
  control: { type: "select" as const },
  options: Object.keys(STORY_ICONS),
  mapping: STORY_ICONS,
};
