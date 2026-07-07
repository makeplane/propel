import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { OverlayPanel } from "../../internal/overlay-panel";
import { PopoverPanelPopup } from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. `PopoverPanelPopup`
// renders directly with the shared internal overlay panel that the components-tier
// `PopoverContent` uses for surface chrome. Base UI's Root, Trigger, Portal, Positioner and Popup
// behavior are demonstrated and tested in Components/Popover.
const meta = {
  title: "Elements/Popover",
  component: PopoverPanelPopup,
} satisfies Meta<typeof PopoverPanelPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The popover element used by the components-tier `PopoverContent`: an elevated `OverlayPanel`
 * supplies the border, fill, shadow, radius and scroll shell; `PopoverPanelPopup` contributes only
 * the popup body padding and focus outline reset.
 */
export const PanelPopup: Story = {
  render: () => (
    <OverlayPanel elevation="overlay" radius="lg" sizing="sm">
      <PopoverPanelPopup id="popover-panel-popup">Panel body</PopoverPanelPopup>
    </OverlayPanel>
  ),
};

/**
 * CSS canary (rule 2b): asserts the popup body carries the expected outline reset while the
 * surrounding panel owns the visible surface chrome. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const PanelPopupCanary: Story = {
  ...PanelPopup,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const popup = canvasElement.querySelector("#popover-panel-popup");
    if (!(popup instanceof HTMLElement)) throw new Error("missing #popover-panel-popup");
    await expect(getComputedStyle(popup).outlineStyle).toBe("none");
  },
};
