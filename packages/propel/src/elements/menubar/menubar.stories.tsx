import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilePen, Pencil } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { MenuItem, MenuPopup, MenuSeparator } from "../menu/index";
import { Menubar, MenubarTrigger, MenubarTriggerLabel } from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the menu popup laid out inline (it is just a styled div;
// Base UI only positions it) and every visual state pinned statically via the `data-*` attributes
// Base UI's menubar/menu would set (`data-popup-open=""`, `data-highlighted=""`,
// `data-disabled=""`). The family exposes no cva axes (per the designer's spec the bar chrome is
// "always the same"); its configuration surface is composition — whether a trigger carries a
// leading glyph. Menu-bar behavior (arrow-key navigation, single-open, click-to-open, whole-menu
// disabling) is demonstrated AND tested in the components-tier story (Components/Menubar).
const meta = {
  title: "Elements/Menubar",
  component: Menubar,
  subcomponents: {
    MenubarTrigger,
    MenubarTriggerLabel,
    MenuPopup,
    MenuItem,
    MenuSeparator,
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: the `Menubar` container laying out its `MenubarTrigger`s,
 * each composing an optional leading glyph (the internal `Icon` — the designer's "whether items
 * have icons" axis is served by composing or omitting it) and a `MenubarTriggerLabel`. The File
 * trigger pins `data-popup-open=""` — the attribute Base UI sets while its menu is open — and its
 * `MenuPopup` renders inline below the bar (a styled div; Base UI only positions it) with the
 * active row pinning `data-highlighted=""`.
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-1">
      <Menubar>
        <MenubarTrigger data-popup-open="" aria-expanded>
          <Icon tint="secondary">
            <FilePen />
          </Icon>
          <MenubarTriggerLabel>File</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenubarTrigger aria-expanded={false}>
          <Icon tint="secondary">
            <Pencil />
          </Icon>
          <MenubarTriggerLabel>Edit</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenubarTrigger aria-expanded={false}>
          <MenubarTriggerLabel>Help</MenubarTriggerLabel>
        </MenubarTrigger>
      </Menubar>
      <MenuPopup elevation="raised">
        <MenuItem layout="default" data-highlighted="">
          New file
        </MenuItem>
        <MenuItem layout="default">Open…</MenuItem>
        <MenuSeparator />
        <MenuItem layout="default">Save</MenuItem>
      </MenuPopup>
    </div>
  ),
};

/**
 * Every pinnable state of a trigger in the bar:
 *
 * - **Rest** — the quiet secondary-text row.
 * - **Focused** — the accent focus ring (`:focus-visible`, forced by the pseudo-states addon).
 * - **Open** — pins the `data-popup-open=""` Base UI sets while the trigger's menu is open: the
 *   hover-layer highlight plus primary text.
 * - **Disabled** — pins the `data-disabled=""` Base UI mirrors from a disabled `Menu` root (plus the
 *   native `disabled`): inert and dimmed, while the trigger keeps its slot in the bar.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { focusVisible: ["#menubar-trigger-focus"] },
  },
  render: () => (
    <Menubar>
      <MenubarTrigger id="menubar-trigger-rest">
        <MenubarTriggerLabel>Rest</MenubarTriggerLabel>
      </MenubarTrigger>
      <MenubarTrigger id="menubar-trigger-focus">
        <MenubarTriggerLabel>Focused</MenubarTriggerLabel>
      </MenubarTrigger>
      <MenubarTrigger id="menubar-trigger-open" data-popup-open="">
        <MenubarTriggerLabel>Open</MenubarTriggerLabel>
      </MenubarTrigger>
      <MenubarTrigger data-disabled="" disabled>
        <MenubarTriggerLabel>Disabled</MenubarTriggerLabel>
      </MenubarTrigger>
    </Menubar>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-popup-open` trigger's background (`data-popup-open:bg-layer-transparent-hover`) computes
 * away from the resting trigger's. Tagged out of the sidebar/docs/manifest while still running
 * under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const backgroundColor = (id: string) => {
      const trigger = canvasElement.querySelector(`#${id}`);
      if (!(trigger instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(trigger).backgroundColor;
    };
    await expect(backgroundColor("menubar-trigger-open")).not.toBe(
      backgroundColor("menubar-trigger-rest"),
    );
  },
};

/**
 * `MenubarTriggerLabel` is a `min-w-0 truncate` text element: when the bar is constrained, a long
 * label truncates with an ellipsis instead of overflowing the bar.
 */
export const LabelTruncation: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-56">
      <Menubar>
        <MenubarTrigger>
          <MenubarTriggerLabel>A very long menu that would overflow the bar</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenubarTrigger>
          <MenubarTriggerLabel>Edit</MenubarTriggerLabel>
        </MenubarTrigger>
      </Menubar>
    </div>
  ),
};
