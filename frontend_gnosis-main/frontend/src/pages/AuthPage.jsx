import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/store";
import api from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        login(res.data.user, res.data.token);
        navigate("/home");
      } else {
        await api.post("/auth/register", formData);
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        login(res.data.user, res.data.token);
        navigate("/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[24px] shadow-xl border border-surface-variant overflow-hidden"
      >
        <div className="p-8 pb-6 border-b border-surface-variant bg-surface-container-lowest/50">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-soft">
              G
            </div>
          </div>
          <div className="flex bg-surface-variant rounded-full p-1 mb-2 relative">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ${isLogin ? "left-1" : "left-[calc(50%+2px)]"}`}
            />
            <button
              className={`flex-1 py-2 text-sm font-semibold relative z-10 ${isLogin ? "text-inverse-surface" : "text-on-surface-variant"}`}
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold relative z-10 ${!isLogin ? "text-inverse-surface" : "text-on-surface-variant"}`}
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-inverse-surface mb-6 text-center">
                {isLogin ? "Welcome Back" : "Begin Your Journey"}
              </h2>

              {error && (
                <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm font-medium mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-1.5">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-surface-variant rounded-xl focus:outline-none focus:border-primary transition-colors text-inverse-surface font-medium"
                      placeholder="e.g. CodeNinja"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-surface-variant rounded-xl focus:outline-none focus:border-primary transition-colors text-inverse-surface font-medium"
                    placeholder="student@university.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-surface-variant rounded-xl focus:outline-none focus:border-primary transition-colors text-inverse-surface font-medium"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-container transition-all hover:-translate-y-0.5 shadow-soft hover:shadow-md mt-4 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center h-14"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
