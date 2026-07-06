import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import * as React from "react";
import { expect, fn, waitFor, within } from "storybook/test";

import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import {
  Toast,
  type ToastData,
  ToastList,
  type ToastProps,
  ToastStatusIcon,
  type ToastTone,
  ToastProvider,
  useToast,
} from "./index";

const TONES: ToastTone[] = ["success", "danger", "info", "warning", "neutral"];

// A shared close control passed to each ToastProvider — carries its own (localizable) aria-label.
const closeButton = (
  <IconButton
    prominence="ghost"
    tone="neutral"
    magnitude="sm"
    aria-label="Dismiss"
    icon={<Icon icon={X} />}
  />
);

// Stable spies shared between the ActionsInteraction story's render and play fn so the
// test can assert the action handlers fired. Cleared at the start of each play run.
const actionSpies = { onPrimary: fn(), onLeft: fn() };

// A small trigger that queues a toast via the manager hook — the real way a
// consumer raises a toast. Lives inside the provider (the meta-level decorator).
// `data` lets a story queue actions (left cluster and/or right-aligned primary action).
function Trigger({
  tone,
  label,
  title = "Toast title",
  description = "Description of the toast alert",
  data,
  onAdd,
}: {
  tone: ToastTone;
  label?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
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
          title,
          description,
          data: { tone, ...data },
        });
        onAdd?.();
      }}
    >
      {label ?? `Show ${tone} toast`}
    </button>
  );
}

class ToastErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { message: string | null }
> {
  state = { message: null };

  static getDerivedStateFromError(error: unknown) {
    return { message: error instanceof Error ? error.message : String(error) };
  }

  render() {
    if (this.state.message) {
      return <div role="alert">{this.state.message}</div>;
    }

    return this.props.children;
  }
}

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  subcomponents: { Toast, ToastList, ToastStatusIcon },
  args: { close: closeButton },
  // Every story renders inside a single ToastProvider so its trigger can queue
  // toasts and the viewport can display them.
  decorators: [
    (Story, context) => (
      <ToastProvider close={context.args.close}>
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
 * Coverage-focused tone test: queue every supported tone in one story so each status icon function
 * renders at least once. Hidden from docs/sidebar/manifest because Tones is the public showcase.
 */
export const ToneIconsInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex flex-wrap gap-2">
      {TONES.map((tone) => (
        <Trigger key={tone} tone={tone} />
      ))}
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);

    for (const button of canvas.getAllByRole("button", { name: /show .* toast/i })) {
      await userEvent.click(button);
    }

    await waitFor(async () => {
      await expect(await body.findAllByRole("dialog", { name: "Toast title" })).toHaveLength(
        TONES.length,
      );
    });
  },
};

/**
 * Accessibility fallback for progress: when a toast has no usable string title, the progressbar
 * keeps a stable accessible name instead of becoming unnamed.
 */
export const ProgressFallbackName: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Trigger
      tone="info"
      label="Show unnamed progress toast"
      title={<span>Progress task</span>}
      data={{ progress: 64 }}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /show unnamed progress toast/i }));

    const progressbar = await within(document.body).findByRole("progressbar", {
      name: "Progress",
    });
    await expect(progressbar).toHaveAttribute("aria-valuenow", "64");
  },
};

/**
 * Invalid toast data should fail loudly with guidance. The boundary makes that user-facing failure
 * testable without weakening the production component's strict `tone` requirement.
 */
export const MissingToneThrows: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  decorators: [(Story) => <Story />],
  render: () => (
    <ToastErrorBoundary>
      <Toast
        toast={{ id: "missing-tone", title: "Missing tone" } as ToastProps["toast"]}
        close={closeButton}
      />
    </ToastErrorBoundary>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent("propel Toast requires");
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
 * Report an async task with a single toast that advances through its lifecycle:
 * `useToast().promise(promise, { loading, success, error })` queues a loading toast, then updates
 * it in place when the promise settles. Each state carries its own `data.tone`, so the status icon
 * tracks the lifecycle (neutral while pending, success/danger once settled). The demo settles
 * deterministically after a 300 ms delay.
 */
export const AsyncPromise: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const { promise } = useToast();
    return (
      <button
        type="button"
        className="inline-flex h-8 items-center rounded-md border-sm border-subtle-1 bg-layer-2 px-3 text-13 font-medium text-secondary"
        onClick={() => {
          void promise<string, ToastData>(
            new Promise<string>((resolve) => {
              setTimeout(() => resolve("3 attachments"), 300);
            }),
            {
              loading: {
                title: "Uploading files",
                description: "Your attachments are on their way",
                data: { tone: "neutral" },
              },
              success: (uploaded) => ({
                title: "Upload complete",
                description: `${uploaded} uploaded`,
                data: { tone: "success" },
              }),
              error: {
                title: "Upload failed",
                description: "Something went wrong — try again",
                data: { tone: "danger" },
              },
            },
          );
        }}
      >
        Upload files
      </button>
    );
  },
};

/**
 * Interaction test for the promise lifecycle: clicking the trigger shows the loading toast, and
 * once the 300 ms task resolves the SAME toast updates in place to the success state (one dialog
 * throughout, no second toast). Tagged so it stays out of the sidebar/docs/manifest.
 */
export const AsyncPromiseInteraction: Story = {
  ...AsyncPromise,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);

    await userEvent.click(canvas.getByRole("button", { name: "Upload files" }));

    // The loading state appears first, as a dialog named by its loading title.
    const toast = await body.findByRole("dialog", { name: "Uploading files" });
    await expect(toast).toBeVisible();

    // When the promise resolves, the same toast updates in place to the success state.
    await waitFor(() => expect(body.getByText("Upload complete")).toBeVisible());
    await expect(body.getByText("3 attachments uploaded")).toBeVisible();
    await expect(body.getAllByRole("dialog")).toHaveLength(1);
    await expect(body.queryByText("Uploading files")).not.toBeInTheDocument();
  },
};

/**
 * Deduplicated toast: pass a stable `id` to `add` and repeated calls update the existing toast in
 * place (refreshing its auto-dismiss timer) instead of stacking duplicates. Click the trigger
 * repeatedly while the toast is visible — the save count updates inside the one toast.
 */
export const Deduplicated: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const { add } = useToast();
    const [saves, setSaves] = React.useState(0);
    return (
      <button
        type="button"
        className="inline-flex h-8 items-center rounded-md border-sm border-subtle-1 bg-layer-2 px-3 text-13 font-medium text-secondary"
        onClick={() => {
          const next = saves + 1;
          setSaves(next);
          add({
            id: "draft-save",
            title: "Draft saved",
            description: `Saved ${next} ${next === 1 ? "time" : "times"} this session`,
            data: { tone: "success" },
          });
        }}
      >
        Save draft
      </button>
    );
  },
};

/**
 * Interaction test for deduplication: two clicks on the trigger produce ONE toast — the second
 * `add` call with the same `id` upserts the existing toast (its description advances to the new
 * save count) rather than queueing a duplicate. Tagged so it stays out of the
 * sidebar/docs/manifest.
 */
export const DeduplicatedInteraction: Story = {
  ...Deduplicated,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);
    const trigger = canvas.getByRole("button", { name: "Save draft" });

    await userEvent.click(trigger);
    const toast = await body.findByRole("dialog", { name: "Draft saved" });
    await expect(within(toast).getByText("Saved 1 time this session")).toBeVisible();

    // A second add with the same `id` updates the existing toast in place…
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(within(toast).getByText("Saved 2 times this session")).toBeVisible(),
    );

    // …so the live region still holds exactly one toast.
    await expect(body.getAllByRole("dialog", { name: "Draft saved" })).toHaveLength(1);
  },
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
