"use client";

import { useState } from "react";
import { Style, Gender } from "@/lib/nameData";
import { GeneratedName, generateNames } from "@/lib/nameGenerator";
import NameResults from "./NameResults";

const STYLES: { value: Style; label: string; icon: string; desc: string }[] = [
  { value: "classic", label: "Classic",  icon: "🏛️", desc: "Confucian virtues, timeless elegance" },
  { value: "nature",  label: "Nature",   icon: "🌿", desc: "Mountains, rivers, flora & fauna" },
  { value: "modern",  label: "Modern",   icon: "✨", desc: "Contemporary, bright & energetic" },
  { value: "poetic",  label: "Poetic",   icon: "📜", desc: "Literary arts, ink & verse" },
  { value: "lucky",   label: "Lucky",    icon: "🔴", desc: "Fortune, prosperity & good omens" },
];

const GENDERS: { value: Gender; label: string }[] = [
  { value: "male",    label: "Masculine" },
  { value: "female",  label: "Feminine" },
  { value: "neutral", label: "Neutral" },
];

export default function InputForm() {
  const [originalName, setOriginalName] = useState("");
  const [gender, setGender]     = useState<Gender>("neutral");
  const [styles, setStyles]     = useState<Style[]>([]);
  const [birthday, setBirthday] = useState("");
  const [names, setNames]       = useState<GeneratedName[]>([]);
  const [error, setError]       = useState("");
  const [generated, setGenerated] = useState(false);

  function toggleStyle(s: Style) {
    setStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function handleGenerate() {
    if (styles.length === 0) {
      setError("Please select at least one style.");
      return;
    }
    setError("");
    setNames(generateNames(originalName, gender, styles));
    setGenerated(true);
  }

  function handleRefresh() {
    if (styles.length === 0) return;
    setNames(generateNames(originalName, gender, styles));
  }

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-xl">
        <h2 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-6">
          Your Details
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm text-zinc-400 mb-2">Your name</label>
          <input
            type="text"
            value={originalName}
            onChange={(e) => setOriginalName(e.target.value)}
            placeholder="e.g. Emily, James, Sofia…"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 text-sm outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Birthday */}
        <div className="mb-5">
          <label className="block text-sm text-zinc-400 mb-2">Birthday</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 text-sm outline-none focus:border-amber-500 transition-colors [color-scheme:dark]"
          />
        </div>

        {/* Gender */}
        <div className="mb-5">
          <label className="block text-sm text-zinc-400 mb-2">Gender</label>
          <div className="flex gap-2 flex-wrap">
            {GENDERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setGender(value)}
                className={`px-5 py-2 rounded-xl text-sm border transition-all cursor-pointer ${
                  gender === value
                    ? "border-violet-500 bg-violet-500/15 text-violet-300"
                    : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div className="mb-2">
          <label className="block text-sm text-zinc-400 mb-2">
            Style <span className="text-zinc-600 text-xs">(required)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STYLES.map(({ value, label, icon, desc }) => {
              const active = styles.includes(value);
              return (
                <button
                  key={value}
                  onClick={() => toggleStyle(value)}
                  className={`flex flex-col items-start gap-1 p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    active
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"
                  }`}
                >
                  <span className="text-xl">{icon}</span>
                  <span className={`text-sm font-semibold ${active ? "text-amber-400" : "text-zinc-200"}`}>
                    {label}
                  </span>
                  <span className="text-xs text-zinc-500 leading-snug">{desc}</span>
                </button>
              );
            })}
          </div>
          {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-amber-500 text-zinc-900 font-semibold text-sm hover:bg-amber-400 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer"
          >
            ✦ Generate Names
          </button>
        </div>
      </div>

      {/* Results */}
      {generated && names.length > 0 && (
        <NameResults names={names} onRefresh={handleRefresh} />
      )}
    </div>
  );
}
