import { GeneratedName } from "@/lib/nameGenerator";
import NameCard from "./NameCard";

interface Props {
  names: GeneratedName[];
  onRefresh: () => void;
}

export default function NameResults({ names, onRefresh }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
          Your Names
        </h2>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm hover:border-amber-500 hover:text-amber-400 transition-all cursor-pointer"
        >
          ↻ Refresh names
        </button>
      </div>
      <div className="space-y-4">
        {names.map((n, i) => (
          <NameCard key={`${n.chinese}-${i}`} name={n} index={i} />
        ))}
      </div>
    </div>
  );
}
