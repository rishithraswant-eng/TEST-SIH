"use client";
import { useState } from "react";
import AppShell from "./components/layout/AppShell";
import CaseWizard from "./components/cases/CaseWizard";
import CaseWorkspace from "./components/cases/CaseWorkspace";

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <AppShell>
      {!isInitialized ? (
        <CaseWizard onInitialize={() => setIsInitialized(true)} />
      ) : (
        <CaseWorkspace />
      )}
    </AppShell>
  );
}
