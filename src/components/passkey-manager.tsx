"use client";

import { getAuthenticatorName } from "@better-auth/passkey";
import { useEffect, useState } from "react";
import { FiKey, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { usePasskeyPanel } from "@/lib/passkey-panel";
import { Button } from "./button";

type Passkey = {
  id: string;
  name?: string | null;
  aaguid?: string | null;
  createdAt?: string | Date | null;
};

export function PasskeyManager() {
  const { open } = usePasskeyPanel();
  const [passkeys, setPasskeys] = useState<Passkey[] | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    const { data } = await authClient.passkey.listUserPasskeys();
    setPasskeys(data ?? []);
  };

  // Refetch whenever the panel opens. Inlined (rather than calling `load`) so the
  // effect has no function dependency and the state update stays in an async callback.
  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    void authClient.passkey.listUserPasskeys().then(({ data }) => {
      if (!cancelled) setPasskeys(data ?? []);
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const handleCreate = async () => {
    setIsCreating(true);
    const { error } = await authClient.passkey.addPasskey({ name: "Admin Passkey" });
    setIsCreating(false);
    if (error) {
      toast.error("Couldn't create passkey.", { description: error.message });
      return;
    }
    void load();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await authClient.passkey.deletePasskey({ id });
    setDeletingId(null);
    if (error) {
      toast.error("Couldn't delete passkey.", { description: error.message });
      return;
    }
    toast.success("Passkey deleted.");
    void load();
  };

  if (!open) return null;

  return (
    <section className="mt-3 flex flex-col gap-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-800">
            <FiKey className="size-4 text-default-400" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg font-semibold">Passkeys</h2>
            <p className="max-w-md text-sm text-default-500">
              Sign in without GitHub. Manage the passkeys registered to this account.
            </p>
          </div>
        </div>
        <Button
          onPress={handleCreate}
          isLoading={isCreating}
          startContent={!isCreating && <FiPlus className="text-base" />}
          color="default"
          variant="outline"
          className="shrink-0"
        >
          Add passkey
        </Button>
      </div>

      {passkeys === null ? (
        <p className="text-sm text-default-500">Loading passkeys…</p>
      ) : passkeys.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-700 px-4 py-6 text-center text-sm text-default-500">
          No passkeys yet. Add one to sign in without GitHub next time.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {passkeys.map((passkey) => {
            const label = passkey.name || getAuthenticatorName(passkey.aaguid ?? "") || "Passkey";
            return (
              <li
                key={passkey.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FiKey className="size-4 shrink-0 text-default-400" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium">{label}</span>
                    {passkey.createdAt && (
                      <span className="text-xs text-default-500">
                        Added {new Date(passkey.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  onPress={() => handleDelete(passkey.id)}
                  isLoading={deletingId === passkey.id}
                  startContent={deletingId !== passkey.id && <FiTrash2 className="text-base" />}
                  color="danger"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  Delete
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
