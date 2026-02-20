"use client";

import { signIn } from "next-auth/react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { BsGithub } from "react-icons/bs";

export default function AdminSignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">Admin Signup</h1>
          <p className="text-sm text-default-500">Access restricted to authorized personnel only</p>
        </CardHeader>
        <CardBody>
          <Button
            onPress={() => signIn("github")}
            startContent={<BsGithub />}
            className="w-full"
            color="default"
            variant="flat"
          >
            Sign up with GitHub
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
