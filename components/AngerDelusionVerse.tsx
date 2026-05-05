"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "1. Contemplation",
    sanskrit: "Dhyāyato viṣayān",
    text: "The mind repeatedly thinks about sense objects, people, pleasure, status, or outcomes.",
  },
  {
    title: "2. Attachment",
    sanskrit: "Saṅgas teṣūpajāyate",
    text: "Repeated thought creates attachment: “I like this. I want this.”",
  },
  {
    title: "3. Desire",
    sanskrit: "Saṅgāt sañjāyate kāmaḥ",
    text: "Attachment becomes craving. Preference turns into need.",
  },
  {
    title: "4. Anger",
    sanskrit: "Kāmāt krodho ’bhijāyate",
    text: "When desire is blocked, delayed, or threatened, anger arises.",
  },
  {
    title: "5. Delusion",
    sanskrit: "Krodhād bhavati sammohaḥ",
    text: "Anger clouds perception. Reality becomes distorted.",
  },
  {
    title: "6. Loss of Memory",
    sanskrit: "Sammohāt smṛti-vibhramaḥ",
    text: "One forgets wisdom, values, discipline, and past understanding.",
  },
  {
    title: "7. Loss of Intelligence",
    sanskrit: "Smṛti-bhraṁśād buddhi-nāśaḥ",
    text: "Decision-making collapses. Impulse defeats clarity.",
  },
  {
    title: "8. Fall",
    sanskrit: "Buddhi-nāśāt praṇaśyati",
    text: "When intelligence is destroyed, one falls into suffering and wrong action.",
  },
];

export default function AngerDelusionVerse() {
  return (
    <section className="relative overflow-hidden bg-[#07030f] px-5 py-24 text-white">
      {/* Mystical background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed33,transparent_35%),radial-gradient(circle_at_bottom,#f59e0b22,transparent_35%)]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-amber-300/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-300">
            Bhagavad Gita · 2.62–2.63
          </p>

          <h2 className="mb-6 text-4xl font-semibold tracking-tight md:text-6xl">
            How Anger Becomes Delusion
          </h2>

          <p className="text-base leading-8 text-white/70 md:text-lg">
            Krishna reveals the inner chain of downfall: thought becomes
            attachment, attachment becomes desire, desire becomes anger, and
            anger covers wisdom.
          </p>
        </motion.div>

        {/* Verse Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-24 max-w-4xl rounded-[2rem] border border-amber-300/20 bg-white/[0.04] p-8 shadow-2xl shadow-purple-950/40 backdrop-blur md:p-12"
        >
          <p className="mb-6 text-center text-xl leading-10 text-amber-100 md:text-2xl">
            ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । <br />
            सङ्गात् संजायते कामः कामात् क्रोधोऽभिजायते ॥
          </p>

          <p className="text-center text-xl leading-10 text-amber-100 md:text-2xl">
            क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः । <br />
            स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:border-amber-300/40 hover:bg-white/[0.07]"
            >
              <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-amber-300/20 via-purple-500/10 to-transparent opacity-0 blur-xl transition group-hover:opacity-100" />

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-lg text-amber-200">
                {index + 1}
              </div>

              <h3 className="mb-2 text-2xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="mb-4 font-serif text-lg italic text-amber-300">
                {step.sanskrit}
              </p>

              <p className="leading-7 text-white/70">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Final Teaching */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mx-auto mt-24 max-w-3xl rounded-[2rem] border border-purple-300/20 bg-purple-500/10 p-8 text-center backdrop-blur"
        >
          <h3 className="mb-4 text-3xl font-semibold text-amber-200">
            The Root Is Not Anger
          </h3>

          <p className="text-lg leading-8 text-white/75">
            Anger is only the flame. Krishna points to the hidden fuel:
            uncontrolled contemplation, attachment, and desire. Break the chain
            early, and delusion never gains power.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
