"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Brain,
  BookOpen,
  Share2,
  Clock,
  Maximize2,
  X,
  Volume2,
  Pause,
  Play,
  CircleStop,
  Mail,
} from "lucide-react";

import LanguageSwitcher, {
  translations,
  type Lang,
} from "@/components/Translation";

const shortPoints = [
  {
    title: "The Blind Confident",
    text: "They don’t know, and don’t even know they don’t know.",
  },
  {
    title: "The Honest Beginner",
    text: "They know they don’t know, so learning can begin.",
  },
  {
    title: "The Silent Knower",
    text: "They know something, but doubt it, hide it, or fail to share it.",
  },
  {
    title: "The Wise Sharer",
    text: "They know, understand, and pass knowledge forward.",
  },
];

const fullText = `Your four categories map surprisingly well onto psychology, philosophy, and history. They are not just types of people; they are stages of awareness.

First, there are people who don’t know and don’t know that they don’t know. This is dangerous because ignorance mixed with confidence becomes arrogance. Psychology connects this with the Dunning–Kruger effect, where people with low skill often overestimate themselves. Socrates challenged this kind of false certainty by questioning people who claimed wisdom but could not defend their ideas.

Second, there are people who know that they don’t know. This is the beginning of wisdom. Socrates is remembered for the idea that true wisdom begins with recognizing one’s ignorance. In learning theory, this is conscious incompetence: uncomfortable, but necessary. Once you see the gap, you can begin to grow.

Third, there are people who know, but don’t realize it fully or don’t share it. Some suffer from impostor syndrome and underestimate their knowledge. Others withhold knowledge because information can be power. History shows that when knowledge is restricted, society slows down. Knowledge hidden inside one mind has limited impact.

Fourth, there are people who know their craft and share it. This is where knowledge becomes useful beyond the self. Teachers, philosophers, scientists, developers, and writers all move society forward by making knowledge accessible. Newton’s discoveries mattered not only because he understood them, but because he published them.

So the real journey is this: from unconscious ignorance, to humble awareness, to responsible knowledge, to shared wisdom.`;

const AUTHOR_NAME = "S2ope";
const AUTHOR_AVATAR_SRC = "/author.jpg";
const AUTHOR_INITIALS = getInitials(AUTHOR_NAME);
const READ_TIME_MINUTES = getReadTimeMinutes(fullText);
const CONTACT_EMAIL = "contact@fourtypes.com";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.map((part) => part[0]).join("").slice(0, 2);
  return initials.toUpperCase() || "A";
}

function getReadTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getSpeakText({
  title,
  desc,
  body,
}: {
  title: string;
  desc: string;
  body: string;
}) {
  return [title, desc, body].filter(Boolean).join("\n\n").trim();
}

export default function KnowledgePhilosophersCard() {
  const [lang, setLang] = useState<Lang>("ne");
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [avatarErrored, setAvatarErrored] = useState(false);
  const [ttsState, setTtsState] = useState<"idle" | "speaking" | "paused">(
    "idle",
  );
  const [ttsHint, setTtsHint] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const t = translations[lang];

  const contactHref = useMemo(() => {
    const subject = encodeURIComponent(`Language request (${lang.toUpperCase()})`);
    const body = encodeURIComponent(
      `Hi,\n\nI’d like to request this content in my language.\n\nLanguage: ${lang.toUpperCase()}\n\nThanks!`,
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }, [lang]);

  const isTtsSupported = useMemo(() => {
    return (
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      typeof window.SpeechSynthesisUtterance !== "undefined"
    );
  }, []);

  const stopSpeaking = useCallback(() => {
    if (!isTtsSupported) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setTtsState("idle");
  }, [isTtsSupported]);

  const handleLangChange = useCallback(
    (nextLang: Lang) => {
      if (nextLang === lang) return;
      stopSpeaking();
      setLang(nextLang);
    },
    [lang, stopSpeaking],
  );

  const startSpeaking = useCallback(() => {
    if (!isTtsSupported) {
      setTtsHint(t.ttsUnavailable);
      setTimeout(() => setTtsHint(null), 2500);
      return;
    }

    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(
      getSpeakText({ title: t.title, desc: t.desc, body: fullText }),
    );
    utterance.lang = t.ttsLang;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => {
      utteranceRef.current = null;
      setTtsState("idle");
    };
    utterance.onerror = () => {
      utteranceRef.current = null;
      setTtsState("idle");
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setTtsState("speaking");
  }, [isTtsSupported, stopSpeaking, t]);

  const pauseSpeaking = useCallback(() => {
    if (!isTtsSupported) return;
    window.speechSynthesis.pause();
    setTtsState("paused");
  }, [isTtsSupported]);

  const resumeSpeaking = useCallback(() => {
    if (!isTtsSupported) return;
    window.speechSynthesis.resume();
    setTtsState("speaking");
  }, [isTtsSupported]);

  useEffect(() => {
    if (!isReaderOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsReaderOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      stopSpeaking();
    };
  }, [isReaderOpen, stopSpeaking]);

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur md:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%)]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70"
                >
                  <Brain size={14} /> Human Awareness
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <LanguageSwitcher
                    lang={lang}
                    onLangChange={handleLangChange}
                  />
                </motion.div>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {t.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70"
              >
                <div className="flex items-center gap-2">
                  {avatarErrored ? (
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-xs font-semibold text-white ring-1 ring-white/10">
                      {AUTHOR_INITIALS}
                    </div>
                  ) : (
                    <Image
                      src={AUTHOR_AVATAR_SRC}
                      alt={AUTHOR_NAME}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
                      onError={() => setAvatarErrored(true)}
                    />
                  )}
                  <span className="font-medium text-white/80">
                    {AUTHOR_NAME}
                  </span>
                </div>

                <span className="h-4 w-px bg-white/10" aria-hidden />

                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75">
                  <Clock size={14} />
                  {READ_TIME_MINUTES} min read
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg"
              >
                {t.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/45"
              >
                <Mail size={14} className="text-white/40" />
                <span>{t.contactHint}</span>
                <a
                  href={contactHref}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  {t.contactCta}
                </a>
              </motion.div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {shortPoints.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + index * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {index + 1}. {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen(!open)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                >
                  {open ? t.showLess : t.readMore}
                  {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </motion.button>

                {open && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsReaderOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    {t.fullScreen} <Maximize2 size={16} />
                  </motion.button>
                )}
              </div>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                      {fullText.split("\n\n").map((paragraph) => (
                        <p key={paragraph} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex min-h-[420px] items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute h-80 w-80 rounded-full border border-dashed border-white/15 sm:h-96 sm:w-96"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-2xl"
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-neutral-950">
                  <BookOpen size={42} />
                </div>
                {/* <p className="absolute -bottom-10 text-center text-sm text-white/60">
                  The table of knowledge
                </p> */}
              </motion.div>

              {shortPoints.map((item, index) => {
                const positions = [
                  "left-1/2 top-0 -translate-x-1/2",
                  "right-0 top-1/2 -translate-y-1/2",
                  "bottom-0 left-1/2 -translate-x-1/2",
                  "left-0 top-1/2 -translate-y-1/2",
                ];

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.12 }}
                    className={`absolute ${positions[index]} flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-white/10 bg-neutral-900 p-3 text-center shadow-xl sm:h-28 sm:w-28`}
                  >
                    <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-[11px] font-medium leading-4 text-white/75 sm:text-xs">
                      {item.title}
                    </span>
                  </motion.div>
                );
              })}

              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className={`absolute h-px w-28 origin-center bg-white/15 ${
                    index === 0
                      ? "top-[23%] rotate-90"
                      : index === 1
                        ? "right-[24%]"
                        : index === 2
                          ? "bottom-[23%] rotate-90"
                          : "left-[24%]"
                  }`}
                />
              ))}

              <motion.div
                onClick={() => {
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 2500);
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-6 top-6 cursor-pointer rounded-2xl border border-yellow-400/30 bg-yellow-400/20 p-3"
              >
                <Share2 size={22} className="text-yellow-300" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isReaderOpen && (
          <motion.div
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <motion.button
              type="button"
              aria-label="Close reader"
              onClick={() => setIsReaderOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative mx-auto mt-8 max-h-[calc(100vh-4rem)] w-[min(920px,calc(100%-2rem))] overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-5">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/55">
                    {t.fullScreenReader}
                  </p>
                  <h2 className="mt-2 truncate text-lg font-semibold text-white sm:text-xl">
                    {t.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      {avatarErrored ? (
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-xs font-semibold text-white ring-1 ring-white/10">
                          {AUTHOR_INITIALS}
                        </div>
                      ) : (
                        <Image
                          src={AUTHOR_AVATAR_SRC}
                          alt={AUTHOR_NAME}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
                          onError={() => setAvatarErrored(true)}
                        />
                      )}
                      <span className="font-medium text-white/80">
                        {AUTHOR_NAME}
                      </span>
                    </div>

                    <span className="h-4 w-px bg-white/10" aria-hidden />

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75">
                      <Clock size={14} />
                      {READ_TIME_MINUTES} min read
                    </span>
                  </div>

                  {ttsHint && (
                    <p className="mt-3 text-xs text-white/55">{ttsHint}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {ttsState === "idle" ? (
                    <button
                      type="button"
                      onClick={startSpeaking}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                    >
                      <Volume2 size={16} />
                      <span className="hidden sm:inline">{t.readAloud}</span>
                      <span className="sm:hidden">TTS</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {ttsState === "speaking" ? (
                        <button
                          type="button"
                          aria-label={t.pause}
                          onClick={pauseSpeaking}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                        >
                          <Pause size={18} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          aria-label={t.resume}
                          onClick={resumeSpeaking}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                        >
                          <Play size={18} />
                        </button>
                      )}

                      <button
                        type="button"
                        aria-label={t.stop}
                        onClick={stopSpeaking}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                      >
                        <CircleStop size={18} />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setIsReaderOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="max-h-[calc(100vh-12rem)] overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
                <div className="mx-auto max-w-3xl">
                  {fullText.split("\n\n").map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mb-6 text-base leading-8 text-white/75 last:mb-0 sm:text-[17px] sm:leading-9"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border border-yellow-400/40 bg-yellow-300 px-5 py-2 text-sm font-semibold text-black shadow-lg"
          >
            Coming Soon
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
