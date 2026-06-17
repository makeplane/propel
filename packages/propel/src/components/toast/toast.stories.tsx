import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";

import { type ToastData, type ToastTone, ToastProvider, useToast } from "./index";

const TONES: ToastTone[] = ["success", "danger", "info", "warning", "neutral"];

// Stable spies shared between the ActionsInteraction story's render and play fn so the
// test can assert the action handlers fired. Cleared at the start of each play run.
const actionSpies = { onPrimary: fn(), onLeft: fn() };

// A small trigger that queues a toast via the manager hook — the real way a
// consumer raises a toast. Lives inside the provider (the meta-level decorator).
// `data` lets a story queue actions (left cluster and/or right-aligned primary action).
function Trigger({
  tone,
  label,
  data,
  onAdd,
}: {
  tone: ToastTone;
  label?: string;
  data?: Omit<ToastData, "tone">;
  onAdd?: () => void;
}) {
  const { add } = useToast<ToastData>();
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center rounded-md border-sm border-subtle-1 bg-layer-2 px-3 text-13 font-medium text-secondary"
      onClick={() => {
        add({
          title: "Toast title",
          description: "Description of the toast alert",
          data: { tone, ...data },
        });
        onAdd?.();
      }}
    >
      {label ?? `Show ${tone} toast`}
    </button>
  );
}

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  // Every story renders inside a single ToastProvider so its trigger can queue
  // toasts and the viewport can display them.
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1146-61689",
    },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the button to queue a toast; it auto-dismisses, or use its close button. */
export const Default: Story = {
  render: () => <Trigger tone="info" />,
};

/**
 * One trigger per tone. Each queues a toast with the matching status icon + color (success / danger
 * / info / warning / neutral).
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {TONES.map((tone) => (
        <Trigger key={tone} tone={tone} />
      ))}
    </div>
  ),
};

/**
 * A single left-aligned action (Figma's `button` boolean). Pass one entry in `data.actions` — it
 * renders as a transparent pill under the description.
 */
export const WithAction: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Trigger
      tone="info"
      label="Show toast with action"
      data={{ actions: [{ label: "Undo", onClick: fn() }] }}
    />
  ),
};

/**
 * A toast reporting a long-running task (Figma node 1146-61689): pass `data.progress` (0–100) and a
 * thin `Progress` bar with a `%` label renders between the description and the action row.
 */
export const WithProgress: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Trigger
      tone="info"
      label="Show toast with progress"
      data={{ progress: 32, actions: [{ label: "Cancel", onClick: fn() }] }}
    />
  ),
};

/**
 * Interaction test for the progress treatment: queue a toast carrying `data.progress` and assert
 * the `Progress` bar renders inside it with the right `progressbar` role, `aria-valuenow`, and
 * visible `%` label. Tagged so it stays out of the sidebar/docs/manifest.
 */
export const ProgressInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Trigger
      tone="info"
      label="Show toast with progress"
      data={{ progress: 32, actions: [{ label: "Cancel", onClick: fn() }] }}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /show toast with progress/i }));

    // The toast appears asynchronously in a portal; assert its dialog role and
    // accessible name before making scoped assertions.
    const toast = await within(document.body).findByRole("dialog", { name: "Toast title" });
    await expect(toast).toBeVisible();

    // Base UI's Progress owns the `progressbar` role + `aria-valuenow`; the bar
    // reports the queued completion and shows its rounded `%` label.
    const bar = await waitFor(() => within(toast).getByRole("progressbar"));
    await expect(bar).toHaveAttribute("aria-valuenow", "32");
    await expect(within(toast).getByText("32%")).toBeVisible();
  },
};

/**
 * Two left-aligned actions (Figma's `button` + `button2` on the danger/info/warning treatments).
 * The cluster sits inline-start; there is no right-aligned button.
 */
export const WithTwoActions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Trigger
      tone="danger"
      label="Show toast with two actions"
      data={{
        actions: [
          { label: "Retry", onClick: fn() },
          { label: "Details", onClick: fn() },
        ],
      }}
    />
  ),
};

/**
 * The success treatment: a left cluster plus a right-aligned primary action (`data.primaryAction`).
 * The primary button pins to the inline-end edge while the left cluster grows to fill — matching
 * Figma's success tone.
 */
export const WithPrimaryAction: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Trigger
      tone="success"
      label="Show toast with primary action"
      data={{
        actions: [{ label: "Dismiss all", onClick: fn() }],
        primaryAction: { label: "View", onClick: fn() },
      }}
    />
  ),
};

/**
 * Real interaction test: clicking the trigger queues a toast whose title and description become
 * visible inside the live region (Base UI renders the viewport as a polite `role="region"` live
 * area and each toast as a `dialog`); clicking its Dismiss button removes it. Tagged so it stays
 * out of the sidebar/docs/manifest.
 */
export const QueueAndDismiss: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => <Trigger tone="success" onAdd={fn()} />,
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);

    // The viewport is a live region that announces queued toasts (status/alert).
    await expect(body.getByRole("region", { name: /notification/i })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: /show success toast/i }));

    // The toast appears asynchronously in a portal; assert its dialog role and
    // accessible name before hover/focus assertions.
    const toast = await body.findByRole("dialog", { name: "Toast title" });
    await expect(toast).toBeVisible();
    await expect(body.getByText("Toast title")).toBeVisible();
    await expect(body.getByText("Description of the toast alert")).toBeVisible();

    // Base UI keeps the close button `aria-hidden` until the viewport is expanded;
    // hovering it reveals the Dismiss control, just like real usage.
    await userEvent.hover(toast);
    const dismiss = await waitFor(() => body.getByRole("button", { name: "Dismiss" }));

    // Closing the toast removes it from the live region.
    await userEvent.click(dismiss);
    await waitFor(() => expect(body.queryByText("Toast title")).not.toBeInTheDocument());
  },
};

/**
 * Interaction test for action buttons: queue a toast carrying a left action and a right-aligned
 * primary action, then verify both fire their handlers: the primary on click, and the left action
 * on Enter once focused. The viewport's keyboard tab flow is covered separately by KeyboardDismiss.
 * Tagged so it stays out of the sidebar/docs/manifest.
 */
export const ActionsInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Trigger
      tone="success"
      label="Show toast with actions"
      data={{
        actions: [{ label: "Undo", onClick: actionSpies.onLeft }],
        primaryAction: { label: "View", onClick: actionSpies.onPrimary },
      }}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);
    const { onPrimary, onLeft } = actionSpies;
    onPrimary.mockClear();
    onLeft.mockClear();

    await userEvent.click(canvas.getByRole("button", { name: /show toast with actions/i }));
    await body.findByRole("dialog", { name: "Toast title" });

    // The right-aligned primary action fires its handler on click.
    const view = await waitFor(() => body.getByRole("button", { name: "View" }));
    await userEvent.click(view);
    await expect(onPrimary).toHaveBeenCalledTimes(1);

    // The left action is a real button: focus it and confirm Enter fires its handler.
    // (Tab order into the toast viewport is covered by KeyboardDismiss.)
    const undo = body.getByRole("button", { name: "Undo" });
    undo.focus();
    await expect(undo).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(onLeft).toHaveBeenCalledTimes(1);
  },
};

/**
 * Keyboard-only reachability: a user with no pointer must be able to reach and activate the Dismiss
 * control. This drives Base UI's real keyboard model end to end, with NO `hover` and NO
 * programmatic `.focus()`, so a regression that made Dismiss unreachable by keyboard would actually
 * fail this test:
 *
 * 1. **F6** — Base UI's global hotkey moves focus into the toast viewport (a `role="region"` live
 *    area) and marks it `focused`, which expands the viewport. Expanding un-hides the close button
 *    (Base UI keeps `Toast.Close` `aria-hidden` until the viewport is expanded or the button itself
 *    is focused).
 * 2. **Tab** — from the viewport, focus crosses Base UI's focus guard onto the frontmost toast
 *    (`role="dialog"`).
 * 3. **Tab** — from the toast, focus lands on the only remaining control: Dismiss.
 * 4. **Enter** — activates Dismiss and removes the toast from the live region.
 *
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const KeyboardDismiss: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => <Trigger tone="success" onAdd={fn()} />,
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);

    await userEvent.click(canvas.getByRole("button", { name: /show success toast/i }));
    const toast = await body.findByRole("dialog", { name: "Toast title" });
    await expect(toast).toBeVisible();

    // F6 is Base UI's keyboard entry point: it moves focus into the viewport region
    // and expands it, exposing the (otherwise `aria-hidden`) Dismiss control.
    await userEvent.keyboard("{F6}");
    const viewport = body.getByRole("region", { name: /notification/i });
    await waitFor(() => expect(viewport).toHaveFocus());

    // Tab from the viewport crosses Base UI's focus guard onto the frontmost toast.
    await userEvent.keyboard("{Tab}");
    await waitFor(() => expect(toast).toHaveFocus());

    // Tab again reaches the toast's only focusable control — the Dismiss button — purely
    // via the keyboard. No hover, no programmatic focus: if Dismiss were unreachable by
    // keyboard, focus would never land here and this assertion would fail.
    await userEvent.keyboard("{Tab}");
    const dismiss = body.getByRole("button", { name: "Dismiss" });
    await waitFor(() => expect(dismiss).toHaveFocus());

    // Activating it with the keyboard removes the toast from the live region.
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(body.queryByText("Toast title")).not.toBeInTheDocument());
  },
};
