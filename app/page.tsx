"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import SquadSetup from "./components/SquadSetup";
import ResultsPanel from "./components/ResultsPanel";
import Footer from "./components/Footer";
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

  useEffect(() => {
    setMounted(true);
    console.info(
      "%cWho is gonna win? %cScotland 🏴%c󠁢󠁳󠁣󠁴󠁿",
      "font-weight: normal; font-size: 1em; color:rgb(9, 73, 41);",
      "font-weight: bold; color:rgb(0, 31, 231);"
    );
  }, []);

  const [isDrawing, setIsDrawing] = useState(false);

  const handleStartDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      generateSweepstake();
      setIsDrawing(false);
    }, 3000);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-fifa-light text-fifa-dark p-4 md:p-8 font-sans selection:bg-fifa-primary/20 transition-colors duration-500 flex flex-col justify-between"
    >
      <div>
        <Header theme={theme} toggleTheme={toggleTheme} />

        <main className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <SquadSetup
              participants={participants}
              error={error}
              onAdd={addParticipant}
              onRemove={removeParticipant}
              onGenerate={handleStartDraw}
            />
          </div>

          <div className="md:col-span-8">
            <ResultsPanel results={results} isDrawing={isDrawing} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
