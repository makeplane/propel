import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Sparkles } from "lucide-react";
import { expect } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import { Icon } from "../icon";
import { Badge, BadgeLabel, type BadgeMagnitude, type BadgeTone } from "./index";

const TONES: BadgeTone[] = [
  "neutral",
  "grey",
  "brand",
  "indigo",
  "success",
  "emerald",
  "warning",
  "yellow",
  "danger",
  "crimson",
  "orange",
];

const MAGNITUDES: BadgeMagnitude[] = ["sm", "md", "lg"];

// Badge is static — no interaction-state styling — so it gets no pseudo-states story;
// its variation is fully covered by Tones + Magnitudes. This is the ready-made
// composition: the `Badge` pill plus optional leading/trailing icon nodes
// (`startIcon` / `endIcon`), wired to the atomic `elements/badge` parts.
const meta = {
  title: "Components/Badge",
  component: Badge,
  subcomponents: { BadgeLabel },
  argTypes: { startIcon: iconControl, endIcon: iconControl },
  args: {
    label: "Badge",
    tone: "neutral",
    magnitude: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1532-1177",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// A single-row swatch layout, shared by every story below that just lines Badges up side by side
// (`Magnitudes`, `WithLeadingIcon`, `WithTrailingIcon`, `IconOnly`). `Tones` needs `flex-wrap` and
// `PlanBadges` needs a two-row layout, so those keep their own wrapper instead of this decorator.
const rowLayout: Story["decorators"] = [
  (Story) => (
    <div className="flex items-center gap-3">
      <Story />
    </div>
  ),
];

export const Default: Story = {};

/** Every color/intent the badge supports, side by side. */
export const Tones: Story = {
  argTypes: { tone: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {TONES.map((tone) => (
        <Badge key={tone} {...args} tone={tone} label={tone} />
      ))}
    </div>
  ),
};

/** The three sizes (Figma S / Base / Large). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, label: { control: false } },
  decorators: rowLayout,
  render: (args) => (
    <>
      {MAGNITUDES.map((magnitude) => (
        <Badge key={magnitude} {...args} magnitude={magnitude} label={magnitude} />
      ))}
    </>
  ),
};

/** A leading icon node (`startIcon`), sized to the magnitude and tinted to the tone. */
export const WithLeadingIcon: Story = {
  parameters: { controls: { disable: true } },
  decorators: rowLayout,
  render: (args) => (
    <>
      {MAGNITUDES.map((magnitude) => (
        <Badge
          key={magnitude}
          {...args}
          tone="success"
          magnitude={magnitude}
          startIcon={<Icon icon={Check} />}
          label="Done"
        />
      ))}
    </>
  ),
};

/** A trailing icon node (`endIcon`), sized + tinted the same as the leading slot. */
export const WithTrailingIcon: Story = {
  parameters: { controls: { disable: true } },
  decorators: rowLayout,
  render: (args) => (
    <>
      {MAGNITUDES.map((magnitude) => (
        <Badge
          key={magnitude}
          {...args}
          tone="brand"
          magnitude={magnitude}
          endIcon={<Icon icon={Sparkles} />}
          label="Pro"
        />
      ))}
    </>
  ),
};

/**
 * Icon-only (no `label`) — the Figma anatomy's "compact status indicator / when space is limited"
 * case. The label part is skipped entirely, so the icon sits centered with symmetric padding. The
 * icon is decorative (`aria-hidden`), so the pill carries its own `aria-label` — otherwise this
 * state has no accessible name at all.
 */
export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  decorators: rowLayout,
  render: (args) => (
    <>
      {MAGNITUDES.map((magnitude) => (
        <Badge
          key={magnitude}
          {...args}
          tone="success"
          magnitude={magnitude}
          label={undefined}
          startIcon={<Icon icon={Check} />}
          aria-label="Completed"
        />
      ))}
    </>
  ),
};

/**
 * Behavior twin of `IconOnly`: with no label there is no empty label span left in the pill (an
 * empty flex child would eat the `gap` and render the icon off-center), the icon sits symmetrically
 * — equal space on both sides — and the pill still carries an accessible name via `aria-label`.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const IconOnlyInteraction: Story = {
  ...IconOnly,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const pills = canvasElement.querySelectorAll<HTMLElement>("div > span");
    // Guards the assertions below from silently no-op'ing if this selector ever stops matching.
    await expect(pills.length).toBe(MAGNITUDES.length);
    for (const pill of pills) {
      // Exactly one child: the icon slot. No empty BadgeLabel span.
      await expect(pill.children.length).toBe(1);
      const icon = pill.children[0] as HTMLElement;
      const pillRect = pill.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();
      // Symmetric: leading space == trailing space (within a rounding pixel).
      const before = iconRect.left - pillRect.left;
      const after = pillRect.right - iconRect.right;
      await expect(Math.abs(before - after)).toBeLessThanOrEqual(1);
      // The icon is aria-hidden, so the pill's own `aria-label` is the only accessible name.
      await expect(pill.getAttribute("aria-label")).toBe("Completed");
    }
  },
};

// The Figma "Plan Badges" frame's two fills (`plans/brand/*`, `plans/neutral/*`) already
// exist on Badge's `tone` axis, so a plan badge is just a tone choice:
//   paid -> `brand`  free -> `grey`
const PLAN_TONES = { paid: "brand", free: "grey" } as const satisfies Record<
  "paid" | "free",
  BadgeTone
>;

/**
 * The "Plan Badges" treatment: `paid` reads as a `brand`/upgrade accent, `free` as neutral `grey`.
 * These are plain Badge tones, shown here at every magnitude.
 */
export const PlanBadges: Story = {
  parameters: {
    controls: { disable: true },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=3657-77",
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["paid", "free"] as const).map((plan) => (
        <div key={plan} className="flex items-center gap-3">
          {MAGNITUDES.map((magnitude) => (
            <Badge
              key={magnitude}
              {...args}
              tone={PLAN_TONES[plan]}
              magnitude={magnitude}
              label={plan === "paid" ? "Paid" : "Free"}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};
