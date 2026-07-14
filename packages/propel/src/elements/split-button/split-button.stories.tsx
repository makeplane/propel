import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { Button } from "../button/index";
import { IconButton } from "../icon-button/index";
import {
  SplitButton,
  type SplitButtonMagnitude,
  type SplitButtonProminence,
  type SplitButtonTone,
} from "./index";

const MAGNITUDES: SplitButtonMagnitude[] = ["sm", "md", "lg", "xl"];
const PROMINENCES: SplitButtonProminence[] = ["primary", "secondary"];
const TONES: SplitButtonTone[] = ["neutral", "danger"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled `SplitButton` frame
// renders DIRECTLY around the styled `Button` and `IconButton` elements — no Base UI grafts — with
// the disabled state pinned via the native `disabled` attribute. Menu opening, activation, and
// focus behavior are demonstrated AND tested in Components/SplitButton.
const meta = {
  title: "Elements/SplitButton",
  component: SplitButton,
  args: { prominence: "primary", tone: "neutral", magnitude: "lg" },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The connected two-segment frame: the main action button plus the menu-opening chevron, divided by
 * a tone-tinted line. The frame flattens the segments' shared edge; each segment keeps its own
 * control chrome.
 */
export const Default: Story = {
  render: () => (
    <SplitButton prominence="primary" tone="neutral" magnitude="lg">
      <Button prominence="primary" tone="neutral" magnitude="lg" sizing="hug">
        <Icon>
          <Plus />
        </Icon>
        Button
      </Button>
      <IconButton prominence="primary" tone="neutral" magnitude="lg" aria-label="More options">
        <Icon>
          <ChevronDown />
        </Icon>
      </IconButton>
    </SplitButton>
  ),
};

/**
 * The frame's full `prominence` × `tone` matrix (Figma ships primary and secondary split buttons
 * only — no tertiary/ghost). Primary frames tint the divider onto the accent/danger fill; a
 * secondary frame's divider is the leading segment's own end border.
 */
export const ProminencesAndTones: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      {TONES.map((tone) => (
        <div key={tone} className="flex items-center gap-6">
          {PROMINENCES.map((prominence) => (
            <SplitButton
              key={prominence}
              prominence={prominence}
              tone={tone}
              magnitude="lg"
              aria-label={`${prominence} ${tone} split button`}
            >
              <Button prominence={prominence} tone={tone} magnitude="lg" sizing="hug">
                <Icon>
                  <Plus />
                </Icon>
                Button
              </Button>
              <IconButton
                prominence={prominence}
                tone={tone}
                magnitude="lg"
                aria-label={`More options (${prominence} ${tone})`}
              >
                <Icon>
                  <ChevronDown />
                </Icon>
              </IconButton>
            </SplitButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the frame's child selectors compiled — the leading segment's inner
 * corners flatten (`rounded-e-none` out-cascades the segment's own `rounded-md`) while its outer
 * corners stay rounded, and the trailing segment loses its start border so the junction is a single
 * line. Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const ProminencesAndTonesCanary: Story = {
  ...ProminencesAndTones,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // Four frames render a main segment named "Button"; the first is primary/neutral.
    const [main] = canvas.getAllByRole("button", { name: "Button" });
    const trigger = canvas.getByRole("button", { name: "More options (primary neutral)" });
    await expect(getComputedStyle(main).borderTopRightRadius).toBe("0px");
    await expect(getComputedStyle(main).borderTopLeftRadius).not.toBe("0px");

    const secondaryTrigger = canvas.getByRole("button", {
      name: "More options (secondary neutral)",
    });
    await expect(getComputedStyle(secondaryTrigger).borderLeftWidth).toBe("0px");
    await expect(getComputedStyle(trigger).borderTopLeftRadius).toBe("0px");
  },
};

/** The four size steps — both segments of a split button always share one `magnitude`. */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      {MAGNITUDES.map((magnitude) => (
        <SplitButton key={magnitude} prominence="primary" tone="neutral" magnitude={magnitude}>
          <Button prominence="primary" tone="neutral" magnitude={magnitude} sizing="hug">
            <Icon>
              <Plus />
            </Icon>
            Button
          </Button>
          <IconButton
            prominence="primary"
            tone="neutral"
            magnitude={magnitude}
            aria-label={`More options (${magnitude})`}
          >
            <Icon>
              <ChevronDown />
            </Icon>
          </IconButton>
        </SplitButton>
      ))}
    </div>
  ),
};

/**
 * Both segments pinned disabled (the native `disabled` attribute): the segments show their disabled
 * fills and the frame dims its divider (`has-[:disabled]:divide-subtle`).
 */
export const Disabled: Story = {
  render: () => (
    <SplitButton prominence="primary" tone="neutral" magnitude="lg">
      <Button prominence="primary" tone="neutral" magnitude="lg" sizing="hug" disabled>
        <Icon>
          <Plus />
        </Icon>
        Button
      </Button>
      <IconButton
        prominence="primary"
        tone="neutral"
        magnitude="lg"
        aria-label="More options"
        disabled
      >
        <Icon>
          <ChevronDown />
        </Icon>
      </IconButton>
    </SplitButton>
  ),
};
