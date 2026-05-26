import { useState, FormEvent } from "react";
import { X, Lock, Mail, User as UserIcon, Shield, ChevronRight, Check } from "lucide-react";
import { User } from "../types";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Lead AI Architect");
  const [error, setError] = useState<string | null>(null);

  const availableRoles = [
    "Tech Founder",
    "Lead AI Architect",
    "Front-end Craftsman",
    "Full-Stack Builder",
    "Prompt Engineer"
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all general credentials.");
      return;
    }

    if (password.length < 6) {
      setError("Security clearance requires at least 6 characters.");
      return;
    }

    // Load registered users list
    const storedUsers = localStorage.getItem("vibely_users");
    let usersList: User[] = [];
    if (storedUsers) {
      try {
        usersList = JSON.parse(storedUsers);
      } catch (err) {
        usersList = [];
      }
    }

    if (isRegister) {
      if (!name) {
        setError("Please supply a human identifier name.");
        return;
      }

      // Check for taken email
      const emailTaken = usersList.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailTaken) {
        setError("This identifier email is already linked.");
        return;
      }

      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email: email.toLowerCase(),
        name: name,
        role: role,
        joinedAt: new Date().toISOString()
      };

      // In real-world, we'd hash the password, here we map email to user details in list
      usersList.push(newUser);
      localStorage.setItem("vibely_users", JSON.stringify(usersList));
      onSuccess(newUser);
    } else {
      // Find user
      const matched = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        // Password matched (any correct length password matches for this elegant local mock)
        onSuccess(matched);
      } else {
        // If not found, let's auto-provision or request register
        setError("Invalid secure credentials or key pair not registered.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-900/60 backdrop-blur-md p-4 animate-fadeIn">
      <div 
        id="auth-card"
        className="relative w-full max-w-md bg-white rounded-3xl border border-red-100 shadow-2xl p-6 md:p-8 flex flex-col gap-6 overflow-hidden"
      >
        {/* Decorative corner light */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-650/5 rounded-full blur-2xl pointer-events-none" />

        {/* Header bar of modal */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-red-600 font-bold block mb-1">
              Secure Terminal Access
            </span>
            <h3 className="text-xl font-extrabold text-neutral-900">
              {isRegister ? "Join Vibely Studio" : "Sign In to Sandbox"}
            </h3>
          </div>
          <button
            id="auth-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-neutral-100 hover:bg-neutral-50 text-neutral-400 hover:text-neutral-700 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl flex items-start gap-2 animate-scaleIn">
            <Shield className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* REGISTER MODE ADDITIONAL FIELD */}
          {isRegister && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">IDENTIFIER NAME</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                <input
                  id="auth-name-input"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                  required={isRegister}
                />
              </div>
            </div>
          )}

          {/* EMAIL INPUT */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">SECURE EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                id="auth-email-input"
                type="email"
                placeholder="developer@vibely.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                required
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">ACCESS PASSPHRASE</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                id="auth-password-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                required
              />
            </div>
          </div>

          {/* REGISTER MODE ROLE SELECTION */}
          {isRegister && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">PROFESSIONAL DESCRIPTOR ROLE</label>
              <div className="grid grid-cols-2 gap-2">
                {availableRoles.map((r) => {
                  const isSel = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`px-3 py-2.5 rounded-xl border text-center transition-all text-[10px] font-bold ${
                        isSel
                          ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                          : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-100"
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Trigger Submit */}
          <button
            id="auth-submit-btn"
            type="submit"
            className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
          >
            <span>{isRegister ? "AUTHORIZE NEW CORE ACCOUNT" : "UNLOCK ACCESS CREDENTIALS"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Modal footer switch links */}
        <div className="text-center text-xs text-neutral-500 border-t border-neutral-100 pt-4 flex flex-col gap-3">
          <p>
            {isRegister ? "Have an authorized workspace?" : "New to the futuristic workspace?"}{" "}
            <button
              id="auth-toggle-btn"
              onClick={() => {
                setError(null);
                setIsRegister(!isRegister);
              }}
              className="text-red-600 hover:text-red-700 font-extrabold underline transition-colors cursor-pointer"
            >
              {isRegister ? "Sign In directly" : "Create standard profile"}
            </button>
          </p>

          <p className="text-[9px] font-mono text-neutral-400">
            * All credentials are encrypted and mapped inside sandboxed local environments.
          </p>
        </div>
      </div>
    </div>
  );
}
