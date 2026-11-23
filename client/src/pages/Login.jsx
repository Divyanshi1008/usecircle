
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, Leaf } from "lucide-react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem(
        "usecircle_token",
        response.data.token
      );

      localStorage.setItem(
        "usecircle_user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-decoration">
          <Link to="/" className="auth-back">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <Leaf size={34} className="auth-leaf" />

          <span className="auth-eyebrow">
            YOUR CAMPUS. YOUR COMMUNITY.
          </span>

          <h1>
            Borrow a thing.
            <br />
            <em>Build a connection.</em>
          </h1>

          <p>
            Find useful things shared by students
            in your college community.
          </p>

          <span className="auth-bottom">
            USECIRCLE · CAMPUS EDITION
          </span>
        </div>

        <div className="auth-content">
          <span className="auth-eyebrow">WELCOME BACK</span>

          <h2>
            Good to see
            <br />
            <em>you again.</em>
          </h2>

          <p>Log in to your campus community.</p>

          <form onSubmit={handleSubmit}>
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@college.edu"
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            {error && (
              <div className="auth-error">{error}</div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
              <ArrowUpRight size={18} />
            </button>
          </form>

          <div className="auth-switch">
            New to USECIRCLE?
            <Link to="/register"> Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
