import React from "react";
import AuthenticationProvider from "../providers/Authentication";
import Router from "./Router";

export default function Application() {
  return (
    <AuthenticationProvider>
      <Router />
    </AuthenticationProvider>
  );
}
