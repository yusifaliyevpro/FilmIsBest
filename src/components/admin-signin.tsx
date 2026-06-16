"use client";

import { Button } from "@heroui/button";
import { BsGithub } from "react-icons/bs";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { authClient } from "@/lib/auth-client";

export default function AdminSignIn() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/40">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl text-sky-400">
            <RiShieldKeyholeLine />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">Admin Console</h1>
          <p className="text-sm text-gray-400">Access is restricted to authorized personnel only.</p>
        </div>

        <Button
          onPress={() => authClient.signIn.social({ provider: "github", callbackURL: "/admin" })}
          startContent={<BsGithub className="text-lg" />}
          className="mt-8 w-full bg-white font-semibold text-black hover:bg-gray-200"
          size="lg"
        >
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
}
