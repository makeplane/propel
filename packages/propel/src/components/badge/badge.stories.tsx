import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";
import { expect } from "storybook/test";
import { iconControl } from "../../storybook/icon-control";
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
//   2. Components that style interaction via CSS `hover:`/`active:`/`focus-visible:`
//      utilities get a `States` story using storybook-addon-pseudo-states to force
//      those pseudo-classes side by side (see e.g. Accordion). Badge is static — it
//      has no interaction-state styling — so it gets NO pseudo-states story; its
//      variation is fully covered by Tones + Magnitudes.
const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["ai-generated"],
  // Give the `leadingIcon` ReactNode prop a usable icon picker in the Controls panel.
  argTypes: { leadingIcon: iconControl },
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
        <Badge
          key={magnitude}
          {...args}
          tone="success"
          magnitude={magnitude}
          leadingIcon={<Check />}
        >
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
