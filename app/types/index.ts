export type Team = {
  name: string;
  flag: string;
  rank: number;
};

export type SweepstakeResult = {
  participant: string;
  teams: Team[];
};
