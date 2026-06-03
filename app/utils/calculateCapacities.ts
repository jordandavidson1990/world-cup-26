export const calculateCapacities = (
  totalTeams: number,
  numParticipants: number
): number[] => {
  const baseTeams = Math.floor(totalTeams / numParticipants);
  const remainder = totalTeams % numParticipants;

  return Array.from({ length: numParticipants }, (_, i) =>
    i < remainder ? baseTeams + 1 : baseTeams
  );
};
