import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

// --- ANIMATION VARIANTS ---
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
};

export default function Login({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // EMAIL LOGIN / SIGNUP
  const handleEmailAuth = async () => {
    setError("");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="bg-[#EFEDE6] p-8 rounded-2xl w-[380px] relative">
        <button className="absolute top-4 right-4 text-sm" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-serif mb-4">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          onClick={handleEmailAuth}
          className="w-full bg-black text-white py-3 rounded mb-3"
        >
          {isSignup ? "Create Account" : "Authenticate"}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border py-3 rounded mb-4"
        >
          Sign in with Google
        </button>

        <p className="text-sm text-center">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button className="underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}
