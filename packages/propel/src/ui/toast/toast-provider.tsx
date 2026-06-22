import { Toast as BaseToast } from "@base-ui/react/toast";

export type ToastProviderProps = BaseToast.Provider.Props;

/**
 * Provides the context for creating and managing toasts. Structural — carries no styling. Maps 1:1
 * to `Toast.Provider`.
 */
export function ToastProvider(props: ToastProviderProps) {
  return <BaseToast.Provider {...props} />;
}
