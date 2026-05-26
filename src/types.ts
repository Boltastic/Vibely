export interface PromptDNA {
  clarity: number;
  scalability: number;
  hallucinationRisk: number;
  completeness: number;
  aiFriendliness: number;
  analysis: string;
}

export interface OptimizedPrompt {
  platform: string;
  prompt: string;
  focusPoints: string[];
}

export interface AppBlueprint {
  dbSchema: string;
  folderStructure: string;
  apiRoutes: string[];
  authSystems: string;
  monetization: string[];
}

export interface StackRecommendation {
  frontend: string;
  backend: string;
  database: string;
  authProvider: string;
  hosting: string;
}

export interface ProjectRecommendation {
  tool: string;
  confidence: number;
  reasons: string[];
}

export interface VibelyGeneration {
  idea: string;
  title: string;
  description: string;
  category: string;
  architecture: string;
  specs: string;
  uiInstructions: string;
  backendReqs: string;
  dna: PromptDNA;
  platforms: OptimizedPrompt[];
  blueprint: AppBlueprint;
  recommendation: ProjectRecommendation;
  stack: StackRecommendation;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string; // e.g., 'Core Lead', 'SaaS Architect', 'Front-end Innovator', 'AI Prompt Eng'
  joinedAt: string;
}

export interface SavedProject {
  id: string;
  ownerId?: string;
  timestamp: string;
  title: string;
  description: string;
  category: string;
  generation: VibelyGeneration;
}
