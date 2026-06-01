import { useState } from "react";
import { SweepstakeResult } from "../types";
import { WORLD_CUP_TEAMS } from "../constants/teams";

export const useSweepstake = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [results, setResults] = useState<SweepstakeResult[]>([]);
  const [error, setError] = useState("");

  const addParticipant = (name: string) => {
    const cleanName = name.trim();
    if (!cleanName) return false;

    if (participants.includes(cleanName)) {
      setError("Player already in the squad!");
      return false;
    }
    if (participants.length >= 48) {
      setError("Maximum 48 players allowed.");
      return false;
    }

    setParticipants((prev) => [...prev, cleanName]);
    setError("");
    setResults([]); // Reset results on new entry
    return true;
  };

  const removeParticipant = (nameToRemove: string) => {
    setParticipants((prev) => prev.filter((name) => name !== nameToRemove));
    setResults([]);
  };

  const generateSweepstake = () => {
    if (participants.length === 0) {
      setError("Add at least one player to start the draw.");
      return;
    }

    const shuffledTeams = [...WORLD_CUP_TEAMS];
    // Fisher-Yates shuffle
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTeams[i], shuffledTeams[j]] = [
        shuffledTeams[j],
        shuffledTeams[i],
      ];
    }

    const newResults: SweepstakeResult[] = participants.map((p) => ({
      participant: p,
      teams: [],
    }));

    shuffledTeams.forEach((team, index) => {
      const participantIndex = index % participants.length;
      newResults[participantIndex].teams.push(team);
    });

    setResults(newResults);
    setError("");
  };

  return {
    participants,
    results,
    error,
    addParticipant,
    removeParticipant,
    generateSweepstake,
  };
};
