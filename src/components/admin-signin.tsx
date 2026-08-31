"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FiKey, FiLock } from "react-icons/fi";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "./button";

export default function AdminSignIn() {
  const router = useRouter();
  const [isPasskeyPending, setIsPasskeyPending] = useState(false);

  // Conditional UI: as soon as the page loads, ask the browser / password
  // manager (e.g. 1Password) to surface a "sign in with passkey" prompt on its
  // own. Requires the hidden input with `autocomplete="... webauthn"` below.
  useEffect(() => {
    if (typeof PublicKeyCredential === "undefined" || !PublicKeyCredential.isConditionalMediationAvailable) {
      return undefined;
    }

    let cancelled = false;
    void PublicKeyCredential.isConditionalMediationAvailable().then((available) => {
      if (!available || cancelled) return;
      void authClient.signIn.passkey({
        autoFill: true,
        fetchOptions: {
          onSuccess: () => router.refresh(),
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [router]);

  // Explicit fallback for when the password manager doesn't pop up on its own.
  const handlePasskeySignIn = async () => {
    setIsPasskeyPending(true);
    const { error } = await authClient.signIn.passkey();
    setIsPasskeyPending(false);
    if (error) {
      toast.error("Passkey sign-in failed.", { description: error.message });
      return;
    }
    router.refresh();
  };

  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <div className="w-full max-w-md rounded-large border border-zinc-700 bg-zinc-900 p-2 text-foreground shadow-lg">
        <div className="flex flex-col gap-3 px-4 pt-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-zinc-800">
            <FiLock className="size-6 text-default-400" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Admin Console</h1>
            <p className="text-sm text-default-500">Access restricted to authorized personnel only</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-4 pt-4 pb-6">
          {/* Hidden anchor so the browser can offer passkey autofill on load. */}
          <input
            type="email"
            name="email"
            autoComplete="username webauthn"
            aria-hidden="true"
            tabIndex={-1}
            className="sr-only"
          />

          <Button
            onPress={handlePasskeySignIn}
            isLoading={isPasskeyPending}
            startContent={!isPasskeyPending && <FiKey className="text-lg" />}
            className="w-full"
            color="default"
            variant="flat"
          >
            Sign in with passkey
          </Button>

          <Button
            onPress={() => authClient.signIn.social({ provider: "github", callbackURL: "/admin" })}
            startContent={<BsGithub className="text-lg" />}
            className="w-full"
            color="default"
            variant="flat"
          >
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
