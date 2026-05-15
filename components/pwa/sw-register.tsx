"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        /* Listen for updates — prompt user to refresh */
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              toast.info("A new version is available — refresh to update.", {
                action: {
                  label: "Refresh",
                  onClick: () => window.location.reload(),
                },
                duration: Infinity,
              });
            }
          });
        });
      })
      .catch((err) => {
        /* Silently fail in dev — SW errors are noisy */
        if (process.env.NODE_ENV === "production") {
          console.error("[SW] Registration failed:", err);
        }
      });
  }, []);

  return null;
}
