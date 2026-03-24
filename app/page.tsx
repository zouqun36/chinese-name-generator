import InputForm from "@/components/InputForm";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-5 py-14">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Chinese Name Generator
        </h1>
        <p className="text-amber-400 tracking-[0.2em] text-sm mb-4">中文名字生成器</p>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
          Discover a meaningful Chinese name that resonates with your identity.
          Names are crafted from classical characters with rich cultural significance.
        </p>
      </header>

      {/* Form + Results */}
      <InputForm />

      {/* Footer */}
      <footer className="mt-14 text-center text-xs text-zinc-600 leading-relaxed">
        Names are generated from classical Chinese characters with curated meanings.
        <br />
        Phonetic suggestions are inspired by your name&apos;s sounds, not direct transliteration.
      </footer>
    </main>
  );
}
