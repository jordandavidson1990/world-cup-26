import { useState } from "react";
import { SweepstakeResult, Team } from "../types";
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
    setResults([]);
    return true;
  };

  const removeParticipant = (nameToRemove: string) => {
    setParticipants((prev) => prev.filter((name) => name !== nameToRemove));
    setResults([]);
  };

  // Helper function for Fisher-Yates shuffle
  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateSweepstake = () => {
    const numParticipants = participants.length;
    if (numParticipants === 0) {
      setError("Add at least one player to start the draw.");
      return;
    }

    // 1. Separate all 48 teams into 4 Tiered Pots based on rank
    const potSize = 12;
    const sortedTeams = [...WORLD_CUP_TEAMS].sort((a, b) => a.rank - b.rank);

    // Shuffle within pots to ensure Pot 1 is [France...Morocco] randomly distributed
    const pots: Team[][] = [
      shuffleArray(sortedTeams.slice(0, potSize)), // Pot 1 (Ranks 1-12)
      shuffleArray(sortedTeams.slice(potSize, potSize * 2)), // Pot 2 (Ranks 13-24)
      shuffleArray(sortedTeams.slice(potSize * 2, potSize * 3)), // Pot 3 (Ranks 25-36)
      shuffleArray(sortedTeams.slice(potSize * 3, potSize * 4)), // Pot 4 (Ranks 37-48)
    ];

    // 2. Initialize balanced "bundles" for each participant
    const bundles: Team[][] = Array.from({ length: numParticipants }, () => []);

    // 3. Round-robin deal from each Pot sequentially.
    // This guarantees Pot 1 is spread evenly, then Pot 2, etc.
    pots.forEach((pot) => {
      pot.forEach((team, index) => {
        const bundleIndex = index % numParticipants;
        bundles[bundleIndex].push(team);
      });
    });

    // 4. Randomly assign the balanced bundles to participants
    const shuffledBundles = shuffleArray(bundles);
    const newResults: SweepstakeResult[] = participants.map(
      (participant, index) => ({
        participant,
        teams: shuffledBundles[index],
      })
    );

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
