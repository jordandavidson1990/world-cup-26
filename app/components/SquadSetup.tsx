import { useState } from "react";

type SquadSetupProps = {
  participants: string[];
  error: string;
  onAdd: (name: string) => boolean;
  onRemove: (name: string) => void;
  onGenerate: () => void;
};

export const SquadSetup = ({
  participants,
  error,
  onAdd,
  onRemove,
  onGenerate,
}: SquadSetupProps) => {
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdd(nameInput);
    if (success) setNameInput("");
  };

  return (
    <section className="bg-fifa-card p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-fifa-border relative overflow-hidden sticky top-8 transition-colors duration-300">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-fifa-primary blur-[80px] opacity-15 rounded-full pointer-events-none"></div>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-fifa-input rounded-xl flex items-center justify-center text-2xl shadow-inner">
          📋
        </div>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-fifa-dark">
          Squad Setup
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 relative z-10">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter Player Name..."
          className="flex-1 bg-fifa-input border border-fifa-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-fifa-primary focus:ring-2 focus:ring-fifa-primary/20 transition-all placeholder:text-fifa-muted font-medium text-fifa-dark"
        />
        <button
          type="submit"
          className="bg-fifa-dark text-fifa-card hover:opacity-80 px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-opacity shadow-md"
        >
          Add
        </button>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
          ⚠️ {error}
        </div>
      )}

      <div className="mb-8 relative z-10">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-fifa-border">
          <p className="text-xs text-fifa-muted font-bold uppercase tracking-widest">
            Participants
          </p>
          <p className="text-xs font-black tracking-widest bg-fifa-primary/10 text-fifa-primary px-3 py-1 rounded-full">
            {participants.length} / 48
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 max-h-60 overflow-y-auto pr-2 py-1">
          {participants.map((p) => (
            <span
              key={p}
              className="bg-fifa-input border border-fifa-border pl-4 pr-2 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:border-fifa-primary transition-colors text-fifa-dark"
            >
              {p}
              <button
                onClick={() => onRemove(p)}
                className="text-fifa-muted hover:text-white hover:bg-red-500 rounded-full w-5 h-5 flex items-center justify-center transition-colors text-xs font-bold"
              >
                ×
              </button>
            </span>
          ))}
          {participants.length === 0 && (
            <p className="text-sm text-fifa-muted italic py-4 text-center w-full">
              Add players to get started.
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={participants.length === 0}
        className="w-full bg-fifa-gradient hover:opacity-90 disabled:opacity-40 disabled:shadow-none text-white py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 relative z-10 transform hover:-translate-y-0.5 shadow-lg"
      >
        Start Grand Draw
      </button>
    </section>
  );
};
