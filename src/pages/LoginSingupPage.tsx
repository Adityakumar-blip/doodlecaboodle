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
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseconfig";

const LoginSignupPage = () => {
  const [view, setView] = useState<"login" | "signup" | "forgotPassword">(
    "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isLogin = view === "login";
  const isSignup = view === "signup";
  const isForgotPassword = view === "forgotPassword";

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from ||
    new URLSearchParams(location.search).get("redirect") ||
    "/";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleResetPassword = async (email: string) => {
    setServerError("");
    setSuccessMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
      // Optional: switch back to login after some time
      // setTimeout(() => setView("login"), 5000);
    } catch (error: any) {
      console.error("Reset password error:", error);
      setServerError(error.message || "Failed to send reset email");
    }
  };

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
      
      if (isForgotPassword) {
        if (!values.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(values.email))
          errors.email = "Email is invalid";
        return errors;
      }

      if (isSignup) {
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
      
      if (!isForgotPassword) {
        if (!values.password.trim()) errors.password = "Password is required";
        else if (values.password.length < 6)
          errors.password = "Password must be at least 6 characters";
      }
      
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setServerError("");
      setSuccessMessage("");
      try {
        if (isForgotPassword) {
          await handleResetPassword(values.email);
        } else if (isLogin) {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          localStorage.setItem("user", JSON.stringify(userCredential));
          navigate(from, { replace: true });
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await updateProfile(userCredential.user, {
            displayName: values.name,
          });
          await createUserDocument(userCredential.user, {
            name: values.name,
            phone: values.phone,
            birthDate: values.birthDate,
          });
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
    setView(isLogin ? "signup" : "login");
    formik.resetForm();
    setServerError("");
    setSuccessMessage("");
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Doodly background with hand-drawn SVG elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          <path
            d="M0,100 C150,300 350,0 500,200 S650,300 800,100 T1000,300 1200,200 V600 H0 Z"
            fill="none"
            stroke="#3C2F2F"
            strokeWidth="2"
            strokeDasharray="10,5"
            className="animate-pulse"
          />
          <path
            d="M1200,500 C1050,200 850,600 700,400 S550,200 400,400 T200,300 0,400 V600 H1200 Z"
            fill="none"
            stroke="#4A3728"
            strokeWidth="2"
            strokeDasharray="8,8"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
        <div
          className="absolute opacity-30 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            top: "10%",
            left: "5%",
          }}
        >
          <Palette size={60} className="text-brown-700 animate-pulse" />
        </div>
        <div
          className="absolute opacity-30 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${
              mousePosition.y * -0.015
            }px)`,
            top: "20%",
            right: "10%",
          }}
        >
          <Heart size={45} className="text-black animate-bounce" />
        </div>
        <div
          className="absolute opacity-30 transition-transform duration-1000 ease-out"
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
            className="text-brown-800 animate-spin"
            style={{ animationDuration: "8s" }}
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-brown-700 rounded-full mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div> */}
            <h1 className="text-3xl font-bold text-black font-['Jost']">
              {isLogin
                ? "Welcome Back!"
                : isSignup
                ? "Join Our Doodle Crew!"
                : "Reset Your Password"}
            </h1>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-brown-300 p-8 transition-all duration-300 hover:shadow-2xl">
            {serverError && (
              <p
                className="text-red-600 text-sm mb-4 font-['Jost']"
                role="alert"
              >
                {serverError}
              </p>
            )}
            {successMessage && (
              <p
                className="text-green-600 text-sm mb-4 font-['Jost'] font-medium"
                role="alert"
              >
                {successMessage}
              </p>
            )}
            <div className="space-y-6">
              {isSignup && (
                <div className="space-y-2">
                    <label className="text-lg font-medium text-black font-['Jost'] flex items-center gap-2">
                    <User size={16} className="text-brown-700" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full text-md px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all duration-200 bg-white/50 font-['Jost'] ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-600"
                        : ""
                    }`}
                    placeholder="Your doodly name"
                    aria-label="Full Name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p
                      className="text-red-600 text-sm font-handwritten"
                      role="alert"
                    >
                      {formik.errors.name}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-lg font-medium text-black font-['Jost'] flex items-center gap-2">
                  <Mail size={16} className="text-brown-700" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all duration-200 bg-white/50 font-['Jost'] ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-600"
                      : ""
                  }`}
                  placeholder="Your email sketch"
                  aria-label="Email Address"
                />
                {formik.touched.email && formik.errors.email && (
                  <p
                    className="text-red-600 text-sm font-['Jost']"
                    role="alert"
                  >
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <label className="text-lg font-medium text-black font-['Jost'] flex items-center gap-2">
                    <Phone size={16} className="text-brown-700" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all duration-200 bg-white/50 font-['Jost'] ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-600"
                        : ""
                    }`}
                    placeholder="Your digits"
                    aria-label="Phone Number"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p
                      className="text-red-600 text-sm font-['Jost']"
                      role="alert"
                    >
                      {formik.errors.phone}
                    </p>
                  )}
                </div>
              )}

              {isSignup && (
                <div className="space-y-2">
                  <label className="text-lg font-medium text-black font-['Jost'] flex items-center gap-2">
                    <Calendar size={16} className="text-brown-700" /> Date of
                    Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all duration-200 bg-white/50 font-['Jost'] ${
                      formik.touched.birthDate && formik.errors.birthDate
                        ? "border-red-600"
                        : ""
                    }`}
                    aria-label="Date of Birth"
                  />
                  {formik.touched.birthDate && formik.errors.birthDate && (
                    <p
                      className="text-red-600 text-sm font-['Jost']"
                      role="alert"
                    >
                      {formik.errors.birthDate}
                    </p>
                  )}
                </div>
              )}

              {!isForgotPassword && (
                <div className="space-y-2">
                  <label className="text-lg font-medium text-black font-['Jost'] flex items-center gap-2">
                    <Lock size={16} className="text-brown-700" /> Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 pr-12 border border-brown-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all duration-200 bg-white/50 font-['Jost'] ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-600"
                          : ""
                      }`}
                      placeholder="Your secret code"
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-600 hover:text-brown-800"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p
                      className="text-red-600 text-sm font-['Jost']"
                      role="alert"
                    >
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              )}

              {isSignup && (
                <div className="space-y-2">
                  <label className="text-lg font-medium text-black font-['Jost'] flex items-center gap-2">
                    <Lock size={16} className="text-brown-700" /> Confirm
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 pr-12 border border-brown-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all duration-200 bg-white/50 font-['Jost'] ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "border-red-600"
                          : ""
                      }`}
                      placeholder="Confirm your secret code"
                      aria-label="Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-600 hover:text-brown-800"
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
                        className="text-red-600 text-sm font-['Jost']"
                        role="alert"
                      >
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              )}

              {isSignup && (
                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formik.values.agreeToTerms}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 w-4 h-4 text-brown-700 border-brown-300 rounded focus:ring-brown-500"
                    />
                    <span className="text-md text-brown-600 font-['Jost']">
                      I agree to the{" "}
                      <a
                        href="/service-terms"
                        className="text-brown-800 hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy-policy"
                        className="text-brown-800 hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {formik.touched.agreeToTerms &&
                    formik.errors.agreeToTerms && (
                      <p
                        className="text-red-600 text-sm font-['Jost']"
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
                      className="w-4 h-4 text-brown-700 border-brown-300 rounded focus:ring-brown-500"
                    />
                    <span className="text-md text-brown-600 font-['Jost']">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setView("forgotPassword");
                      setServerError("");
                      setSuccessMessage("");
                    }}
                    className="text-md text-brown-800 hover:underline font-medium font-['Jost']"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
                className={`w-full bg-primary text-primary-foreground text-[20px] py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 font-handwritten ${
                  formik.isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {formik.isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin font-['Jost']"></div>
                ) : (
                  <span className="font-['Jost'] flex items-center gap-2">
                    {isLogin
                      ? "Sign In"
                      : isSignup
                      ? "Create Account"
                      : "Send Reset Link"}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-brown-600 font-['Jost']">
                {isForgotPassword ? (
                  <button
                    onClick={() => {
                      setView("login");
                      setServerError("");
                      setSuccessMessage("");
                    }}
                    className="text-brown-800 hover:underline font-medium transition-colors font-['Jost']"
                  >
                    Back to Sign In
                  </button>
                ) : (
                  <>
                    {isLogin ? "New to the doodle crew?" : "Already a doodler?"}
                    <button
                      onClick={toggleMode}
                      className="ml-2 text-brown-800 hover:underline font-medium transition-colors font-['Jost']"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-brown-600 font-['Jost']">
            <p>© 2025 Doodle Caboodle. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.2;
          }
        }
        .animate-pulse {
          animation: pulse 3s infinite;
        }
        @font-face {
          font-family: "Handwritten";
          src: url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap");
        }
        .font-handwritten {
          font-family: "Caveat", cursive;
        }
      `}</style>
    </div>
  );
};

export default LoginSignupPage;
