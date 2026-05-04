"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const languages = ["en", "ne", "hi"] as const;
type Lang = (typeof languages)[number];

const translations = {
  en: {
    title: "Four kinds of people around the table of knowledge.",
    desc: "Some are confidently lost. Some are humble enough to learn. Some hold knowledge silently. And some turn knowledge into wisdom by sharing it.",
    readMore: "Read more",
  },
  ne: {
    title: "ज्ञानको टेबल वरिपरि चार प्रकारका मानिसहरू",
    desc: "कोही आत्मविश्वासका साथ हराएका हुन्छन्। कोही सिक्न नम्र हुन्छन्। कोही ज्ञान राख्छन् तर बोल्दैनन्। र कोही ज्ञान बाँड्छन्।",
    readMore: "थप पढ्नुहोस्",
  },
  hi: {
    title: "ज्ञान की मेज़ पर चार तरह के लोग",
    desc: "कुछ लोग आत्मविश्वास के साथ अनजान होते हैं। कुछ सीखने के लिए विनम्र होते हैं। कुछ जानते हैं पर बताते नहीं। और कुछ ज्ञान साझा करते हैं।",
    readMore: "और पढ़ें",
  },
};

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<Lang>("en");

  const t = translations[lang];

  return (
    <div className="absolute top-6 left-6 z-50">
      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 text-xs rounded-full border ${
              lang === l
                ? "bg-white text-black"
                : "bg-white/10 text-white border-white/20"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Animated Text */}
      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md"
      >
        <h1 className="text-lg font-semibold">{t.title}</h1>
        <p className="text-sm text-white/70 mt-2">{t.desc}</p>
      </motion.div>
    </div>
  );
}
