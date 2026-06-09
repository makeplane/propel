import { Toast as BaseToast } from "@base-ui/react/toast";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

// Solid status icons. Figma's toast (node 1144-3158) uses *filled* status glyphs —
// a tone-colored disc/triangle with the symbol knocked out of it — not lucide's
// stroke-based outlines. lucide-react ships no filled equivalents (every status
// icon is outline-only), so these are hand-authored on the same 24×24 grid lucide
// uses. The shape fills with `currentColor` (set per-tone via `text-icon-*`) and
// the inner symbol is a true cut-out (even-odd fill rule), so it shows the card
// surface behind it — reading as white on light, dark on dark, with no hardcoded
// color. Signature matches lucide so the rest of the component is unchanged.
type StatusIconProps = React.SVGProps<SVGSVGElement>;

function SolidIcon({ children, ...props }: StatusIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

// Filled disc + white check (cut-out).
function SolidCircleCheck(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.768 7.64a1 1 0 0 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6Z" />
    </SolidIcon>
  );
}

// Filled disc + white cross (cut-out).
function SolidCircleX(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm3.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293Z" />
    </SolidIcon>
  );
}

// Filled disc + white "i" (cut-out dot + stem).
function SolidInfo(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 5a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 7Zm1 4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0v-5Z" />
    </SolidIcon>
  );
}

// Filled rounded triangle + white "!" (cut-out stem + dot).
function SolidTriangleAlert(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M10.23 3.16a2.06 2.06 0 0 1 3.54 0l8.02 13.78A2.06 2.06 0 0 1 20.02 20H3.98a2.06 2.06 0 0 1-1.77-3.06L10.23 3.16ZM13 9a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V9Zm-1 6.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    </SolidIcon>
  );
}

// Filled disc + white "!" (cut-out stem + dot) — neutral fallback.
function SolidCircleAlert(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm1 5a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V7Zm-1 8.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    </SolidIcon>
  );
}

type StatusIcon = (props: StatusIconProps) => React.JSX.Element;

// Re-export Base UI's toast manager hook + global manager factory so consumers can
// queue toasts from anywhere (a button handler, a global store, outside React).
// `useToast` is the idiomatic name for the in-component hook.
export const createToastManager = BaseToast.createToastManager;
export const useToast = BaseToast.useToastManager;

// The semantic intent of a toast (Figma "Property 1": Default / Variant2 / Variant3
// = success / danger / info). `warning` and `neutral` round out the standard set.
// Each tone auto-selects a filled status icon and its color token — the caller never
// passes an icon. `tone` is required and lives in the toast's `data` payload (see `ToastData`).
const STATUS_ICON: Record<ToastTone, StatusIcon> = {
  success: SolidCircleCheck,
  danger: SolidCircleX,
  info: SolidInfo,
  warning: SolidTriangleAlert,
  neutral: SolidCircleAlert,
};

// Status-icon color per tone, straight from propel's `icon/*` tokens. The icon is
// the only tone-colored element; surface/border/text stay neutral, matching Figma.
const statusIconVariants = cva("size-4 shrink-0", {
  variants: {
    tone: {
      success: "text-icon-success-primary",
      danger: "text-icon-danger-primary",
      info: "text-icon-info-primary",
      warning: "text-icon-warning-primary",
      neutral: "text-icon-tertiary",
    },
  },
});

export type ToastTone = NonNullable<VariantProps<typeof statusIconVariants>["tone"]>;

/**
 * Custom data carried on every toast queued through this component. `add({ ... data:
 * { tone } })` selects the status icon + color; `tone` is required so the caller
 * always chooses the intent explicitly.
 */
export type ToastData = {
  /** Semantic intent — drives the status icon and its color. */
  tone: ToastTone;
};

export type ToastProviderProps = Omit<
  React.ComponentProps<typeof BaseToast.Provider>,
  "className" | "render" | "style"
>;

/**
 * Wraps the app and renders the toast viewport. Mount it once near the root, then
 * queue toasts with `useToast().add({ title, description, data: { tone } })`.
 * Bundles Base UI's `Toast.Provider` (manager + context), a fixed-position
 * `Viewport`, and a styled `Toast` for every queued item — so consumers only manage
 * content, never layout.
 */
export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return (
    <BaseToast.Provider {...props}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed end-4 bottom-4 z-50 flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-lg outline-none focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-accent-strong">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

// Renders one styled `Toast` per queued item. Base UI keeps the live list; we map it.
function ToastList() {
  const { toasts } = useToast<ToastData>();
  return toasts.map((toast) => <Toast key={toast.id} toast={toast} />);
}

export type ToastProps = Omit<
  React.ComponentProps<typeof BaseToast.Root>,
  "className" | "render" | "style"
>;

/**
 * A single styled toast: status icon (auto-selected from `toast.data.tone`), title,
 * description, optional action buttons (from `toast.actionProps`), and a close
 * button. Rendered automatically by `ToastProvider` for each queued toast — you
 * normally don't render this directly.
 */
export function Toast({ toast, ...props }: ToastProps) {
  // `tone` is a required field of `ToastData`, supplied when the toast is queued.
  // We intentionally have NO default tone — fail loud with guidance if it's missing.
  const data = toast.data as ToastData | undefined;
  if (data?.tone == null) {
    throw new Error(
      'propel Toast requires a `tone` in the toast\'s data payload, e.g. toast.add({ title, data: { tone: "info" } }).',
    );
  }
  const StatusIcon = STATUS_ICON[data.tone];
  // Only render the action wrapper when there's real action content. `actionProps`
  // can carry no `children` (e.g. just an `onClick`), in which case `BaseToast.Action`
  // renders null — guarding here avoids leaving an empty `<div>` gap in the layout.
  const hasAction = toast.actionProps?.children != null;
  return (
    <BaseToast.Root
      toast={toast}
      // Surface: white layer-2 card, subtle border, `lg` radius, overlay shadow —
      // all from Figma's Toast frame. `data-[ending]` fades the toast on dismiss.
      className={cx(
        "relative flex w-full items-start gap-2 rounded-lg border-sm border-subtle-1 bg-layer-2 px-4 py-3 shadow-overlay-100",
        "transition-opacity data-[ending]:opacity-0",
      )}
      {...props}
    >
      {/* Status icon sits in a 2px-padded column so it baselines with the title. */}
      <span className="flex items-center py-0.5">
        <StatusIcon aria-hidden className={statusIconVariants({ tone: data.tone })} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <BaseToast.Title className="text-14 font-medium text-primary" />
          <BaseToast.Description className="text-13 text-tertiary" />
        </div>
        {hasAction ? (
          <div className="flex gap-1.5 ps-[15px]">
            <BaseToast.Action className="inline-flex h-6 min-w-10 items-center justify-center gap-1 rounded-md px-2 text-13 font-medium text-secondary transition-colors hover:bg-layer-transparent-hover" />
          </div>
        ) : null}
      </div>
      <BaseToast.Close
        aria-label="Dismiss"
        className="absolute top-1 end-1 inline-flex size-5 items-center justify-center rounded-sm text-icon-tertiary transition-colors hover:bg-layer-transparent-hover"
      >
        <X aria-hidden className="size-3.5" />
      </BaseToast.Close>
    </BaseToast.Root>
  );
}
