import React, { useState } from "react";
import { auth } from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Foydalanuvchini tizimga kiritish
      await signInWithEmailAndPassword(auth, email, password);

      // 🔹 Home sahifasiga yo‘naltirish
      navigate("/");
    } catch (err) {
      console.error(err.message);

      // 🔹 Foydalanuvchiga qulay xabar chiqaramiz
      if (err.code === "auth/user-not-found") {
        setError("Bunday email topilmadi. Iltimos, ro'yxatdan o'ting.");
      } else if (err.code === "auth/wrong-password") {
        setError("Parol noto‘g‘ri. Qayta urinib ko‘ring.");
      } else {
        setError("Kirishda xatolik yuz berdi.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="example@gmail.com"
            className="input input-bordered w-full email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <Link to={"/signup"}>Create new account</Link>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
