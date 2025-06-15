import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Eye,
  EyeOff,
  Heart,
  Lock,
  Mail,
  Palette,
  Phone,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseconfig"; // Make sure to export db from your config

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended route from location state or search params
  const from =
    location.state?.from ||
    new URLSearchParams(location.search).get("redirect") ||
    "/";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Function to create user document in Firestore
  const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = serverTimestamp();

      try {
        await setDoc(userRef, {
          displayName: displayName || additionalData.name,
          email,
          photoURL: photoURL || null,
          phone: additionalData.phone || null,
          birthDate: additionalData.birthDate || null,
          bio: null,
          location: null,
          website: null,
          socialLinks: {
            instagram: null,
            twitter: null,
            facebook: null,
          },
          preferences: {
            emailNotifications: true,
            pushNotifications: true,
            profileVisibility: "public",
          },
          stats: {
            artworksCount: 0,
            followersCount: 0,
            followingCount: 0,
            likesReceived: 0,
          },
          createdAt,
          updatedAt: createdAt,
          isActive: true,
        });
      } catch (error) {
        console.error("Error creating user document:", error);
        throw new Error("Failed to create user profile");
      }
    }

    return userRef;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      agreeToTerms: false,
    },
    validate: (values) => {
      const errors: any = {};
      if (!isLogin) {
        if (!values.name.trim()) errors.name = "Name is required";
        if (!values.phone.trim()) errors.phone = "Phone number is required";
        if (!/^\+?\d{10,15}$/.test(values.phone))
          errors.phone = "Please enter a valid phone number";
        if (!values.birthDate) errors.birthDate = "Birth date is required";
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = "Passwords do not match";
        }
        if (!values.agreeToTerms) {
          errors.agreeToTerms = "Please agree to terms and conditions";
        }
      }
      if (!values.email.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(values.email))
        errors.email = "Email is invalid";
      if (!values.password.trim()) errors.password = "Password is required";
      else if (values.password.length < 6)
        errors.password = "Password must be at least 6 characters";
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setServerError("");
      try {
        if (isLogin) {
          // Sign in existing user
          const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );

          localStorage.setItem("user", JSON.stringify(userCredential));

          console.log("User signed in:", userCredential.user);

          // Navigate to intended route after successful login
          navigate(from, { replace: true });
        } else {
          // Create new user
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );

          // Update the user's display name
          await updateProfile(userCredential.user, {
            displayName: values.name,
          });

          // Create user document in Firestore
          await createUserDocument(userCredential.user, {
            name: values.name,
            phone: values.phone,
            birthDate: values.birthDate,
          });

          console.log("New user created:", userCredential.user);

          // Navigate to intended route after successful signup
          navigate(from, { replace: true });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setServerError(error.message || "Authentication failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    formik.resetForm();
    setServerError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute opacity-20 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            top: "10%",
            left: "5%",
          }}
        >
          <Palette
            size={60}
            className="text-[hsl(var(--primary))] animate-pulse"
          />
        </div>
        <div
          className="absolute opacity-20 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${
              mousePosition.y * -0.015
            }px)`,
            top: "20%",
            right: "10%",
          }}
        >
          <Heart
            size={45}
            className="text-[hsl(var(--secondary))] animate-bounce"
          />
        </div>
        <div
          className="absolute opacity-20 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
            bottom: "15%",
            left: "15%",
          }}
        >
          <Star
            size={40}
            className="text-[hsl(var(--accent))] animate-spin"
            style={{ animationDuration: "8s" }}
          />
        </div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--accent))] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
              {isLogin ? "Welcome Back!" : "Join Our Art Community"}
            </h1>
            <p className="text-[hsl(var(--muted-foreground))]">
              {isLogin
                ? "Sign in to discover amazing artworks"
                : "Create your account and start your art journey"}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-[hsl(var(--border))] p-8 transition-all duration-300 hover:shadow-2xl">
            {serverError && (
              <p
                className="text-[hsl(var(--destructive))] text-sm mb-4"
                role="alert"
              >
                {serverError}
              </p>
            )}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] flex items-center gap-2">
                    <User size={16} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all duration-200 ${
                      formik.touched.name && formik.errors.name
                        ? "border-[hsl(var(--destructive))]"
                        : "border-[hsl(var(--border))]"
                    }`}
                    placeholder="Enter your full name"
                    aria-label="Full Name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p
                      className="text-[hsl(var(--destructive))] text-sm"
                      role="alert"
                    >
                      {formik.errors.name}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(var(--foreground))] flex items-center gap-2">
                  <Mail size={16} /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all duration-200 ${
                    formik.touched.email && formik.errors.email
                      ? "border-[hsl(var(--destructive))]"
                      : "border-[hsl(var(--border))]"
                  }`}
                  placeholder="Enter your email"
                  aria-label="Email Address"
                />
                {formik.touched.email && formik.errors.email && (
                  <p
                    className="text-[hsl(var(--destructive))] text-sm"
                    role="alert"
                  >
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] flex items-center gap-2">
                    <Phone size={16} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all duration-200 ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-[hsl(var(--destructive))]"
                        : "border-[hsl(var(--border))]"
                    }`}
                    placeholder="Enter your phone number"
                    aria-label="Phone Number"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p
                      className="text-[hsl(var(--destructive))] text-sm"
                      role="alert"
                    >
                      {formik.errors.phone}
                    </p>
                  )}
                </div>
              )}

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] flex items-center gap-2">
                    <Calendar size={16} /> Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all duration-200 ${
                      formik.touched.birthDate && formik.errors.birthDate
                        ? "border-[hsl(var(--destructive))]"
                        : "border-[hsl(var(--border))]"
                    }`}
                    aria-label="Date of Birth"
                  />
                  {formik.touched.birthDate && formik.errors.birthDate && (
                    <p
                      className="text-[hsl(var(--destructive))] text-sm"
                      role="alert"
                    >
                      {formik.errors.birthDate}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(var(--foreground))] flex items-center gap-2">
                  <Lock size={16} /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all duration-200 ${
                      formik.touched.password && formik.errors.password
                        ? "border-[hsl(var(--destructive))]"
                        : "border-[hsl(var(--border))]"
                    }`}
                    placeholder="Enter your password"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p
                    className="text-[hsl(var(--destructive))] text-sm"
                    role="alert"
                  >
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] flex items-center gap-2">
                    <Lock size={16} /> Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all duration-200 ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "border-[hsl(var(--destructive))]"
                          : "border-[hsl(var(--border))]"
                      }`}
                      placeholder="Confirm your password"
                      aria-label="Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p
                        className="text-[hsl(var(--destructive))] text-sm"
                        role="alert"
                      >
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              )}

              {!isLogin && (
                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formik.values.agreeToTerms}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 w-4 h-4 text-[hsl(var(--primary))] border-[hsl(var(--border))] rounded focus:ring-[hsl(var(--primary))]"
                    />
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-[hsl(var(--primary))] hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-[hsl(var(--primary))] hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {formik.touched.agreeToTerms &&
                    formik.errors.agreeToTerms && (
                      <p
                        className="text-[hsl(var(--destructive))] text-sm"
                        role="alert"
                      >
                        {formik.errors.agreeToTerms}
                      </p>
                    )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[hsl(var(--primary))] border-[hsl(var(--border))] rounded focus:ring-[hsl(var(--primary))]"
                    />
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[hsl(var(--primary))] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-[hsl(var(--primary-foreground))] py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 ${
                  formik.isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {formik.isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[hsl(var(--muted-foreground))]">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="ml-2 text-[hsl(var(--primary))] hover:underline font-medium transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[hsl(var(--border))]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[hsl(var(--muted-foreground))]">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 border border-[hsl(var(--border))] rounded-lg text-sm font-medium text-[hsl(var(--foreground))] bg-white hover:bg-[hsl(var(--muted))] transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-[hsl(var(--border))] rounded-lg text-sm font-medium text-[hsl(var(--foreground))] bg-white hover:bg-[hsl(var(--muted))] transition-colors">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-[hsl(var(--muted-foreground))]">
            <p>© 2025 DoodleCaboodle. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
