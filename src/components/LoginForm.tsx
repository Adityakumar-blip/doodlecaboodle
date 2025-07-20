import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseconfig";
interface LoginFormProps {
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
}

const LoginForm = ({ onLoginSuccess, onNavigateToSignup }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        throw new Error("Please fill in all fields");
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      console.log("User signed in:", userCredential.user);
      localStorage.setItem("user", JSON.stringify(userCredential));

      onLoginSuccess();
    } catch (error: any) {
      console.error("Authentication error:", error);
      let errorMessage = "Authentication failed";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later";
          break;
        default:
          errorMessage = error.message || "Authentication failed";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Login to Continue</h3>
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@example.com"
            disabled={loading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-pastel-pink hover:bg-pastel-pink/90 text-white"
          disabled={loading || !email.trim() || !password.trim()}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="text-sm text-gray-500 text-center">
        Don't have an account?{" "}
        <button
          onClick={onNavigateToSignup}
          className="text-pastel-pink hover:underline focus:outline-none focus:underline"
          disabled={loading}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
