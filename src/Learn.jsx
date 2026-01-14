import { useState } from "react";

export default function Learn() {
  return (
    <div className="bg-[#f6f3ee] text-[#4a3728] min-h-screen px-6 py-24 space-y-32">
      {/* TITLE */}
      <Reveal>
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif mb-6">Understanding the Impact</h1>
          <p className="text-lg text-[#6b5a4a]">
            Every year, millions of medicines go unused or expire. What happens
            next determines whether they harm or protect our environment.
          </p>
        </section>
      </Reveal>

      {/* WHY IT MATTERS */}
      <Reveal>
        <Section title="Why Medicine Disposal Matters">
          <p>
            Pharmaceuticals are designed to be biologically active — they’re
            meant to change how organisms function.
          </p>
          <p>
            When these compounds enter water systems, soil, and food chains,
            they don’t stop working.
          </p>
          <p>
            Research links pharmaceutical waste to{" "}
            <strong>hormonal disruption</strong>,
            <strong> antibiotic resistance</strong>, and
            <strong> ecosystem imbalance</strong>.
          </p>
        </Section>
      </Reveal>

      {/* FLIP CARDS */}
      <Reveal>
        <Section title="What Happens When You Don’t Dispose Properly">
          <div className="grid md:grid-cols-3 gap-8">
            <FlipCard
              front="🚽 Flushing Down the Toilet"
              back="Medicines enter water treatment systems that aren’t designed to remove pharmaceutical compounds."
            />
            <FlipCard
              front="🗑️ Throwing in Regular Trash"
              back="Landfill leachate can carry active ingredients into groundwater over time."
            />
            <FlipCard
              front="⚠️ Keeping Expired Medicines"
              back="Increases risk of accidental ingestion by children, pets, or medication confusion."
            />
          </div>
        </Section>
      </Reveal>

      {/* ACCORDION */}
      <Reveal>
        <Section title="Medicine Types & Guidelines">
          <div className="rounded-2xl overflow-hidden border border-[#e2dacd]">
            <Accordion
              title="💊 Tablets & Capsules"
              content="Expired or unused tablets and capsules contain active compounds that persist in the environment.
              Safe disposal: Take to designated collection points or pharmacies participating in take-back programs."
            />
            <Accordion
              title="🧴 Liquid Medicines"
              content="Liquid medicines can contaminate water sources when poured down drains.
              Safe disposal: Never pour into sinks. Keep in original containers and deliver to collection points."
            />
            <Accordion
              title="🌿 Herbal & Supplements"
              content="Despite being ‘natural’, supplements contain concentrated compounds.
              Safe disposal: Treat like conventional medicines. Do not compost."
            />
            <Accordion
              title="🔒 Controlled Substances"
              content="Controlled medicines pose misuse risks.
              Safe disposal: Use pharmacy drop-boxes. Never share or give away."
            />
          </div>
        </Section>
      </Reveal>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-serif mb-10">{title}</h2>
      <div className="space-y-4 text-[#6b5a4a]">{children}</div>
    </section>
  );
}

/* -------- Scroll Reveal -------- */

function Reveal({ children }) {
  return <div className="animate-fadeIn">{children}</div>;
}

/* -------- Flip Card -------- */

function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer perspective"
    >
      <div
        className={`relative h-48 rounded-2xl transition-transform duration-700 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-[#efe9df] rounded-2xl shadow flex items-center justify-center text-center p-6 backface-hidden">
          <h3 className="text-xl font-serif">{front}</h3>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-[#dce6db] rounded-2xl shadow flex items-center justify-center text-center p-6 rotate-y-180 backface-hidden">
          <p className="text-sm">{back}</p>
        </div>
      </div>
    </div>
  );
}

/* -------- Accordion -------- */

function Accordion({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#efe9df] border-b border-[#e2dacd]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-6 text-left"
      >
        <span className="text-lg font-serif">{title}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 text-sm text-[#2f6b55] animate-fadeIn">
          {content}
        </div>
      )}
    </div>
  );
}
