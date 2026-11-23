
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, Leaf, Globe } from "lucide-react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    country: "",
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
        "http://localhost:5000/api/auth/register",
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
        "Registration failed. Please try again."
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
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="global-auth-brand">
            <Globe size={34} />
          </div>

          <div>
            <span className="auth-eyebrow">
              SHARING HAS NO BOUNDARIES
            </span>

            <h1>
              Less buying.
              <br />
              <em>More sharing.</em>
            </h1>

            <p>
              Join a growing community where people
              share useful things, save money and help
              each other.
            </p>
          </div>

          <span className="auth-bottom">
            USECIRCLE · OPEN COMMUNITY
          </span>
        </div>

        <div className="auth-content">
          <span className="auth-eyebrow">
            CREATE YOUR ACCOUNT
          </span>

          <h2>
            Join the
            <br />
            <em>circle.</em>
          </h2>

          <p>
            Create your free account. Everyone is welcome.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Full name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              maxLength={70}
              required
            />

            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <div className="auth-field-row">
              <div>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Bhopal"
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="e.g. India"
                  maxLength={100}
                  required
                />
              </div>
            </div>

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              minLength={8}
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
              {loading ? "Creating account..." : "Create account"}
              <ArrowUpRight size={18} />
            </button>
          </form>

          <div className="auth-switch">
            Already a member?
            <Link to="/login"> Log in</Link>
          </div>

          <div className="global-auth-note">
            <Leaf size={14} />
            Free to join. Open to everyone.
          </div>
        </div>

      </div>
    </div>
  );
}
