import { useState } from "react";
import { SweepstakeResult } from "../types";
import { WORLD_CUP_TEAMS } from "../constants/teams";
import { distributeTeamsToPlayers } from "../utils";

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

  const generateSweepstake = () => {
    const numParticipants = participants.length;
    if (numParticipants === 0) {
      setError("Add at least one player to start the draw.");
      return;
    }

    // Call the isolated utility allocation logic
    const balancedBundles = distributeTeamsToPlayers(
      WORLD_CUP_TEAMS,
      numParticipants
    );

    // Map the distributed bundles directly back to the active participants list
    const newResults: SweepstakeResult[] = participants.map(
      (participant, index) => ({
        participant,
        teams: balancedBundles[index],
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
