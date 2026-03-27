// lib/nameGenerator.ts
import {
  Style, Gender,
  PHONEME_MAP, CHAR_POOLS, SURNAMES, PINYIN, MEANINGS,
} from "./nameData";

export interface GeneratedName {
  chinese: string;
  pinyin: string;
  surname: string;
  surnamePinyin: string;
  given: string;
  givenPinyin: string;
  meaning: string;
  style: Style;           // single dominant style for this name
  phonemeInspired: boolean;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickUnique<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, Math.min(n, arr.length));
}

/** Extract candidate chars from an English name via phoneme mapping */
function phonemeCandidates(name: string): string[] {
  const lower = name.toLowerCase().replace(/[^a-z]/g, "");
  const candidates = new Set<string>();
  for (let i = 0; i < Math.min(lower.length, 6); i++) {
    const two = lower.slice(i, i + 2);
    const one = lower[i];
    if (PHONEME_MAP[two]) PHONEME_MAP[two].forEach((c) => candidates.add(c));
    else if (PHONEME_MAP[one]) PHONEME_MAP[one].forEach((c) => candidates.add(c));
  }
  return [...candidates];
}

/** Build pool for ONE style × gender, return chars with their style tagged */
function buildStylePool(style: Style, gender: Gender): string[] {
  return CHAR_POOLS[style][gender] ?? CHAR_POOLS[style].neutral;
}

/** For a given char, find which style pool it belongs to (prefer exact gender match) */
function charStyle(char: string, styles: Style[], gender: Gender): Style | undefined {
  for (const s of styles) {
    if ((CHAR_POOLS[s][gender] ?? CHAR_POOLS[s].neutral).includes(char)) return s;
  }
  return undefined;
}

function getPinyin(chars: string[]): string {
  return chars.map((c) => PINYIN[c] ?? `[${c}]`).join(" ");
}

function getMeaning(chars: string[]): string {
  return chars.map((c) => MEANINGS[c] ?? c).join("; ");
}

function generateOne(
  originalName: string,
  gender: Gender,
  styles: Style[]   // always a single-element array from generateNames
): GeneratedName {
  const chosenStyle = styles[0];
  const pool = buildStylePool(chosenStyle, gender);
  const phonemes = originalName.trim() ? phonemeCandidates(originalName) : [];
  const givenLen = Math.random() < 0.4 ? 1 : 2;
  const surname = pickRandom(SURNAMES);
  let givenChars: string[] = [];
  let phonemeInspired = false;

  if (phonemes.length > 0 && Math.random() < 0.6) {
    const inPool = phonemes.filter((c) => pool.includes(c));
    if (inPool.length > 0) {
      const first = pickRandom(inPool);
      givenChars.push(first);
      if (givenLen === 2) {
        const rest = pool.filter((c) => c !== first);
        givenChars.push(pickRandom(rest.length > 0 ? rest : pool));
      }
      phonemeInspired = true;
    } else {
      givenChars = pickUnique(pool, givenLen);
    }
  } else {
    givenChars = pickUnique(pool, givenLen);
  }

  const given = givenChars.join("");
  return {
    chinese: surname + given,
    pinyin: `${PINYIN[surname] ?? surname} ${getPinyin(givenChars)}`,
    surname,
    surnamePinyin: PINYIN[surname] ?? surname,
    given,
    givenPinyin: getPinyin(givenChars),
    meaning: getMeaning(givenChars),
    style: chosenStyle,
    phonemeInspired,
  };
}

export function generateNames(
  originalName: string,
  gender: Gender,
  styles: Style[],
  count = 5
): GeneratedName[] {
  const results: GeneratedName[] = [];
  const seen = new Set<string>();

  // Round-robin: assign one style per slot to guarantee coverage
  // e.g. styles=[classic,nature,modern], count=5 → [classic,nature,modern,classic,nature]
  let attempts = 0;
  let slotIndex = 0;

  while (results.length < count && attempts < 150) {
    attempts++;
    const chosenStyle = styles[slotIndex % styles.length];
    const name = generateOne(originalName, gender, [chosenStyle]);
    if (!seen.has(name.chinese)) {
      seen.add(name.chinese);
      results.push(name);
      slotIndex++; // only advance slot on success
    }
  }
  return results;
}
