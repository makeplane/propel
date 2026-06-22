import type { Toast as BaseToast } from "@base-ui/react/toast";
import type { ToastManager } from "@base-ui/react/toast";

import {
  ToastPortal,
  ToastProvider as ToastProviderRoot,
  ToastViewport,
} from "../../ui/toast/index";
import type { ToastData } from "./toast";
import { ToastList } from "./toast-list";

export type ToastProviderProps = Omit<
  BaseToast.Provider.Props,
  "className" | "style" | "toastManager"
> & {
  /** Optional external manager. Must queue Propel `ToastData` so every toast has a `tone`. */
  toastManager?: ToastManager<ToastData>;
};

/**
 * Wraps the app and renders the toast viewport. Mount it once near the root, then queue toasts with
 * `useToast().add({ title, description, data: { tone } })`. Composes the atomic `ui/toast` parts
 * (Provider + Portal + Viewport) and the manager-driven {@link ToastList}.
 */
export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return (
    <ToastProviderRoot {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProviderRoot>
  );
}
