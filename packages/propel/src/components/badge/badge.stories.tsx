import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Sparkles } from "lucide-react";

import { iconControl } from "../../storybook/icon-control";
import { Badge, BadgeIcon, BadgeLabel, type BadgeMagnitude, type BadgeTone } from "./index";

const TONES: BadgeTone[] = [
  "neutral",
  "grey",
  "brand",
  "info",
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
  subcomponents: { BadgeIcon, BadgeLabel },
  argTypes: { startIcon: iconControl, endIcon: iconControl },
  args: {
    children: "Badge",
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

export const Default: Story = {};

/** Every color/intent the badge supports, side by side. */
export const Tones: Story = {
  argTypes: { tone: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {TONES.map((tone) => (
        <Badge key={tone} {...args} tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};

/** The three sizes (Figma S / Base / Large). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Badge key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </Badge>
      ))}
    </div>
  ),
};

/** A leading icon node (`startIcon`), sized to the magnitude and tinted to the tone. */
export const WithLeadingIcon: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Badge key={magnitude} {...args} tone="success" magnitude={magnitude} startIcon={<Check />}>
          Done
        </Badge>
      ))}
    </div>
  ),
};

/** A trailing icon node (`endIcon`), sized + tinted the same as the leading slot. */
export const WithTrailingIcon: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Badge key={magnitude} {...args} tone="brand" magnitude={magnitude} endIcon={<Sparkles />}>
          Pro
        </Badge>
      ))}
    </div>
  ),
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
            <Badge key={magnitude} {...args} tone={PLAN_TONES[plan]} magnitude={magnitude}>
              {plan === "paid" ? "Paid" : "Free"}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};
