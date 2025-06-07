"use client";

import { useState } from "react";

import { LoginFormComponent } from "./components/login-form";

import { Container } from "./styles";
import { SignUpFormComponent } from "./components/sign-up-form";

export default function AuthenticationPage() {
  const [optionAuthentication, setOptionAuthentication] = useState<
    "login" | "signup"
  >("login");

  function handleToggleOptionAuthentication(option: "login" | "signup") {
    setOptionAuthentication(option);
  }

  return (
    <Container>
      <div className="container_wrapper">
        <div className="box_left">
          <div className="card" />
          <div className="card" />
        </div>
        <div className="box_right">
          <header>
            <h2>APAE</h2>
            <h2>Barreiros - PE</h2>
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
    </Container>
  );
}
