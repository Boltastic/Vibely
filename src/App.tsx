import { useState, useEffect, MouseEvent } from "react";
import { 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  History, 
  Save, 
  Download, 
  RefreshCw, 
  FileText, 
  Activity, 
  Info, 
  ShieldAlert, 
  Lightbulb, 
  Zap, 
  Check, 
  Trash2, 
  Search, 
  Database, 
  ArrowUpRight, 
  Lock,
  DollarSign,
  ChevronRight,
  Plus,
  Send,
  LogOut,
  X,
  Compass,
  Wind,
  Heart,
  Blocks,
  Bot,
  Orbit,
  ExternalLink,
  Share2
} from "lucide-react";
import DNAChart from "./components/DNAChart";
import PromptViewer from "./components/PromptViewer";
import AuthModal from "./components/AuthModal";
import { VibelyGeneration, SavedProject, User } from "./types";

// Supported optimized builders we present to users
const OPTIMIZED_PLATFORMS = [
  {
    id: "base44",
    name: "Base44",
    tagline: "AI App builder",
    isRecommended: true,
    description: "Build, launch, and scale interactive apps autonomously with specialized DNA.",
    dots: true
  },
  {
    id: "lovable",
    name: "Lovable",
    tagline: "AI web app builder",
    isRecommended: false,
    description: "Prism layout architectures and production-ready interfaces instantly.",
    dots: false
  },
  {
    id: "v0",
    name: "v0",
    tagline: "Vercel's AI App builder",
    isRecommended: false,
    description: "Sleek, responsive UI components styled styled with elegant Tailwind CSS.",
    dots: false
  },
  {
    id: "manus",
    name: "Manus AI",
    tagline: "AI App builder for web & mobile agent",
    isRecommended: false,
    description: "End-to-end self-correcting agent workflow browser tracking.",
    dots: false
  },
  {
    id: "mocha",
    name: "Mocha",
    tagline: "AI-powered no-code...",
    isRecommended: false,
    description: "Visually build, coordinate, and style layouts at speed.",
    dots: false
  },
  {
    id: "anything",
    name: "Anything",
    tagline: "Mobile app builder",
    isRecommended: false,
    description: "Scaffold clean mobile native widgets and cross-platform views.",
    dots: false
  },
  {
    id: "rork",
    name: "Rork",
    tagline: "Mobile app builder",
    isRecommended: false,
    description: "High-precision mobile native prototypes with streamlined gestures.",
    dots: false
  },
  {
    id: "emergent",
    name: "Emergent",
    tagline: "AI App builder",
    isRecommended: false,
    description: "Autonomous microservice scaffolding, API routers, and db tables.",
    dots: false
  },
  {
    id: "cursor",
    name: "Windsurf / Cursor",
    tagline: "AI-powered IDE",
    isRecommended: false,
    description: "Supercharged desktop local code editor mapping deep contextual reasoning.",
    dots: false
  }
];

export default function App() {
  // Navigation & state step trackers
  const [appStep, setAppStep] = useState<"input" | "platform" | "loading" | "result">("input");
  const [selectedPlatform, setSelectedPlatform] = useState("base44");
  const [hasApiKey, setHasApiKey] = useState(false);
  const [inputIdea, setInputIdea] = useState("");
  const [activeWorkspaceView, setActiveWorkspaceView] = useState<"prompts" | "dna" | "blueprints" | "scaffold">("prompts");
  const [generationCount, setGenerationCount] = useState(23292);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingPercent, setLoadingPercent] = useState(0);

  // Real or synthetic generation state
  const [currentGeneration, setCurrentGeneration] = useState<VibelyGeneration | null>(null);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [saveBanner, setSaveBanner] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Authentication session state controls
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRequiredBanner, setAuthRequiredBanner] = useState<string | null>(null);

  // Polling loading progress subtitles
  const loadingMessages = [
    "Establishing neural prompt baseline...",
    "Injecting model-specific optimization parameters...",
    "Measuring conceptual completeness and hallucination risks...",
    "Structuring PostgreSQL SQL schemas & folder architecture...",
    "Synthesizing elite developer prompt DNA payload..."
  ];

  // Fetch API status & load localStorage items on mount
  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(data.hasApiKey);
      })
      .catch((err) => console.log("Failed to check status:", err));

    // Restore user session
    const cachedUser = localStorage.getItem("vibely_current_user");
    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser));
      } catch (err) {
        console.error("Failed to restore session credentials:", err);
      }
    }

    // Load saved projects
    const saved = localStorage.getItem("vibely_projects");
    if (saved) {
      try {
        setSavedProjects(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse saved projects:", err);
      }
    }

    // Dynamic initial count simulation
    const simulatedInitCount = 23292 + Math.floor(Math.random() * 45);
    setGenerationCount(simulatedInitCount);
  }, []);

  // Simulating the beautiful progressive percentage counter from step 3
  useEffect(() => {
    let percentInterval: NodeJS.Timeout;
    let stepInterval: NodeJS.Timeout;

    if (appStep === "loading") {
      setLoadingPercent(3);
      setLoadingStep(0);

      percentInterval = setInterval(() => {
        setLoadingPercent((prev) => {
          if (prev >= 98) {
            clearInterval(percentInterval);
            return 98;
          }
          const increment = Math.floor(Math.random() * 8) + 3;
          return Math.min(prev + increment, 98);
        });
      }, 250);

      stepInterval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 1400);
    }

    return () => {
      clearInterval(percentInterval);
      clearInterval(stepInterval);
    };
  }, [appStep]);

  // Execute synthesis
  const handleSynthesize = async () => {
    if (!inputIdea.trim()) return;
    setAppStep("loading");
    setErrorBanner(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ concept: inputIdea })
      });

      if (!response.ok) {
        throw new Error("Server synthesis failed with HTTP code " + response.status);
      }

      const data = await response.json();
      setLoadingPercent(100);
      
      // Delay slightly at 100% to let user see completion anim
      setTimeout(() => {
        setCurrentGeneration(data);
        setActiveWorkspaceView("prompts");
        setAppStep("result");
        setGenerationCount(prev => prev + 1);
      }, 600);

    } catch (err: any) {
      console.error(err);
      setErrorBanner(err.message || "Failed to establish secure connection to AI synthesizer.");
      setAppStep("input");
    }
  };

  // Preset triggers
  const handleSelectPreset = (text: string) => {
    setInputIdea(text);
  };

  // Save current project state
  const handleSaveToLab = () => {
    if (!currentGeneration) return;

    const currentOwnerId = currentUser?.id || "guest";
    const exists = savedProjects.some(
      p => p.generation.idea === currentGeneration.idea && (p.ownerId || "guest") === currentOwnerId
    );
    if (exists) {
      setSaveBanner(true);
      setTimeout(() => setSaveBanner(false), 3000);
      return;
    }

    const newPrj: SavedProject = {
      id: Math.random().toString(36).substring(2, 9),
      ownerId: currentOwnerId,
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      title: currentGeneration.title,
      description: currentGeneration.description,
      category: currentGeneration.category,
      generation: currentGeneration
    };

    const updated = [newPrj, ...savedProjects];
    setSavedProjects(updated);
    localStorage.setItem("vibely_projects", JSON.stringify(updated));

    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);

    if (!currentUser) {
      setAuthRequiredBanner("Blueprint saved to Guest session. Log in or create an account to secure your files forever!");
      setTimeout(() => setAuthRequiredBanner(null), 8500);
    }
  };

  // Delete Project
  const handleDeletePrj = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const filtered = savedProjects.filter(p => p.id !== id);
    setSavedProjects(filtered);
    localStorage.setItem("vibely_projects", JSON.stringify(filtered));
  };

  // Load project from lab to active workspace
  const handleLoadPrj = (prj: SavedProject) => {
    setCurrentGeneration(prj.generation);
    setInputIdea(prj.generation.idea);
    setSelectedPlatform("base44");
    setActiveWorkspaceView("prompts");
    setAppStep("result");
  };

  // Reset to new app idea
  const handleNewIdea = () => {
    setCurrentGeneration(null);
    setInputIdea("");
    setAppStep("input");
  };

  // Download files helper
  const handleExportTextFile = (filename: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportAsPRD = () => {
    if (!currentGeneration) return;
    const model = currentGeneration;
    const prdText = `# PRD - ${model.title}
## Core Tagline: ${model.description}
### Category: ${model.category}

---

## 1. Product Architectural Design
${model.architecture}

## 2. Dynamic Specifications & Constraints
${model.specs}

## 3. High-Contrast Design Guidelines
${model.uiInstructions}

## 4. Backend Systems & API Schemas
${model.backendReqs}

---
*Synthesized via Vibely Engine*`;
    handleExportTextFile(`${model.title.toLowerCase().replace(/\s+/g, "_")}_prd.md`, prdText);
  };

  const exportAsReadme = () => {
    if (!currentGeneration) return;
    const model = currentGeneration;
    const cursorPrompt = model.platforms.find(p => p.platform === "Cursor")?.prompt || "";
    const readme = `# ${model.title} - Prototype Seed

Our rough vision:
> "${model.idea}"

## Suggested Stack Selector
- **Frontend Framework:** ${model.stack.frontend}
- **Server API Layer:** ${model.stack.backend}
- **Primary Database:** ${model.stack.database}
- **Security Auth Systems:** ${model.stack.authProvider}
- **Hosting Cluster:** ${model.stack.hosting}

## Optimized Prompt Seed for Cursor / Multi-file agent:
\`\`\`text
${cursorPrompt}
\`\`\`

---
Generated autonomously by Vibely AI.`;
    handleExportTextFile(`README.md`, readme);
  };

  const exportAsJSON = () => {
    if (!currentGeneration) return;
    handleExportTextFile(
      `${currentGeneration.title.toLowerCase().replace(/\s+/g, "_")}_vibely.json`, 
      JSON.stringify(currentGeneration, null, 2)
    );
  };

  // AuthSuccess & Logout
  const handleLogout = () => {
    localStorage.removeItem("vibely_current_user");
    setCurrentUser(null);
    setAppStep("input");
    setCurrentGeneration(null);
  };

  const handleAuthSuccess = (user: User) => {
    localStorage.setItem("vibely_current_user", JSON.stringify(user));
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  // Filter ideas list
  const filteredProjects = savedProjects
    .filter(p => {
      const currentOwnerId = currentUser?.id || "guest";
      return (p.ownerId || "guest") === currentOwnerId;
    })
    .filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.generation.idea.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#fafafc] text-neutral-900 font-sans selection:bg-red-100 selection:text-red-900 flex antialiased">
      
      {/* ================= LEFT SIDEBAR (LIGHT THEME) ================= */}
      <aside className="w-80 border-r border-[#e3e3e8] bg-white flex flex-col justify-between shrink-0 h-screen sticky top-0 md:flex hidden">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Heading */}
          <div className="p-6 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-650 flex items-center justify-center text-white font-mono font-black border border-red-500/30 shadow-md">
                &lt;/v
              </div>
              <div>
                <h1 className="text-xl font-bold font-display tracking-tight text-neutral-900 flex items-center gap-1.5">
                  Vibely
                </h1>
                <span className="text-[10px] font-mono tracking-wider text-red-600 font-bold block uppercase -mt-0.5">
                  AI Synthesis Engine
                </span>
              </div>
            </div>
          </div>

          {/* New Brainstorm Idea CTA Pill */}
          <div className="px-4 py-4 border-b border-[#e3e3e8]">
            <button
              id="sidebar-new-idea-btn"
              onClick={handleNewIdea}
              className="w-full py-3 px-4 bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/60 rounded-xl text-xs font-bold text-neutral-900 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm group font-display"
            >
              <Plus className="w-4 h-4 text-red-650 font-bold transition-transform group-hover:scale-110" />
              <span>New app idea</span>
            </button>
          </div>

          {/* Discover Segment */}
          <div className="px-3 pt-4">
            <button
              onClick={handleNewIdea}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 font-display uppercase tracking-wider rounded-lg hover:bg-zinc-50 transition-all"
            >
              <Compass className="w-4 h-4 text-neutral-400" />
              <span>Discover</span>
            </button>
          </div>

          {/* History Segment List */}
          <div className="flex-1 px-3 py-4 flex flex-col gap-3 min-h-0 overflow-y-auto">
            <span className="px-4 text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-black flex items-center justify-between">
              <span>All Ideas</span>
              {filteredProjects.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-zinc-100 text-[9.5px] text-neutral-600 font-bold">
                  {filteredProjects.length}
                </span>
              )}
            </span>

            {/* Simple Search within Sidebar */}
            {savedProjects.length > 0 && (
              <div className="px-2 relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-5 top-2.5" />
                <input
                  id="sidebar-search-input"
                  type="text"
                  placeholder="Filter ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200/50 text-[11px] focus:bg-white focus:outline-none transition-all placeholder:text-neutral-400"
                />
              </div>
            )}

            <div className="flex flex-col gap-1 overflow-y-auto max-h-[360px] scrollbar-none">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((prj) => {
                  const isActive = currentGeneration?.idea === prj.generation.idea;
                  return (
                    <div
                      key={prj.id}
                      id={`sidebar-saved-idea-${prj.id}`}
                      onClick={() => handleLoadPrj(prj)}
                      className={`group w-full p-3 rounded-xl text-left transition-all flex items-start justify-between border cursor-pointer ${
                        isActive
                          ? "bg-zinc-100/90 border-[#dedee2] shadow-sm"
                          : "border-transparent bg-transparent hover:bg-zinc-50"
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <p className={`text-xs font-bold truncate ${isActive ? "text-neutral-900" : "text-neutral-700 group-hover:text-red-655"}`}>
                          {prj.title}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate mt-0.5 font-mono">
                          {prj.category}
                        </p>
                      </div>
                      
                      <button
                        onClick={(e) => handleDeletePrj(prj.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all self-center"
                        title="Delete app concept"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-6 text-neutral-400 flex flex-col gap-1.5 items-center justify-center">
                  <Terminal className="w-6 h-6 text-neutral-300 stroke-[1.5]" />
                  <span className="text-[10px] leading-snug">No ideas yet. Brainstorm your first draft!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar bottom cards with premium layout */}
        <div className="p-4 border-t border-[#e3e3e8] bg-zinc-50 flex flex-col gap-3">
          {/* Share Vibely Card */}
          <div className="p-3 rounded-xl bg-white border border-[#e3e3e8] shadow-sm flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 border border-red-200/20 flex items-center justify-center shrink-0">
                <Share2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-neutral-800 tracking-tight truncate">Share Vibely</p>
                <p className="text-[9.5px] text-neutral-500 font-mono tracking-wide">Get 10 generations each</p>
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("App sharing link copy successful!");
              }}
              className="px-2.5 py-1.5 bg-neutral-950 text-white rounded-lg text-[9px] font-bold hover:bg-neutral-800 transition-all uppercase tracking-wider shrink-0"
            >
              Copy
            </button>
          </div>

          {/* Telegram Community Card (replaces Discord!) */}
          <a
            href="https://t.me/ViralZap"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#22a5e2]/8 border border-[#cbe5f5] hover:bg-[#22a5e2]/12 transition-all shadow-sm flex items-center justify-between gap-2.5 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#22a5e2]/20 text-[#118bc2] border border-[#22a5e2]/10 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-[#1a8dc4]" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-neutral-900 tracking-tight truncate flex items-center gap-1.5">
                  Telegram channel
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                </p>
                <p className="text-[9.5px] text-neutral-500 font-mono tracking-wide">ViralZap Community</p>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#22a5e2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>
        </div>
      </aside>

      {/* ================= MAIN CANVASES AREA ================= */}
      <main className="flex-1 min-h-screen flex flex-col justify-between overflow-x-hidden relative">
        
        {/* Soft glowing ambient light source matching the brand blueprint */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-red-650/4 rounded-full blur-[140px] pointer-events-none z-0" />
        
        {/* Top Floating action bar */}
        <header className="w-full px-6 py-4 border-b border-[#e3e3e8]/70 bg-white/70 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Header Brand identifier */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-650 flex items-center justify-center text-white font-mono font-black text-xs">
                &lt;/
              </div>
              <span className="font-extrabold text-sm tracking-tight font-display">Vibely</span>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            {/* API Key Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono select-none">
              <span className={`w-2 h-2 rounded-full ${hasApiKey ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
              <span className="text-neutral-400 uppercase tracking-widest font-bold">
                {hasApiKey ? "Gemini 3.5 live link" : "High-fidelity local synthesis"}
              </span>
            </div>

            {/* Authentication States Controls */}
            {currentUser ? (
              <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200/50 rounded-xl px-3 py-1.5 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-red-650 text-white font-black text-[11px] flex items-center justify-center uppercase shadow border border-red-500/20">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[10px] font-bold text-neutral-800 tracking-tight leading-none whitespace-nowrap">{currentUser.name}</p>
                  <p className="text-[8.5px] text-neutral-400 font-mono leading-none mt-0.5">{currentUser.role}</p>
                </div>
                <button
                  id="header-logout-btn"
                  onClick={handleLogout}
                  className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all shrink-0 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl shadow-md hover:bg-neutral-800 hover:shadow-lg transition-all cursor-pointer font-display"
              >
                Log in
              </button>
            )}
          </div>
        </header>

        {/* Core display views */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center items-center relative z-10 max-w-7xl mx-auto w-full">
          
          {/* Global Alert Banners */}
          {authRequiredBanner && (
            <div className="w-full max-w-4xl mb-6 p-4 rounded-2xl bg-gradient-to-r from-red-650 to-neutral-955 border border-red-500 text-white text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-scaleIn shadow-xl">
              <span className="flex items-center gap-2.5 font-semibold">
                <Lock className="w-4 h-4 shrink-0 text-red-400 animate-pulse" />
                <span className="leading-relaxed">{authRequiredBanner}</span>
              </span>
              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => {
                    setAuthRequiredBanner(null);
                    setShowAuthModal(true);
                  }}
                  className="px-3 py-1.5 bg-white text-neutral-900 rounded-lg text-[10px] font-bold shadow hover:bg-neutral-50 transition-all cursor-pointer"
                >
                  Sign In Now
                </button>
                <button 
                  onClick={() => setAuthRequiredBanner(null)} 
                  className="text-[10px] font-mono font-bold uppercase underline tracking-wider text-red-300 hover:text-white"
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          {errorBanner && (
            <div className="w-full max-w-4xl mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between gap-3 animate-scaleIn">
              <span className="flex items-center gap-2 font-semibold leading-normal">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {errorBanner}
              </span>
              <button 
                onClick={() => setErrorBanner(null)} 
                className="text-[10px] font-mono font-bold uppercase underline tracking-wider hover:text-red-700 font-display"
              >
                Dismiss
              </button>
            </div>
          )}

          {saveBanner && (
            <div className="fixed bottom-6 right-6 z-[100] p-4 rounded-2xl bg-neutral-955 border border-neutral-850 text-white shadow-2xl flex items-center gap-3 animate-scaleIn">
              <Check className="w-5 h-5 text-red-600" />
              <div className="text-left text-xs">
                <p className="font-bold">DNA Vector Logged!</p>
                <p className="text-neutral-400">Locked safely inside your concept sandbox.</p>
              </div>
            </div>
          )}

          {/* ================= STEP 1: BRADY SLATE INPUT BLOCK (SCREENSHOT 1 & 2) ================= */}
          {appStep === "input" && (
            <div className="w-full max-w-2xl flex flex-col gap-8 animate-fadeIn text-center my-auto py-12">
              <div className="flex flex-col gap-3">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 font-display">
                  Vibely your app idea
                </h2>
                <p className="text-sm font-mono text-neutral-500 tracking-wide font-medium">
                  <span className="text-red-600 tracking-wider font-bold block sm:inline mr-1">{generationCount.toLocaleString()}</span>
                  <span>app ideas braindumped so far</span>
                </p>
              </div>

              {/* Large Text input card container */}
              <div className="w-full bg-white rounded-3xl border border-[#e3e3e8] shadow-sm p-4 relative focus-within:border-red-300 focus-within:shadow-md transition-all text-left">
                <textarea
                  id="concept-textarea"
                  rows={4}
                  value={inputIdea}
                  onChange={(e) => setInputIdea(e.target.value)}
                  placeholder="Describe your app idea..."
                  className="w-full px-4 py-3 placeholder-neutral-400 font-sans text-sm text-neutral-800 bg-transparent resize-none border-none focus:outline-none leading-relaxed"
                />
                
                {/* Submit Action circle icon */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-150 border-dotted mt-2 px-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                    Step 1 of 2: Define vision
                  </span>

                  <button
                    id="submit-vision-btn"
                    onClick={() => {
                      if (inputIdea.trim()) {
                        setAppStep("platform");
                      }
                    }}
                    disabled={!inputIdea.trim()}
                    className="w-10 h-10 rounded-full bg-red-650 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow hover:shadow-lg focus:outline-none disabled:bg-neutral-200 disabled:text-neutral-400 cursor-pointer"
                    title="Next Step: Select optimal builder"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Elegant presets underneath */}
              <div className="flex flex-col gap-3 text-left">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                  Quick seed presets to kickstart:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleSelectPreset("Auto-approve join requests & welcome new members to your private Telegram channel. 24/7.")} 
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#e3e3e8] text-xs font-semibold hover:border-red-300 hover:bg-neutral-50 hover:text-red-750 transition-all text-neutral-700"
                  >
                    Telegram Approver Join Manager
                  </button>
                  <button 
                    onClick={() => handleSelectPreset("A beautiful minimalist Pomodoro clock timer with built-in lo-fi ambient audio loop synthesizers.")} 
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#e3e3e8] text-xs font-semibold hover:border-red-300 hover:bg-neutral-50 hover:text-red-750 transition-all text-neutral-700"
                  >
                    Pomodoro Lo-fi Clock
                  </button>
                  <button 
                    onClick={() => handleSelectPreset("A smart medical summary parser reading records from multiline charts, producing a timeline view.")} 
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#e3e3e8] text-xs font-semibold hover:border-red-300 hover:bg-neutral-50 hover:text-red-750 transition-all text-neutral-700"
                  >
                    Record Timeline Summarizer
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* ================= STEP 2: CHOOSE YOUR PLATFORM GRID (SCREENSHOT 4) ================= */}
          {appStep === "platform" && (
            <div className="w-full max-w-4xl flex flex-col gap-6 animate-fadeIn my-auto py-8">
              
              {/* Back CTA link */}
              <button
                id="platform-back-btn"
                onClick={() => setAppStep("input")}
                className="self-start text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-700 flex items-center gap-1.5"
              >
                &lsaquo; Back
              </button>

              <div className="flex flex-col gap-1 text-center">
                <h3 className="text-3xl font-black tracking-tight text-neutral-900 font-display">
                  Choose your platform
                </h3>
                <p className="text-xs text-neutral-500 leading-normal font-medium font-sans">
                  We'll generate prompts optimized for your choice.
                </p>
              </div>

              {/* High precision interactive grid of selections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2 max-w-3xl mx-auto w-full">
                {OPTIMIZED_PLATFORMS.map((plat) => {
                  const isSel = selectedPlatform === plat.id;
                  return (
                    <button
                      key={plat.id}
                      id={`platform-card-${plat.id}`}
                      onClick={() => setSelectedPlatform(plat.id)}
                      className={`p-4 rounded-2xl text-left border relative transition-all shadow-sm ${
                        isSel
                          ? "bg-neutral-950 text-white border-neutral-955 shadow-md scale-[1.02]"
                          : "bg-white text-neutral-950 border-[#e3e3e8] hover:border-red-200 hover:bg-zinc-50/50"
                      }`}
                    >
                      {/* Recommendations Blinker tag inside selected block */}
                      {plat.isRecommended && (
                        <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${isSel ? "bg-red-650 text-white":"bg-red-50 text-red-600 border border-red-100"}`}>
                          Recommended
                        </span>
                      )}

                      {/* Blinking indicator dot */}
                      {plat.dots && (
                        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-650 animate-pulse" />
                      )}

                      <h4 className="text-sm font-extrabold tracking-tight">{plat.name}</h4>
                      <p className={`text-[11px] font-mono block mt-0.5 ${isSel ? "text-red-400":"text-neutral-400"}`}>{plat.tagline}</p>
                      
                      <p className={`text-xs leading-normal mt-3.5 line-clamp-2 ${isSel ? "text-neutral-300":"text-neutral-500"}`}>
                        {plat.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Generate execution triggers */}
              <div className="flex justify-center mt-6">
                <button
                  id="final-generate-btn"
                  onClick={handleSynthesize}
                  className="px-8 py-3.5 rounded-full font-bold text-sm bg-neutral-950 text-white shadow-xl hover:bg-neutral-800 flex items-center justify-center gap-2.5 transition-all cursor-pointer font-display"
                >
                  <Sparkles className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>Generate Build Plan</span>
                </button>
              </div>

            </div>
          )}


          {/* ================= STEP 3: FINALIZING STATE WITH HORIZ BAR (SCREENSHOT 5) ================= */}
          {appStep === "loading" && (
            <div className="w-full max-w-md flex flex-col items-center gap-8 animate-fadeIn text-center my-auto py-16">
              
              {/* Spinner ring structure */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-red-650 animate-spin absolute" />
                <div className="w-14 h-14 rounded-full border-2 border-transparent border-b-neutral-900 border-t-neutral-900 animate-spin-reverse absolute" />
                <Sparkles className="w-6 h-6 text-red-600 animate-pulse" />
              </div>

              <div className="flex flex-col gap-2.5 max-w-sm">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                  Synthesis Accelerator Status
                </span>
                <h3 className="text-2xl font-black text-neutral-900 font-display">
                  Finalizing your app idea
                </h3>
                <p className="text-xs font-mono font-bold text-red-600 animate-pulse tracking-wide uppercase min-h-[16px]">
                  {loadingMessages[loadingStep]}
                </p>
              </div>

              {/* Rich Percentage display & horizontal meter slider block */}
              <div className="w-full flex flex-col gap-3">
                <span className="text-4xl font-extrabold tracking-tighter text-neutral-950 font-display">
                  {loadingPercent}%
                </span>
                <div className="w-full h-2 bg-zinc-150 rounded-full overflow-hidden border border-zinc-200/40 shadow-inner">
                  <div 
                    className="bg-red-650 h-full rounded-full transition-all duration-300"
                    style={{ width: `${loadingPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-neutral-400 font-sans tracking-tight leading-relaxed max-w-xs mx-auto">
                  Applying algorithmic heuristics. We are compiling complete spec blueprints and structured files. Please stand by.
                </p>
              </div>

            </div>
          )}


          {/* ================= STEP 4: BLUEPRINT OUTPUTS ROADMAP DETAILS (SCREENSHOT 6) ================= */}
          {appStep === "result" && currentGeneration && (
            <div className="w-full flex flex-col gap-8 animate-fadeIn py-4">
              
              {/* Top Navigation Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
                <button
                  id="results-start-over-btn"
                  onClick={handleNewIdea}
                  className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5"
                >
                  &lsaquo; Start Over
                </button>

                {/* Simulated workspace rate cards */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="px-3 py-1.5 bg-zinc-100 text-neutral-600 rounded-xl text-[10px] font-mono font-bold border border-zinc-200/50">
                    Resets soon <span className="text-red-650 ml-1.5">5 days left</span>
                  </div>
                  
                  {/* Active Platform selection badge indicator */}
                  <span className="px-3 py-1.5 bg-neutral-950 text-white rounded-xl text-[10px] font-mono tracking-wider font-extrabold flex items-center gap-1.5 uppercase">
                    Platform: {selectedPlatform}
                  </span>
                </div>
              </div>

              {/* Central Title and description summary */}
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl md:text-4xl font-black text-neutral-900 font-display tracking-tight leading-tight">
                  {currentGeneration.title} is ready!
                </h1>
                <p className="text-sm text-neutral-500 max-w-3xl leading-relaxed italic">
                  &ldquo;{currentGeneration.description}&rdquo;
                </p>
              </div>

              {/* MAIN CONTENT SPLIT LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                
                {/* 1. LEFT COLUMN: SYSTEM GENERATED STEPS (ROADMAP SPEC) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-450 font-black px-1">
                    System Build Checklist
                  </span>

                  {/* Card 1: Download CONTEXT.md */}
                  <div className="p-5 rounded-2xl bg-white border border-[#e3e3e8] shadow-sm flex gap-4 items-start hover:border-red-200 transition-all">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 text-neutral-800 border border-zinc-200 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-3 text-left">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-950 tracking-tight leading-none mb-1.5 flex items-center gap-2">
                          Download CONTEXT.md
                        </h4>
                        <p className="text-xs text-neutral-500 leading-normal font-sans">
                          Get your custom project configuration and specification instructions file ready to drop into your workspace.
                        </p>
                      </div>
                      <button
                        onClick={exportAsReadme}
                        className="w-full sm:w-fit py-2 px-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download CONTEXT.md</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Download AI IDE or connect platforms */}
                  <div className="p-5 rounded-2xl bg-white border border-[#e3e3e8] shadow-sm flex gap-4 items-start hover:border-red-200 transition-all">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 text-neutral-800 border border-zinc-200 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-3 text-left">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-950 tracking-tight leading-none mb-1.5 flex items-center gap-2 uppercase">
                          Deploy into {selectedPlatform}
                        </h4>
                        <p className="text-xs text-neutral-500 leading-normal font-sans">
                          Open this stack with your configured prompt editor. We've optimized the prompt DNA mapping specifically for {selectedPlatform}.
                        </p>
                      </div>
                      <a
                        href={selectedPlatform === "base44" ? "https://base44.io" : selectedPlatform === "lovable" ? "https://lovable.dev" : "https://cursor.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-fit py-2 px-4 bg-zinc-50 hover:bg-zinc-100 text-neutral-900 border border-zinc-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Open {selectedPlatform} platform</span>
                        <ExternalLink className="w-3 h-3 text-neutral-450" />
                      </a>
                    </div>
                  </div>

                  {/* Card 3: UI Design inspiration */}
                  <div className="p-5 rounded-2xl bg-white border border-[#e3e3e8] shadow-sm flex gap-4 items-start hover:border-red-200 transition-all">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 text-neutral-800 border border-zinc-200 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-3 text-left">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-950 tracking-tight leading-none mb-1.5 flex items-center gap-2">
                          Get Professional UI Inspiration
                        </h4>
                        <p className="text-xs text-neutral-500 leading-normal font-sans">
                          Browse thousands of real SaaS web/app patterns to copy layout guidelines, spacing formulas, and typography settings.
                        </p>
                      </div>
                      <a
                        href="https://mobbin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-fit py-2 px-4 bg-zinc-50 hover:bg-zinc-100 text-neutral-900 border border-zinc-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Continue</span>
                        <ExternalLink className="w-3 h-3 text-neutral-450" />
                      </a>
                    </div>
                  </div>

                  {/* Card 4: Domain Registry Acquisition */}
                  <div className="p-5 rounded-2xl bg-white border border-[#e3e3e8] shadow-sm flex gap-4 items-start hover:border-red-200 transition-all">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 text-neutral-800 border border-zinc-200 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-3 text-left">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-950 tracking-tight leading-none mb-1.5 flex items-center gap-2">
                          Buy Your Domain
                        </h4>
                        <p className="text-xs text-neutral-500 leading-normal font-sans">
                          Secure the perfect brand address name immediately before someone else reserves it.
                        </p>
                      </div>
                      <a
                        href={`https://namecheap.com/domains/registration/results/?domain=${currentGeneration.title.toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-fit py-2 px-4 bg-zinc-50 hover:bg-zinc-100 text-neutral-900 border border-zinc-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Continue search</span>
                        <ExternalLink className="w-3 h-3 text-neutral-450" />
                      </a>
                    </div>
                  </div>

                  {/* Card 5: Join Telegram channel card replacing Discord */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-[#22a5e2]/5 border border-[#cbe5f5] shadow-sm flex flex-col gap-4 text-left">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#22a5e2]/15 text-[#1891ce] border border-[#22a5e2]/10 flex items-center justify-center shrink-0">
                        <Compass className="w-6 h-6 text-[#1785be]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-neutral-950 tracking-tight leading-none mb-2">
                          Join our Telegram Community
                        </h4>
                        <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                          Connect with thousands of builders just like you, discuss AI strategies, and get direct expert support from the <strong>ViralZap Team</strong>!
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://t.me/ViralZap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#22a5e2] hover:bg-[#1a8dc4] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-4 h-4 font-black" />
                      <span>Join Free Community</span>
                    </a>
                  </div>

                </div>

                {/* 2. RIGHT COLUMN: GENERAL WORKSPACE TABS */}
                <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                  
                  {/* Header controllers */}
                  <div className="flex border-b border-neutral-200 gap-1 overflow-x-auto scrollbar-none pb-0.5">
                    <button
                      id="view-prompts-tab-btn"
                      onClick={() => setActiveWorkspaceView("prompts")}
                      className={`px-4 py-2.5 text-xs uppercase font-mono font-bold tracking-wider shrink-0 transition-all border-b-2 -mb-[2px] ${
                        activeWorkspaceView === "prompts"
                          ? "border-red-600 text-neutral-950"
                          : "border-transparent text-neutral-400 hover:text-neutral-700"
                      }`}
                    >
                      🚀 Optimized Prompts
                    </button>
                    <button
                      id="view-dna-tab-btn"
                      onClick={() => setActiveWorkspaceView("dna")}
                      className={`px-4 py-2.5 text-xs uppercase font-mono font-bold tracking-wider shrink-0 transition-all border-b-2 -mb-[2px] ${
                        activeWorkspaceView === "dna"
                          ? "border-red-600 text-neutral-955"
                          : "border-transparent text-neutral-400 hover:text-neutral-700"
                      }`}
                    >
                      🧬 Prompt DNA
                    </button>
                    <button
                      id="view-blueprints-tab-btn"
                      onClick={() => setActiveWorkspaceView("blueprints")}
                      className={`px-4 py-2.5 text-xs uppercase font-mono font-bold tracking-wider shrink-0 transition-all border-b-2 -mb-[2px] ${
                        activeWorkspaceView === "blueprints"
                          ? "border-red-600 text-neutral-955"
                          : "border-transparent text-neutral-400 hover:text-neutral-700"
                      }`}
                    >
                      📊 Blueprint Lab
                    </button>
                    <button
                      id="view-scaffold-tab-btn"
                      onClick={() => setActiveWorkspaceView("scaffold")}
                      className={`px-4 py-2.5 text-xs uppercase font-mono font-bold tracking-wider shrink-0 transition-all border-b-2 -mb-[2px] ${
                        activeWorkspaceView === "scaffold"
                          ? "border-red-600 text-neutral-955"
                          : "border-transparent text-neutral-400 hover:text-neutral-700"
                      }`}
                    >
                      📁 File Scaffold
                    </button>
                  </div>

                  {/* Active workspaces view rendering */}
                  {activeWorkspaceView === "prompts" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200/70">
                        <div className="text-left">
                          <p className="text-[10px] font-mono tracking-wider font-extrabold text-red-600 uppercase">Interactive Synthesis Save</p>
                          <h4 className="text-sm font-extrabold text-neutral-900 mt-0.5">Log this concept in your lab?</h4>
                        </div>
                        <div className="flex gap-2">
                          <button
                            id="results-save-lab"
                            onClick={handleSaveToLab}
                            className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                          >
                            <Save className="w-4 h-4 text-red-500" />
                            <span>Save to Personal Sandbox</span>
                          </button>
                          
                          {/* Code exports */}
                          <button
                            onClick={exportAsJSON}
                            className="px-3.5 py-2 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-bold text-neutral-700 font-mono"
                            title="Export JSON"
                          >
                            JSON
                          </button>
                        </div>
                      </div>

                      <PromptViewer platforms={currentGeneration.platforms} />
                    </div>
                  )}

                  {activeWorkspaceView === "dna" && (
                    <DNAChart dna={currentGeneration.dna} />
                  )}

                  {activeWorkspaceView === "blueprints" && (
                    <div className="flex flex-col gap-6">
                      {/* Database SQL block */}
                      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 flex flex-col gap-4 text-left">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                          <div className="flex items-center gap-2.5">
                            <Database className="w-5 h-5 text-red-600" />
                            <div>
                              <h4 className="text-sm font-bold text-neutral-950 tracking-tight leading-none mb-1">SQL Database Schema</h4>
                              <p className="text-[10px] text-neutral-400">PostgreSQL tables, schemas, indexes, and relationship bindings.</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(currentGeneration.blueprint.dbSchema);
                              alert("Database schema script copied success!");
                            }}
                            className="px-3 py-1 bg-zinc-50 border border-zinc-205 text-neutral-700 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wide hover:bg-zinc-100"
                          >
                            Copy SQL
                          </button>
                        </div>

                        <div className="rounded-xl bg-neutral-950 p-4 font-mono text-[11px] text-zinc-300 overflow-x-auto max-h-[240px]">
                          <pre>{currentGeneration.blueprint.dbSchema.replace(/```sql|```/g, "")}</pre>
                        </div>
                      </div>

                      {/* Routes Endpoint specifications & API Spec Checklist */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        
                        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 flex flex-col gap-4">
                          <span className="text-[9px] font-mono tracking-widest text-[#222] font-black uppercase">Endpoints Routing Checklist</span>
                          <div className="flex flex-col gap-2">
                            {currentGeneration.blueprint.apiRoutes.map((route, idx) => {
                              const [pRoute, pDesc] = route.split(" - ");
                              return (
                                <div key={idx} className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-150 flex flex-col gap-1">
                                  <span className="font-mono text-[11px] font-bold text-neutral-800">{pRoute}</span>
                                  {pDesc && <span className="text-[10px] text-neutral-500 leading-normal">{pDesc}</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col gap-6">
                          <div className="bg-white rounded-3xl border border-[#e3e3e8] p-6">
                            <span className="text-[9px] font-mono tracking-widest text-[#222] font-black uppercase">Security Authentication System</span>
                            <p className="text-xs text-neutral-550 leading-relaxed mt-2">
                              {currentGeneration.blueprint.authSystems}
                            </p>
                          </div>

                          <div className="bg-white rounded-3xl border border-[#e3e3e8] p-6">
                            <span className="text-[9px] font-mono tracking-widest text-[#222] font-black uppercase">Tailored Monetization Methods</span>
                            <div className="flex flex-col gap-2 mt-2 leading-relaxed">
                              {currentGeneration.blueprint.monetization.map((m, idx) => (
                                <p key={idx} className="text-xs text-neutral-600 flex items-start gap-1.5">
                                  <span className="text-red-655 font-bold font-mono">0{idx+1}</span>
                                  <span>{m}</span>
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Technology Stack Recommendations Card */}
                      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 flex flex-col gap-4 text-left">
                        <span className="text-[9px] font-mono tracking-widest text-[#222] font-black uppercase">High Fidelity Tech Stack recommendations</span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono text-neutral-400 font-bold block mb-1">FRONTEND</span>
                            <span className="text-xs font-bold text-neutral-800">{currentGeneration.stack.frontend}</span>
                          </div>
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono text-neutral-400 font-bold block mb-1">BACKEND SERVICE</span>
                            <span className="text-xs font-bold text-neutral-800">{currentGeneration.stack.backend}</span>
                          </div>
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono text-neutral-400 font-bold block mb-1">DATABASE STORAGE</span>
                            <span className="text-xs font-bold text-neutral-800">{currentGeneration.stack.database}</span>
                          </div>
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono text-neutral-400 font-bold block mb-1">AUTH CONTROL</span>
                            <span className="text-xs font-bold text-neutral-800">{currentGeneration.stack.authProvider}</span>
                          </div>
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono text-neutral-400 font-bold block mb-1">CONTAINER HOSTING</span>
                            <span className="text-xs font-bold text-neutral-800">{currentGeneration.stack.hosting}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {activeWorkspaceView === "scaffold" && (
                    <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 flex flex-col gap-4 text-left">
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                        <div>
                          <h4 className="text-sm font-bold text-neutral-955">Project Directory Blueprint</h4>
                          <p className="text-[10px] text-neutral-400">Complete architectural folder map suggested for prompt-to-code builders.</p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(currentGeneration.blueprint.folderStructure);
                            alert("Folder structure copy successful!");
                          }}
                          className="px-3 py-1 bg-zinc-50 border border-zinc-205 text-neutral-700 rounded-lg text-[10px] font-mono font-bold hover:bg-zinc-100"
                        >
                          Copy Scaffold
                        </button>
                      </div>

                      <div className="rounded-xl bg-neutral-950 p-4 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                        <pre>{currentGeneration.blueprint.folderStructure}</pre>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

        {/* Dynamic Mobile footer community banner */}
        <div className="md:hidden p-4 bg-zinc-50 border-t border-[#e3e3e8] mt-6 flex flex-col gap-3 relative z-15">
          <a
            href="https://t.me/ViralZap"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-[#22a5e2] text-white transition-all shadow-md flex items-center justify-between gap-2 text-left"
          >
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d0edf9]">Join free community</p>
              <p className="text-sm font-extrabold tracking-tight mt-0.5">Telegram channel: ViralZap</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white animate-pulse" />
          </a>
        </div>

        {/* Footer Credit */}
        <footer className="w-full border-t border-[#e3e3e8]/50 py-5 text-center text-[10px] text-neutral-400 tracking-wider uppercase font-mono bg-white mt-auto z-10 relative">
          Vibely Synthesis Lab © 2026
        </footer>

      </main>

      {/* Auth credentials access overlay */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

    </div>
  );
}
