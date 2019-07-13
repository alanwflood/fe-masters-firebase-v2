import React from "react";
import Authentication from "./Authentication";
import Router from "./Router";

export default function Application() {
  return (
    <Authentication>
      <Router />
    </Authentication>
  );
}
