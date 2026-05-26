import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const port = 3000;
const app = express();
app.use(express.json());

// Set up server-side Gemini client utility
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API successfully initialized from environment");
  } catch (err) {
    console.error("Failed to initialize Gemini API:", err);
  }
} else {
  console.log("Gemini API key not found or blank. Running with high-fidelity local synthesis.");
}

// Check key availability
app.get("/api/status", (req, res) => {
  res.json({
    hasApiKey: ai !== null,
    apiModel: "gemini-3.5-flash"
  });
});

// Dynamic high-fidelity content generator fallback for simulated experience
function createFallbackGeneration(concept: string): any {
  const cleanConcept = concept.trim() ||"Mindfulness focus companion app";
  const titleWords = cleanConcept.split(" ");
  const mockTitleBase = titleWords[0].charAt(0).toUpperCase() + titleWords[0].slice(1);
  const title = titleWords.length > 1 ? `${mockTitleBase}Vibe` : `${mockTitleBase}ly`;
  const description = `Futuristic AI-driven companion tailored to turn "${cleanConcept}" into an interactive, sleek, production-ready system.`;
  
  // Try to determine category
  let category = "SaaS Platform";
  if (cleanConcept.toLowerCase().includes("game")) category = "Interactive Web Game";
  else if (cleanConcept.toLowerCase().includes("track") || cleanConcept.toLowerCase().includes("fit")) category = "Mobile IoT App";
  else if (cleanConcept.toLowerCase().includes("ai") || cleanConcept.toLowerCase().includes("bot")) category = "Generative AI Agent";
  
  return {
    idea: cleanConcept,
    title,
    description,
    category,
    architecture: `### Vibely Tech Architecture
- **App Type:** Progressive Web Application (PWA) / Next.js Hybrid
- **Data Flow:** Unidirectional event stream bridging real-time status with Edge handlers.
- **Microservices Setup:** High-concurrency edge API functions dispatching payloads via Pub/Sub to background workers.
- **Caching Layer:** Regional Redis caching cluster with intelligent query invalidation rules.`,
    specs: `### System & Functional Specifications
1. **Interactive Dashboard View:**
   - Real-time event monitor visualization panel.
   - Glassmorphic command control system with state persistency.
2. **AI Integration Hub:**
   - Streaming text response engine with micro-animations.
   - Multi-agent orchestrator managing concurrent tool hooks.
3. **Data Logging & Exports:**
   - Client-side data compilation to README.md, context templates, and JSON logs.
   - Hot-key export actions with validation checks.`,
    uiInstructions: `### Design System & Visual Guidelines
- **Palette (Vibely Futuristic Red-Light):** Prime background (\`#fafafa\`), deep carbon text (\`#0f0f12\`), crimson pulse (\`#dc2626\`), glowing boundaries (\`rgba(220, 38, 38, 0.1)\`).
- **Typography:** Space Grotesk / Inter pairing. Accentuate critical headings in heavy tracked caps.
- **Glassmorphism Spec:** \`backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(220, 38, 38, 0.1)\`.
- **Interactions:** Staggered motion fade-ins (\`scale \u2192 1.0, opacity: 0 \u2192 100%\`), pulsing indicator lights for state feedback.`,
    backendReqs: `### Backend Specifications & API Spec
- **Endpoints:**
  - \`POST /api/v1/auth/session\` - Establish verified client environment state.
  - \`POST /api/v1/generation/blueprint\` - Stream synthesis schemas.
- **Storage:** Local relational database with indexed triggers for fast workspace query performance.`,
    dna: {
      clarity: 82,
      scalability: 78,
      hallucinationRisk: 25,
      completeness: 80,
      aiFriendliness: 95,
      analysis: `The startup concept is clean and focuses on concrete utility. While the client spec excels in UX description, it leaves room for scaling standard web API routes. Hallucination risk is minimal due to explicit technical scope, yielding a prompt that highly matches modern LLM code interpreter expectations.`
    },
    platforms: [
      {
        platform: "Cursor",
        prompt: `Convert the concept: "${cleanConcept}" into a full-stack Next.js app with Tailwind CSS. Follow modular component separation. Implement a primary state store inside /src/lib/state/store.ts. Focus heavily on complete file generations without truncated comment blocks. Use lucide-react for all system icons.`,
        focusPoints: ["Explicitly requests complete code snippets", "Utilizes local React state stores", "Optimizes modular workspace files"]
      },
      {
        platform: "Windsurf",
        prompt: `Act as a senior engineer. Build a feature-complete module for "${cleanConcept}" inside a modern Vite + TypeScript workspace. Coordinate multi-file communication paths. Add beautiful loading telemetry elements. Handle edge parameters gracefully.`,
        focusPoints: ["Deep multi-file reasoning flow", "Tracks system file references", "Optimizes state sync across views"]
      },
      {
        platform: "Lovable",
        prompt: `Create a luxurious, visually pristine UI for "${cleanConcept}" matching a glowing light-mode theme with high-contrast red accents. Do not include cluttered margins. Use simple state controls. Ensure touch targets are 44px+ and includes elegant glass shadows.`,
        focusPoints: ["Stellar pixel-perfect UI designs", "Immediate interactive controls", "No unneeded database complexity"]
      },
      {
        platform: "v0",
        prompt: `Generate a beautiful bento-grid dashboard UI for "${cleanConcept}". Design complex responsive component blocks styled with Tailwind. Use premium light visual themes with red interactive pills, sleek margins, and soft shadows.`,
        focusPoints: ["Responsive desktop-first design blocks", "Ready-to-copy Tailwind code", "Focuses on interactive components and states"]
      },
      {
        platform: "Bolt",
        prompt: `Set up a complete stack (Vite + React + TailwindCSS) for "${cleanConcept}". Generate all route pages, navigation links, layout wrappers, and mock service layers. Ensure the build script completes without errors.`,
        focusPoints: ["Full boilerplate scaffold setup", "Fully working mockup code paths", "Self-contained app preview ready"]
      },
      {
        platform: "Claude",
        prompt: `Explain the optimal architectural pattern for a modern system implements "${cleanConcept}". Provide complete modular file listings, typescript declarations, and database definitions. Maintain pristine type safety and documentation.`,
        focusPoints: ["Ultimate reasoning and correctness", "Beautiful clear software designs", "Clean modular documentation"]
      },
      {
        platform: "Gemini",
        prompt: `Analyze and design the core algorithms needed to power "${cleanConcept}". Write the structured engine schemas, logical flowcharts, and error state matrices using cleanest TypeScript. Ensure robust fallback routines are coded.`,
        focusPoints: ["Advanced algorithmic logic designs", "Thorough schema validations", "Strict system resilience specs"]
      },
      {
        platform: "Replit AI",
        prompt: `Build a quick start Express + HTML server prototype for "${cleanConcept}". Ensure everything runs in a single fast workspace. Wire up simple persistent database store with lightweight file-store logging.`,
        focusPoints: ["Instant running app prototype", "Integrated server+client routes", "No complex setups or configs"]
      },
      {
        platform: "Manus",
        prompt: `Execute a full build plan for "${cleanConcept}". Browse modern design examples, set up the project file-by-file, inspect for build linter errors, modify files to fix any issues, and deploy to full container systems automatically.`,
        focusPoints: ["Agentic autonomous execution flow", "Comprehensive online trend research", "End-to-end self-correcting builds"]
      }
    ],
    blueprint: {
      dbSchema: `\`\`\`sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- App Concepts Table
CREATE TABLE concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  stack_details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved Prompts Table
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  generated_prompt TEXT NOT NULL,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\``,
      folderStructure: `my-fusion-app/
\u251c\u2500\u2500 .env.example
\u251c\u2500\u2500 package.json
\u251c\u2500\u2500 README.md
\u251c\u2500\u2500 src/
\u2502  \u251c\u2500\u2500 App.tsx
\u2502  \u251c\u2500\u2500 main.tsx
\u2502  \u251c\u2500\u2500 index.css
\u2502  \u251c\u2500\u2500 components/
\u2502  \u2502  \u251c\u2500\u2500 Dashboard.tsx
\u2502  \u2502  \u251c\u2500\u2500 PromptViewer.tsx
\u2502  \u2502  \u2514\u2500\u2500 DNAChart.tsx
\u2502  \u251c\u2500\u2500 lib/
\u2502  \u2502  \u2514\u2500\u2500 supabase.ts
\u2502  \u2514\u2500\u2500 types.ts
\u2514\u2500\u2500 vite.config.ts`,
      apiRoutes: [
        "POST /api/v1/auth/signup - Frame session credentials",
        "POST /api/v1/projects - Initialize a new app idea database entry",
        "GET /api/v1/projects/:id/blueprints - Fetch compiled model structures",
        "POST /api/v1/prompts/optimize - Run targeted prompt tuning across custom systems"
      ],
      authSystems: "Supabase Auth with JSON Web Tokens (JWT) handling session validation on the client. Integrates email-password credentials with secure social logins (GitHub, Google) easily.",
      monetization: [
        "SaaS Subscription: Tiered plans starting at $19/mo for power creators.",
        "Usage-Based Credits: On-demand pay-as-you-go credits for unlimited prompt generation bundles.",
        "Template Licensing: Premium preset boilerplate modules sold as immediate starter templates."
      ]
    },
    recommendation: {
      tool: category === "SaaS Platform" ? "Lovable" : "Cursor",
      confidence: 91,
      reasons: [
        "Matches UI-focused SaaS builder requirements perfectly",
        "Best-in-class rapid layout prototyping visualizer",
        "Pre-integrated local storage and sleek styling speeds"
      ]
    },
    stack: {
      frontend: "React + Vite (Single View / Multi-Module)",
      backend: "Node.js (Express Layer API)",
      database: "Supabase Postgres / LocalStorage",
      authProvider: "Supabase Auth (JWT Client)",
      hosting: "Vercel / Cloud Run containers"
    }
  };
}

// Generate Endpoint using Gemini 3.5 Flash
app.post("/api/generate", async (req, res) => {
  const { concept } = req.body;
  if (!concept || typeof concept !== "string" || concept.trim() === "") {
    return res.status(400).json({ error: "Concept parameter must be provided." });
  }

  // System Instruction guiding the generation of pristine structured JSON that matches our models
  const systemInstruction = `You are "Vibely", a futuristic AI software architect and conversion engine.
The user enters a rough startup idea, app concept, or feature request.
Your job is to convert it into a highly detailed, professional, structured JSON output matching the response schema perfectly.
Make sure your generated code prompts, markdown elements, and descriptions are extremely sleek, premium, futuristic, and complete. No placeholders.
Make technical decisions suitable for their startup concept. Include realistic files and database schemas.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "A catchy futuristic modern startup or product name" },
      description: { type: Type.STRING, description: "A sleek, powerful 1-sentence tagline of what this app does" },
      category: { type: Type.STRING, description: "The startup category (e.g. Developer Tool, AI Assistant, Web Application, FinTech SaaS)" },
      architecture: { type: Type.STRING, description: "Technical architecture review in markdown format (monolith vs microservices, key components, data flow)" },
      specs: { type: Type.STRING, description: "Detailed markdown tech specifications containing features, functional flow, and constraints" },
      uiInstructions: { type: Type.STRING, description: "Markdown with detailed UI instructions block: themes, typography pairing, design tokens, layout margins" },
      backendReqs: { type: Type.STRING, description: "Markdown detailing backend API endpoints list, database trigger logic, performance needs" },
      dna: {
        type: Type.OBJECT,
        properties: {
          clarity: { type: Type.INTEGER, description: "0 to 100 rating for concept clarity" },
          scalability: { type: Type.INTEGER, description: "0 to 100 rating for technical scalability" },
          hallucinationRisk: { type: Type.INTEGER, description: "0 to 100 rating for AI coding tools hallucination risk" },
          completeness: { type: Type.INTEGER, description: "0 to 100 rating for functional completeness" },
          aiFriendliness: { type: Type.INTEGER, description: "0 to 100 rating for how friendly this is to coding engines" },
          analysis: { type: Type.STRING, description: "A thorough paragraph analyzing the prompt metrics and warning points" }
        },
        required: ["clarity", "scalability", "hallucinationRisk", "completeness", "aiFriendliness", "analysis"]
      },
      platforms: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            platform: { type: Type.STRING, description: "One of these EXACT names: Cursor, Windsurf, Lovable, v0, Bolt, Claude, Gemini, Replit AI, Manus" },
            prompt: { type: Type.STRING, description: "A complete, tailored, highly-optimized production prompt for prompt-to-code builders of this platform" },
            focusPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 reasons why this prompt works optimally for this platform" }
          },
          required: ["platform", "prompt", "focusPoints"]
        }
      },
      blueprint: {
        type: Type.OBJECT,
        properties: {
          dbSchema: { type: Type.STRING, description: "Database schema (SQL, Supabase script with exact tables, columns, constraints and relationships) formatted in SQL code block" },
          folderStructure: { type: Type.STRING, description: "A text-based complete folder structure tree structure representing this app template" },
          apiRoutes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of API Route lines (e.g. 'POST /api/v1/checkout - Processes stripe payment')" },
          authSystems: { type: Type.STRING, description: "High-level summary of recommended user login, encryption, and auth systems" },
          monetization: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 actionable startup monetization methods tailored specifically to this concept" }
        },
        required: ["dbSchema", "folderStructure", "apiRoutes", "authSystems", "monetization"]
      },
      recommendation: {
        type: Type.OBJECT,
        properties: {
          tool: { type: Type.STRING, description: "The #1 best AI builder suited for this idea among Cursor, Lovable, Windsurf, Bolt, etc." },
          confidence: { type: Type.INTEGER, description: "Percentage confidence score 0-100" },
          reasons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 solid reasons for this recommendation based on platform architecture" }
        },
        required: ["tool", "confidence", "reasons"]
      },
      stack: {
        type: Type.OBJECT,
        properties: {
          frontend: { type: Type.STRING },
          backend: { type: Type.STRING },
          database: { type: Type.STRING },
          authProvider: { type: Type.STRING },
          hosting: { type: Type.STRING }
        },
        required: ["frontend", "backend", "database", "authProvider", "hosting"]
      }
    },
    required: ["title", "description", "category", "architecture", "specs", "uiInstructions", "backendReqs", "dna", "platforms", "blueprint", "recommendation", "stack"]
  };

  if (!ai) {
    // Return high-fidelity mock fallback safely and fast with simulation flag
    console.log("No AI client available, serving smart synthesized output.");
    const responseData = createFallbackGeneration(concept);
    return res.json({ ...responseData, isSimulated: true });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a detailed startup blueprint and optimized prompt kit for this idea: "${concept}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.1,
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Empty text returned from Gemini API");
    }

    try {
      const parsedData = JSON.parse(textOutput.trim());
      // Return beautiful real data
      return res.json({ ...parsedData, isSimulated: false, idea: concept });
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON output, falling back:", textOutput);
      const fallbackData = createFallbackGeneration(concept);
      return res.json({ ...fallbackData, isSimulated: true, parseError: true });
    }
  } catch (error: any) {
    console.error("Gemini API call failed, falling back to synthesis helper:", error);
    const fallbackData = createFallbackGeneration(concept);
    return res.json({
      ...fallbackData,
      isSimulated: true,
      apiError: error.message || "Unknown error calling Gemini service"
    });
  }
});

async function main() {
  // Vite dev vs production configuration
  if (process.env.NODE_ENV !== "production") {
    // Import Vite middleware dynamically or configure it
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated successfully.");
  } else {
    // Serve production static assets compiled inside dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production state: serving static client builds.");
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Vibely backend active on port ${port}`);
  });
}

main().catch((err) => {
  console.error("FATAL: Failed to launch Vibely servers:", err);
});
