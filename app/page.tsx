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

  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    console.info(
      "%cWho is gonna win? %cScotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿",
      "font-weight: normal; font-size: 1em; color:rgb(9, 73, 41);",
      "font-weight: bold; color:rgb(0, 31, 231);"
    );
    return null;
  }

  return (
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
