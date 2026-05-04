"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";

export const languages = ["en", "ne"] as const;
export type Lang = (typeof languages)[number];

export const translations: Record<
  Lang,
  {
    title: string;
    desc: string;
    contactHint: string;
    contactCta: string;
    readMore: string;
    showLess: string;
    fullScreen: string;
    fullScreenReader: string;
    readAloud: string;
    pause: string;
    resume: string;
    stop: string;
    ttsUnavailable: string;
    ttsLang: string;
  }
> = {
  en: {
    title: "Four kinds of people around the table of knowledge.",
    desc: "Some are confidently lost. Some are humble enough to learn. Some hold knowledge silently. And some turn knowledge into wisdom by sharing it.",
    contactHint: "Want this in your language?",
    contactCta: "Request it",
    readMore: "Read more",
    showLess: "Show less",
    fullScreen: "Full screen",
    fullScreenReader: "Full screen reader",
    readAloud: "Read aloud",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    ttsUnavailable: "Read-aloud isn’t supported in this browser.",
    ttsLang: "en-US",
  },
  ne: {
    title: "ज्ञानको टेबल वरिपरि चार प्रकारका मानिसहरू",
    desc: "कोही आत्मविश्वासका साथ हराएका हुन्छन्। कोही सिक्न नम्र हुन्छन्। कोही ज्ञान राख्छन् तर बोल्दैनन्। र कोही ज्ञान बाँड्छन्।",
    contactHint: "आफ्नै भाषामा चाहिन्छ?",
    contactCta: "सम्पर्क गर्नुहोस्",
    readMore: "थप पढ्नुहोस्",
    showLess: "कम देखाउनुहोस्",
    fullScreen: "पूरा स्क्रिन",
    fullScreenReader: "पूरा स्क्रिन रिडर",
    readAloud: "आवाजमा सुनाउनुहोस्",
    pause: "रोकिनुहोस्",
    resume: "फेरि चलाउनुहोस्",
    stop: "बन्द गर्नुहोस्",
    ttsUnavailable: "यस ब्राउजरमा read-aloud उपलब्ध छैन।",
    ttsLang: "ne-NP",
  },
};

export default function LanguageSwitcher({
  lang,
  onLangChange,
}: {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}) {
  const t = translations[lang];

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75">
        <Languages size={16} />
      </span>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => onLangChange(l)}
            className={`px-3 py-1 text-xs rounded-full border transition ${
              lang === l
                ? "bg-white text-black border-white/10"
                : "bg-transparent text-white/70 border-transparent hover:bg-white/10 hover:text-white"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sr-only"
      >
        <span>{t.title}</span>
        <span>{t.desc}</span>
      </motion.div>
    </div>
  );
}
