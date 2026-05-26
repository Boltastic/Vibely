import { useState } from "react";
import { Copy, Check, Terminal, Wind, Heart, Blocks, Zap, Bot, Sparkles, Orbit, Compass } from "lucide-react";
import { OptimizedPrompt } from "../types";

interface PromptViewerProps {
  platforms: OptimizedPrompt[];
}

export default function PromptViewer({ platforms }: PromptViewerProps) {
  const [activePlatform, setActivePlatform] = useState("Cursor");
  const [copied, setCopied] = useState(false);

  // Helper to resolve icon based on platform
  const getPlatformIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "cursor":
        return <Terminal className="w-4 h-4" />;
      case "windsurf":
        return <Wind className="w-4 h-4" />;
      case "lovable":
        return <Heart className="w-4 h-4" />;
      case "v0":
        return <Blocks className="w-4 h-4" />;
      case "bolt":
        return <Zap className="w-4 h-4" />;
      case "claude":
        return <Bot className="w-4 h-4" />;
      case "gemini":
        return <Sparkles className="w-4 h-4" />;
      case "replit ai":
        return <Orbit className="w-4 h-4" />;
      case "manus":
        return <Compass className="w-4 h-4" />;
      default:
        return <Blocks className="w-4 h-4" />;
    }
  };

  // Platform specific visual headers/details
  const getPlatformMeta = (name: string) => {
    switch (name.toLowerCase()) {
      case "cursor":
        return {
          description: "Premium code editor highlighting custom codebase indexing and multi-file editing rules.",
          pillColor: "bg-blue-50 text-blue-700 border-blue-100",
          bestFor: "Full-Stack Custom Deployments"
        };
      case "windsurf":
        return {
          description: "MDI code orchestrator leveraging deep agentic context to align multiple system file writes concurrently.",
          pillColor: "bg-purple-50 text-purple-700 border-purple-100",
          bestFor: "Complex Algorithmic Refactoring"
        };
      case "lovable":
        return {
          description: "State-of-the-art SaaS designer optimized for luxurious, polished UI code with out-of-the-box storage integrations.",
          pillColor: "bg-pink-50 text-pink-700 border-pink-100",
          bestFor: "Perfect Polished SaaS Frontends"
        };
      case "v0":
        return {
          description: "Vercel's high-fidelity React component model specializing in modular Tailwind CSS and bento layouts.",
          pillColor: "bg-neutral-150 text-neutral-800 border-neutral-300",
          bestFor: "Bento-grid Mockups & Components"
        };
      case "bolt":
        return {
          description: "One-click complete web compiler bootstrapping fully running client-side states directly inside your tab.",
          pillColor: "bg-amber-50 text-amber-700 border-amber-100",
          bestFor: "Rapid Boilerplate Scaffolding"
        };
      case "claude":
        return {
          description: "Ultimate deep reasoning language model suitable for coding clean typescript templates and design blueprints.",
          pillColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
          bestFor: "Pristine Architectural Integrity"
        };
      case "gemini":
        return {
          description: "Google's ultra-concurrency, long-context system managing state triggers, database schemas, and structured operations.",
          pillColor: "bg-red-50 text-red-700 border-red-100",
          bestFor: "Structured Core Schemas & APIs"
        };
      case "replit ai":
        return {
          description: "Rapid workspace builder bridging custom backend sandboxes with instant server operations.",
          pillColor: "bg-sky-50 text-sky-700 border-sky-100",
          bestFor: "Sandbox Prototypes & Backends"
        };
      case "manus":
        return {
          description: "Fully autonomous agent executing online trends research, file-creation plans, error fixing, and deployment pipelines.",
          pillColor: "bg-teal-50 text-teal-700 border-teal-100",
          bestFor: "End-to-End Autonomous Workflows"
        };
      default:
        return {
          description: "Automated generative model optimizing prompts for fast execution.",
          pillColor: "bg-neutral-100 text-neutral-800 border-neutral-200",
          bestFor: "General Utility Builder Model"
        };
    }
  };

  const selectedData = platforms.find(p => p.platform.toLowerCase() === activePlatform.toLowerCase()) || platforms[0];
  const meta = getPlatformMeta(selectedData?.platform || "Cursor");

  const copyToClipboard = () => {
    if (!selectedData) return;
    navigator.clipboard.writeText(selectedData.prompt);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Platform Sidebar Switcher */}
      <div className="w-full md:w-1/4 shrink-0 flex flex-col gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-red-600 font-mono mb-2">
          Platform Optimization Set
        </h3>

        {/* Vertical/Horizontal platforms panel */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible pb-3 md:pb-0 gap-2 scrollbar-none">
          {platforms.map((plat) => {
            const isActive = activePlatform.toLowerCase() === plat.platform.toLowerCase();
            return (
              <button
                key={plat.platform}
                id={`platform-btn-${plat.platform.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActivePlatform(plat.platform)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold transition-all shrink-0 md:w-full border ${
                  isActive
                    ? "bg-neutral-950 text-white border-neutral-950 shadow-md"
                    : "bg-neutral-50 text-neutral-600 border-neutral-100 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? "text-red-500 bg-white/10" : "text-neutral-500"}`}>
                  {getPlatformIcon(plat.platform)}
                </div>
                <span>{plat.platform}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optimized Prompt Output Workbench */}
      <div className="flex-1 flex flex-col gap-5 border-t md:border-t-0 md:border-l border-neutral-100 pt-6 md:pt-0 md:pl-8">
        {selectedData ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-xl font-bold tracking-tight text-neutral-900">
                    {selectedData.platform} Configured Prompt
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${meta.pillColor}`}>
                    {meta.bestFor}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-xl">
                  {meta.description}
                </p>
              </div>

              {/* Copy control button */}
              <button
                id="copy-prompt-btn"
                onClick={copyToClipboard}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all shadow-sm shrink-0 self-start sm:self-center ${
                  copied
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-red-600" />
                    <span>PROMPT COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-500" />
                    <span>COPY PROMPT TO CLIPBOARD</span>
                  </>
                )}
              </button>
            </div>

            {/* Structured code field block */}
            <div className="relative rounded-2xl bg-neutral-950 p-6 font-mono text-xs text-neutral-300 overflow-hidden group hover:shadow-xl transition-all border border-neutral-800">
              <div className="absolute right-3 top-3 px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 text-[10px] font-bold border border-neutral-800 tracking-wider">
                OPTIMIZED PROMPT PREVIEW
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed max-h-[280px] overflow-y-auto selection:bg-red-900 selection:text-white focus:outline-none pr-4">
                {selectedData.prompt}
              </pre>
            </div>

            {/* Focus Points advantages lists */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-3">
                Prompt DNA Design Advantages
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedData.focusPoints.map((point, index) => (
                  <div key={index} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold font-mono shrink-0">
                      0{index + 1}
                    </span>
                    <span className="text-xs text-neutral-700 leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-neutral-400">
            <Orbit className="w-12 h-12 text-neutral-300 animate-spin mb-3" />
            <p className="text-sm">Synthesizing platform profiles...</p>
          </div>
        )}
      </div>
    </div>
  );
}
