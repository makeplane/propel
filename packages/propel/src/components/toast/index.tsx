import { Toast as BaseToast } from "@base-ui/react/toast";
import { cva, cx, type VariantProps } from "class-variance-authority";
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  type LucideIcon,
  TriangleAlert,
  X,
} from "lucide-react";
import * as React from "react";

// Re-export Base UI's toast manager hook + global manager factory so consumers can
// queue toasts from anywhere (a button handler, a global store, outside React).
// `useToast` is the idiomatic name for the in-component hook.
export const createToastManager = BaseToast.createToastManager;
export const useToast = BaseToast.useToastManager;

// The semantic intent of a toast (Figma "Property 1": Default / Variant2 / Variant3
// = success / danger / info). `warning` and `neutral` round out the standard set.
// Each tone auto-selects a filled status icon and its color token — the caller never
// passes an icon. `tone` lives in the toast's `data` payload (see `ToastData`).
const STATUS_ICON: Record<ToastTone, LucideIcon> = {
  success: CircleCheck,
  danger: CircleX,
  info: Info,
  warning: TriangleAlert,
  neutral: CircleAlert,
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
  defaultVariants: { tone: "info" },
});

export type ToastTone = NonNullable<VariantProps<typeof statusIconVariants>["tone"]>;

/**
 * Custom data carried on every toast queued through this component. `add({ ... data:
 * { tone } })` selects the status icon + color; omit it to fall back to `info`.
 */
export type ToastData = {
  /** Semantic intent — drives the status icon and its color. @default "info" */
  tone?: ToastTone;
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
        <BaseToast.Viewport className="fixed right-4 bottom-4 z-50 flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-lg outline-none focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-accent-strong">
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
  const tone = (toast.data as ToastData | undefined)?.tone ?? "info";
  const StatusIcon = STATUS_ICON[tone];
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
        <StatusIcon aria-hidden className={statusIconVariants({ tone })} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <BaseToast.Title className="text-14 font-medium text-primary" />
          <BaseToast.Description className="text-13 text-tertiary" />
        </div>
        {hasAction ? (
          <div className="flex gap-1.5 pl-[15px]">
            <BaseToast.Action className="inline-flex h-6 min-w-10 items-center justify-center gap-1 rounded-md px-2 text-13 font-medium text-secondary transition-colors hover:bg-layer-transparent-hover" />
          </div>
        ) : null}
      </div>
      <BaseToast.Close
        aria-label="Dismiss"
        className="absolute top-1 right-1 inline-flex size-5 items-center justify-center rounded-sm text-icon-tertiary transition-colors hover:bg-layer-transparent-hover"
      >
        <X aria-hidden className="size-3.5" />
      </BaseToast.Close>
    </BaseToast.Root>
  );
}
