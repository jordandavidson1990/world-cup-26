"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import SquadSetup from "./components/SquadSetup";
import ResultsPanel from "./components/ResultsPanel";
import { useSweepstake } from "./hooks/useSweepstake";

export default function SweeperApp() {
  const [theme, setTheme] = useState("day");

  const {
    participants,
    results,
    error,
    addParticipant,
    removeParticipant,
    generateSweepstake,
  } = useSweepstake();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "day" ? "neon" : "day"));
  };

  // Ensure client-side rendering doesn't mismatch on initial hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    // The data-theme attribute here triggers the CSS Variables swap
    <div
      data-theme={theme}
      className="min-h-screen bg-fifa-light text-fifa-dark p-4 md:p-8 font-sans selection:bg-fifa-primary/20 transition-colors duration-500"
    >
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4">
          <SquadSetup
            participants={participants}
            error={error}
            onAdd={addParticipant}
            onRemove={removeParticipant}
            onGenerate={generateSweepstake}
          />
        </div>

        <div className="md:col-span-8">
          <ResultsPanel results={results} />
        </div>
      </main>
    </div>
  );
}
