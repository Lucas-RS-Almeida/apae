"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { LoginFormComponent } from "./components/login-form";
import { SignUpFormComponent } from "./components/sign-up-form";
import { LoadingScreen } from "./components/loading-screen";

export default function AuthenticationPage() {
  const [optionAuthentication, setOptionAuthentication] = useState<
    "login" | "signup"
  >("login");

  const { isPending } = authClient.useSession();

  if (isPending) {
    return <LoadingScreen />;
  }

  function handleToggleOptionAuthentication(option: "login" | "signup") {
    setOptionAuthentication(option);
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[800px] flex items-center justify-center gap-8 md:justify-normal">
        <div className="flex-1 items-center relative hidden md:flex">
          <div className="w-1/2 max-w-[260px] h-[300px] rounded-md bg-center bg-cover bg-no-repeat relative -to-4 left-4 rotate-[-7deg] bg-[url('/images/male.png')] leftRotateAndFadeinAnimation" />
          <div className="w-1/2 max-w-[260px] h-[300px] rounded-md bg-center bg-cover bg-no-repeat rotate-[7deg] bg-[url('/images/female.png')] rightRotateAndFadeinAnimation" />
        </div>
        <div className="w-full max-w-[400px] flex items-center flex-col gap-8 md:flex-1 md:max-w-full boomAnimation">
          <header className="text-center">
            <h2 className="text-3xl font-bold">APAE</h2>
            <h2 className="text-2xl font-lig">Barreiros - PE</h2>
          </header>

          {optionAuthentication === "login" ? (
            <LoginFormComponent
              $onToggleOptionAuthentication={handleToggleOptionAuthentication}
            />
          ) : (
            <SignUpFormComponent
              $onToggleOptionAuthentication={handleToggleOptionAuthentication}
            />
          )}
        </div>
      </div>
    </div>
  );
}
