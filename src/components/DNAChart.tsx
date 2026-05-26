import { motion } from "motion/react";
import { Info, HelpCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { PromptDNA } from "../types";

interface DNAChartProps {
  dna: PromptDNA;
}

export default function DNAChart({ dna }: DNAChartProps) {
  // Helpers to get styling depending on scores
  const getScoreColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score < 30) return "text-emerald-600 stroke-emerald-500 bg-emerald-50 border-emerald-100";
      if (score < 60) return "text-amber-600 stroke-amber-500 bg-amber-50 border-amber-100";
      return "text-red-600 stroke-red-500 bg-red-50 border-red-100";
    } else {
      if (score > 80) return "text-red-600 stroke-red-500 bg-red-50 border-red-100";
      if (score > 50) return "text-neutral-900 stroke-neutral-800 bg-neutral-50 border-neutral-200";
      return "text-neutral-500 stroke-neutral-400 bg-neutral-50 border-neutral-200";
    }
  };

  const RadialGauge = ({ score, label, description, inverse = false }: { score: number; label: string; description: string; inverse?: boolean }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    const styles = getScoreColor(score, inverse);

    return (
      <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm relative group hover:border-red-200 transition-all">
        <div className="relative w-24 h-24">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-neutral-100 fill-none"
              strokeWidth="7"
            />
            {/* Animated foreground indicator circle */}
            <motion.circle
              cx="48"
              cy="48"
              r={radius}
              className={`fill-none ${styles.split(" ")[1]}`}
              strokeWidth="7"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          {/* Central score indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tracking-tight text-neutral-900">{score}%</span>
          </div>
        </div>

        <span className="mt-3 text-sm font-semibold text-neutral-800 text-center">{label}</span>
        
        {/* Hover info pill */}
        <div className="mt-1 text-[11px] text-neutral-500 text-center px-1 leading-snug">
          {description}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-neutral-900 flex items-center gap-2">
            Prompt DNA Integrity Analyzer
          </h3>
          <p className="text-xs text-neutral-500">
            Algorithmic simulation checking prompt structures and code completion feasibility.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-mono font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          DNA ANALYZED
        </div>
      </div>

      {/* Grid of radial dials */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <RadialGauge
          score={dna.clarity}
          label="Concept Clarity"
          description="How unambiguous the core feature boundaries are."
        />
        <RadialGauge
          score={dna.scalability}
          label="Scalability Index"
          description="Architecture capacity to hold additional logic."
        />
        <RadialGauge
          score={dna.hallucinationRisk}
          label="Hallucination Risk"
          description="Chance of AI making up nonexistent API modules."
          inverse={true}
        />
        <RadialGauge
          score={dna.completeness}
          label="Completeness Score"
          description="Coverage of UI, model, specifications, routes."
        />
        <RadialGauge
          score={dna.aiFriendliness}
          label="AI Engine Affinity"
          description="Direct utility alignment with coding system LLMs."
        />
      </div>

      {/* Brief analytical statement card */}
      <div className="w-full p-5 rounded-2xl bg-white border border-red-100 flex items-start gap-4">
        <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-100 shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-neutral-900 mb-1">Architectural DNA Synthesis Report</h4>
          <p className="text-neutral-600 text-sm leading-relaxed">{dna.analysis}</p>
        </div>
      </div>
    </div>
  );
}
