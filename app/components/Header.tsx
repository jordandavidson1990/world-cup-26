import Image from "next/image";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="max-w-7xl mx-auto text-center flex flex-col items-center mb-8 md:mb-12 border-b border-fifa-border pb-8 md:pb-10 relative">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-0 right-0 p-2 md:p-3 rounded-full bg-fifa-card border border-fifa-border text-xl md:text-2xl hover:border-fifa-primary transition-colors shadow-sm"
        title="Toggle Theme"
      >
        {theme === "day" ? "🌙" : "☀️"}
      </button>

      {/* Main Logo Image */}
      <div className="relative mb-6">
        <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden shadow-2xl border-4 border-fifa-card bg-fifa-card">
          <Image
            src="/logo.png"
            alt="FIFA World Cup 26 Logo"
            fill
            sizes="(max-width: 768px) 96px, 144px"
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-fifa-primary text-white w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg text-sm md:text-2xl">
          ⚽
        </div>
      </div>

      {/* Updated Branding */}
      <div className="space-y-1">
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-fifa-primary">
          Official Tournament Sweepstake
        </p>
        <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-fifa-dark italic">
          World Cup <span className="text-fifa-accent">&apos;26</span>
        </h1>
      </div>
    </header>
  );
}
