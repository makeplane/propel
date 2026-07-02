import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";

import { Icon } from "../../internal/icon";
import { Badge, BadgeLabel, type BadgeMagnitude, type BadgeTone } from "./index";

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

// Design-review convention for every propel component:
//   1. `parameters.design` links the story to its Figma frame, so the Storybook
//      "Design" panel (@storybook/addon-designs) shows code + Figma side by side.
//   2. Components that style interaction via CSS `hover:`/`active:`/`focus-visible:`
//      utilities get a `States` story using storybook-addon-pseudo-states to force
//      those pseudo-classes side by side (see e.g. Accordion). The badge pill itself
//      is static — it has no interaction-state styling — so it gets NO pseudo-states
//      story; its variation is fully covered by Tones + Magnitudes.
//
// elements-tier story (rule 2b): a pure UI-configuration showcase. Each part (`Badge`,
// `BadgeLabel`) is a single styled element, composed by hand, with the internal `Icon`
// filling the decorative glyph slot. The badge cva keys off no `data-*`/aria state, so
// there are no pinned states to show. The ready-made `Components/Badge` composition
// wraps the same parts behind convenience props.
const meta = {
  title: "Elements/Badge",
  component: Badge,
  subcomponents: { BadgeLabel },
  args: {
    tone: "neutral",
    magnitude: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1532-1177",
    },
  },
  render: (args) => (
    <Badge {...args}>
      <BadgeLabel>Badge</BadgeLabel>
    </Badge>
  ),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every color/intent the badge supports, side by side. */
export const Tones: Story = {
  // The grid iterates `tone` and labels each swatch with the tone name, so disable that
  // control; `magnitude` stays live and updates every swatch at once.
  argTypes: { tone: { control: false } },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {TONES.map((tone) => (
        <Badge key={tone} {...args} tone={tone}>
          <BadgeLabel>{tone}</BadgeLabel>
        </Badge>
      ))}
    </div>
  ),
};

/** The three sizes (Figma S / Base / Large). */
export const Magnitudes: Story = {
  // Iterates `magnitude` (and labels with it); `tone` stays live.
  argTypes: { magnitude: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Badge key={magnitude} {...args} magnitude={magnitude}>
          <BadgeLabel>{magnitude}</BadgeLabel>
        </Badge>
      ))}
    </div>
  ),
};

/**
 * A leading decorative glyph in the shared `Icon` slot, sized to the magnitude and tinted to the
 * tone.
 */
export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Badge key={magnitude} {...args} tone="success" magnitude={magnitude}>
          <Icon>
            <Check />
          </Icon>
          <BadgeLabel>Done</BadgeLabel>
        </Badge>
      ))}
    </div>
  ),
};

// The Figma "Plan Badges" frame defines a paid/free treatment for plan and
// upgrade affordances. Its two fills (Figma tokens `plans/brand/*` and
// `plans/neutral/*`) already exist on Badge's `tone` axis, so a plan badge is
// just a tone choice -- no new component or axis is needed:
//   paid -> `brand`  (subtle brand-accent fill + brand text, the "upgrade" accent)
//   free -> `grey`   (neutral grey fill + grey text)
// Both follow propel semantic tokens, so dark mode tracks automatically. The
// magnitudes (sm/md/lg) and radius/padding match the standard Badge steps.
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
              <BadgeLabel>{plan === "paid" ? "Paid" : "Free"}</BadgeLabel>
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};
