import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const { login, register, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success = false;
    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await register(username, email, password);
    }

    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f1] flex items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-[#e5dfd3] p-10">
        <div className="text-center mb-8">
          <div className="text-gnosis-red font-bold text-3xl tracking-widest mb-2">
            GNOSIS
          </div>
          <p className="text-[#6b7280]">
            {isLogin
              ? "Welcome back, Commander."
              : "Begin your journey to mastery."}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-[#1f2937] mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
                className="w-full bg-[#fbf8f1] border border-[#e5dfd3] rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"
                placeholder="Commander_01"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-[#1f2937] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#fbf8f1] border border-[#e5dfd3] rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1f2937] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#fbf8f1] border border-[#e5dfd3] rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-4 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            }`}
          >
            {isLoading
              ? "Processing..."
              : isLogin
                ? "Log In"
                : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-[#6b7280]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 hover:text-orange-700 font-bold"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
