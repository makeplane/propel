import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";

import { Button } from "../button/index";
import { Form, FormActions, FormBody } from "../form/index";
import { SwitchField } from "../switch-field/index";
import { Switch, type SwitchMagnitude, SwitchThumb, SwitchTrack } from "./index";

const MAGNITUDES: SwitchMagnitude[] = ["lg", "md", "sm"];

const meta = {
  title: "Components/Switch",
  component: Switch,
  // The ready-made Switch composes the styled SwitchTrack + SwitchThumb; SwitchField is the
  // field-row composition (adds their tabs to the args table + records the relationships in the
  // manifest).
  subcomponents: { SwitchField, SwitchThumb, SwitchTrack },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1838-14347",
    },
  },
  args: {
    magnitude: "md",
    defaultChecked: true,
    "aria-label": "Notifications",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Switch key={magnitude} {...args} magnitude={magnitude} aria-label={`Size ${magnitude}`} />
      ))}
    </div>
  ),
};

/** On, off, disabled, and read-only (each in both positions) side by side. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Switch {...args} defaultChecked aria-label="On" />
      <Switch {...args} defaultChecked={false} aria-label="Off" />
      <Switch {...args} defaultChecked disabled aria-label="Disabled on" />
      <Switch {...args} defaultChecked={false} disabled aria-label="Disabled off" />
      <Switch {...args} defaultChecked readOnly aria-label="Read only on" />
      <Switch {...args} defaultChecked={false} readOnly aria-label="Read only off" />
    </div>
  ),
};

/**
 * Real interaction: clicking a switch flips `aria-checked`, and a disabled switch stays put. Tagged
 * so it's hidden from the sidebar, docs, and the AI/MCP manifest while still running under the
 * default `test` tag.
 */
export const TogglesOnClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", defaultChecked: false },
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "true");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};

/**
 * Keyboard ARIA pattern (WAI-ARIA switch): Tab moves focus to the switch and **Space** toggles
 * `aria-checked`. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const KeyboardToggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", defaultChecked: false },
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "false");

    // Tab focuses the switch.
    await userEvent.tab();
    await expect(sw).toHaveFocus();

    // Space toggles aria-checked on and off.
    await userEvent.keyboard(" ");
    await expect(sw).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard(" ");
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};

/** A disabled switch does not toggle when clicked. */
export const DisabledDoesNotToggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", defaultChecked: false, disabled: true },
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};

/**
 * The simplest labeling approach: the switch renders as a `<span>` by default, so an enclosing
 * `<label>` stays valid HTML — the label names the switch and clicking its text toggles it. For a
 * full field row with description and helper text, use `SwitchField`.
 */
export const Labeled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <label className="inline-flex cursor-pointer items-center gap-2 text-13 text-secondary">
      <Switch magnitude="md" defaultChecked={false} />
      Notifications
    </label>
  ),
};

/**
 * Interaction test: the wrapping `<label>` names the switch and clicking the label toggles it, like
 * any labelled native control. Tagged out of the sidebar/docs/manifest while still running under
 * the default `test` tag.
 */
export const LabeledInteraction: Story = {
  ...Labeled,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    // The wrapping label names the switch.
    const sw = canvas.getByRole("switch", { name: "Notifications" });
    await expect(sw).toHaveAttribute("aria-checked", "false");

    // Clicking the label toggles it.
    await userEvent.click(canvas.getByText("Notifications"));
    await expect(sw).toHaveAttribute("aria-checked", "true");
  },
};

/**
 * When the label is a sibling wired up with `htmlFor`/`id` instead of a wrapper, render the track
 * as a real `<button>`: pass `nativeButton` and graft the styled `SwitchTrack` onto a `<button>`
 * via `render`. The look is unchanged, and clicking the sibling label still toggles the switch.
 */
export const NativeButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Switch
        magnitude="md"
        defaultChecked
        id="notifications-switch"
        nativeButton
        render={<SwitchTrack magnitude="md" render={<button type="button" />} />}
      />
      <label htmlFor="notifications-switch" className="text-13 text-secondary">
        Notifications
      </label>
    </div>
  ),
};

/**
 * Interaction test: the native-button pattern keeps the switch semantics — the track IS a
 * `<button>` with `role="switch"`, the sibling `htmlFor` label names it, and clicking the label
 * toggles it. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const NativeButtonInteraction: Story = {
  ...NativeButton,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch", { name: "Notifications" });

    // A real <button>, named by its sibling label.
    await expect(sw.tagName).toBe("BUTTON");
    await expect(sw).toHaveAttribute("aria-checked", "true");

    // Clicking the sibling label toggles it, like any labelled native button.
    await userEvent.click(canvas.getByText("Notifications"));
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};

/**
 * Form integration: `SwitchField` already owns the `Field` name and label association, so inside a
 * `Form` the switch's checked state serializes with the submission — `onFormSubmit` receives it
 * under the field's `name`, with no extra wiring on the switch. Submit to see the captured value.
 */
export const FormIntegration: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [submitted, setSubmitted] = React.useState<{ restartOnFailure: boolean } | null>(null);
    return (
      <div className="flex w-80 flex-col gap-3">
        <Form<{ restartOnFailure: boolean }> onFormSubmit={(values) => setSubmitted(values)}>
          <FormBody layout="single">
            <SwitchField
              name="restartOnFailure"
              label="Restart on failure"
              magnitude="md"
              defaultChecked
            />
          </FormBody>
          <FormActions layout="inline">
            <Button fillType="hug" type="submit" variant="primary" size="md" label="Save" />
          </FormActions>
        </Form>
        <output className="text-13 text-secondary">
          {submitted ? `Restart on failure: ${submitted.restartOnFailure ? "on" : "off"}` : null}
        </output>
      </div>
    );
  },
};

/**
 * Interaction test: the `Field` name serializes the switch's checked state into `Form`'s
 * `onFormSubmit` — the default state first, then the flipped state after toggling and resubmitting.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const FormIntegrationInteraction: Story = {
  ...FormIntegration,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const save = canvas.getByRole("button", { name: "Save" });

    // Submitting with the default state serializes the checked switch.
    await userEvent.click(save);
    await expect(canvas.getByText("Restart on failure: on")).toBeInTheDocument();

    // Toggling off and resubmitting serializes the new state.
    await userEvent.click(canvas.getByRole("switch", { name: "Restart on failure" }));
    await userEvent.click(save);
    await expect(canvas.getByText("Restart on failure: off")).toBeInTheDocument();
  },
};
