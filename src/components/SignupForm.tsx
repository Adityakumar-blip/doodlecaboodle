import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { auth, db } from "@/firebase/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

interface SignupFormProps {
  onSignupSuccess: () => void;
  onNavigateToLogin: () => void;
}

const SignupForm = ({
  onSignupSuccess,
  onNavigateToLogin,
}: SignupFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        throw new Error("Please fill in all fields");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify(userCredential));

      await updateProfile(user, { displayName: name.trim() });

      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: email.trim(),
        phone: "",
        address: {
          line1: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      console.log("User signed up:", user);
      onSignupSuccess();
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "Signup failed";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        default:
          errorMessage = error.message || "Signup failed";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Create an Account</h3>
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full Name</Label>
          <Input
            id="signup-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            disabled={loading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@example.com"
            disabled={loading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
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
          disabled={
            loading || !name.trim() || !email.trim() || !password.trim()
          }
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
      <p className="text-sm text-gray-500 text-center">
        Already have an account?{" "}
        <button
          onClick={onNavigateToLogin}
          className="text-pastel-pink hover:underline focus:outline-none focus:underline"
          disabled={loading}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
