import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";
import { expect } from "storybook/test";
import { Badge, type BadgeMagnitude, type BadgeTone } from "./index";

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
//   2. A `States` story uses storybook-addon-pseudo-states to force
//      :hover/:active/:focus/:focus-visible at once, so every interactive state is
//      reviewable statically — no manual interaction, and snapshot-able.
const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["ai-generated"],
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

/**
 * Default + hover + active + focus side by side, with storybook-addon-pseudo-states
 * forcing each column's pseudo-class so all states are visible at once (no hovering).
 * Each badge has a unique id so the addon can target one state per column.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: "#badge-hover",
      active: "#badge-active",
      focus: "#badge-focus",
      focusVisible: "#badge-focus",
    },
  },
  render: (args) => (
    <div className="flex items-center gap-6">
      {(
        [
          ["Default", undefined],
          ["Hover", "badge-hover"],
          ["Active", "badge-active"],
          ["Focus", "badge-focus"],
        ] as const
      ).map(([label, id]) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <span className="text-11 text-label-grey-text">{label}</span>
          <Badge {...args} id={id} tabIndex={0}>
            {label}
          </Badge>
        </div>
      ))}
    </div>
  ),
};

/** Every color/intent the badge supports, side by side at the default magnitude. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
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

/** The three sizes (Figma S / Base / Large) at the default tone. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
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

/** Badges with an optional leading icon, which is sized to the magnitude and tinted to the tone. */
export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Badge key={magnitude} {...args} tone="success" magnitude={magnitude} icon={<Check />}>
          Done
        </Badge>
      ))}
    </div>
  ),
};

/**
 * The project-wide CSS check: the label renders AND the tone background utility
 * compiled to a real color. Concrete computed values prove the shared preview
 * actually loaded Tailwind + propel's tokens — a plain render would pass even with
 * no styles. Tagged `!dev`/`!autodocs`/`!manifest` so it's hidden from the sidebar,
 * docs, and the AI/MCP manifest, but still runs under the default `test` tag.
 */
export const CssCheck: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { children: "Active", tone: "success", magnitude: "md" },
  play: async ({ canvas }) => {
    const badge = canvas.getByText("Active");
    await expect(badge).toBeInTheDocument();
    // The `bg-success-subtle` tone utility resolved to a real (non-transparent) color.
    await expect(getComputedStyle(badge).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
