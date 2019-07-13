import React, { useState } from "react";
import Router from "./Router";
import { firestore } from "../firebase";

export default function Application() {
  const [user, setUser] = useState(null);

  return <Router />;
}
