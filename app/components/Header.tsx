import Image from "next/image";

type HeaderProps = {
  theme: string;
  toggleTheme: () => void;
};

export const Header = ({ theme, toggleTheme }: HeaderProps) => (
  <header className="max-w-7xl mx-auto text-center flex flex-col items-center mb-10 md:mb-16 border-b border-fifa-border pb-10 md:pb-16 relative">
    <button
      onClick={toggleTheme}
      className="absolute top-0 right-0 p-3 rounded-full bg-fifa-card border border-fifa-border hover:border-fifa-primary transition-all duration-300 shadow-sm"
    >
      {theme === "day" ? "🌙" : "☀️"}
    </button>

    <div className="relative group mb-8 transition-transform duration-500 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-fifa-primary blur-[60px] opacity-20 rounded-full"></div>
      <div className="relative w-48 h-24 md:w-80 md:h-40">
        <Image
          src="/logo.png"
          alt="World Cup 26 Logo"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </div>

    <div className="space-y-2">
      <span className="inline-block py-1 px-4 rounded-full bg-fifa-primary/10 text-fifa-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
        JD&apos;s Official World Cup 2026 Sweepstake
      </span>
      <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-fifa-dark italic">
        World Cup <span className="text-fifa-accent">&apos;26</span>
      </h1>
    </div>
  </header>
);
