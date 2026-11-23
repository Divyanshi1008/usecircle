
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  BookOpen,
  Laptop,
  Calculator,
  Dumbbell,
  Camera,
  FlaskConical,
  Menu,
  X,
  Recycle,
  ShieldCheck,
  Users,
  Leaf,
  MapPin,
  Plus,
  Heart,
} from "lucide-react";
import "../App.css";
const categories = [
  { name: "Books", desc: "Textbooks & study notes", icon: BookOpen, color: "cat-sage" },
  { name: "Electronics", desc: "Gadgets & devices", icon: Laptop, color: "cat-blue" },
  { name: "Study Tools", desc: "Calculators & stationery", icon: Calculator, color: "cat-yellow" },
  { name: "Sports", desc: "Sports & fitness gear", icon: Dumbbell, color: "cat-peach" },
  { name: "Lab Equipment", desc: "Tools for projects", icon: FlaskConical, color: "cat-pink" },
];

const products = [
  {
    id: 1,
    name: "Scientific Calculator",
    category: "Study Tools",
    condition: "Like New",
    location: "Central Library",
    owner: "Aarav Sharma",
    icon: Calculator,
    color: "product-sage",
    emoji: "🧮",
  },
  {
    id: 2,
    name: "Engineering Physics",
    category: "Books",
    condition: "Good",
    location: "Block A",
    owner: "Priya Mehta",
    icon: BookOpen,
    color: "product-peach",
    emoji: "📚",
  },
  {
    id: 3,
    name: "DSLR Camera",
    category: "Electronics",
    condition: "Like New",
    location: "Media Lab",
    owner: "Rahul Verma",
    icon: Camera,
    color: "product-blue",
    emoji: "📷",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [liked, setLiked] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const matchesSearch =
        `${product.name} ${product.category} ${product.location}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toggleLike = (id) => {
    setLiked((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#home" className="logo" onClick={closeMenu}>
            <span className="logo-icon">u</span>
            usecircle<span className="logo-dot">.</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#categories" onClick={closeMenu}>Categories</a>
            <a href="#explore" onClick={closeMenu}>Explore</a>
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          </nav>

          <div className="nav-actions">
<a href="/login" className="login-link">Log in</a>           <a href="/register" className="btn btn-dark nav-join">
  Join your campus <ArrowUpRight size={16} />
</a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section-container" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot"></span>
              MADE FOR STUDENT COMMUNITIES
            </div>

            <h1>
              Good things are
              <br />
              <em>better shared.</em>
            </h1>

            <p className="hero-description">
              Need a calculator for one exam? A camera for one project?
              Find useful things on your campus and borrow them for free.
            </p>

            <div className="hero-buttons">
              <a href="#explore" className="btn btn-lime">
                Explore items <ArrowUpRight size={18} />
              </a>
              <a href="#how-it-works" className="text-button">
                How it works <ArrowRight size={17} />
              </a>
            </div>

            <div className="hero-community">
              <div className="avatar-stack">
                <span>A</span>
                <span>P</span>
                <span>R</span>
                <span>+</span>
              </div>
              <p>Students helping students, one item at a time.</p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-top">
              <span>THE CAMPUS SHAREBOARD</span>
              <span className="visual-live">
                <i></i> COMMUNITY FIRST
              </span>
            </div>

            <div className="hero-photo">
              <div className="photo-shade"></div>
              <div className="photo-copy">
                <span>USE WHAT YOU NEED</span>
                <h2>
                  Share more.
                  <br />
                  <em>Buy less.</em>
                </h2>
              </div>

              <div className="floating-card floating-one">
                <BookOpen size={21} />
                <div>
                  <strong>Study smarter</strong>
                  <small>Books & notes</small>
                </div>
              </div>

              <div className="floating-card floating-two">
                <Camera size={21} />
                <div>
                  <strong>Create more</strong>
                  <small>Tech & equipment</small>
                </div>
              </div>
            </div>

            <div className="visual-bottom">
              <span>ONE CAMPUS. ENDLESS POSSIBILITIES.</span>
              <ArrowUpRight size={17} />
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker">
          <div>
            SHARE KNOWLEDGE <span>✳</span>
            SAVE MONEY <span>✳</span>
            BUILD COMMUNITY <span>✳</span>
            BORROW BETTER <span>✳</span>
            SHARE KNOWLEDGE <span>✳</span>
          </div>
        </div>

        {/* CATEGORIES */}
        <section className="section-container categories-section" id="categories">
          <div className="section-heading">
            <div>
              <div className="eyebrow">FIND YOUR NEXT HELPFUL THING</div>
              <h2>What do you <em>need?</em></h2>
              <p>Explore useful things shared by students at your campus.</p>
            </div>
            <a href="#explore" className="text-button">
              All categories <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="category-grid">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  className={`category-card ${category.color}`}
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(category.name);
                    document.getElementById("explore")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <span className="category-icon">
                    <Icon size={24} />
                  </span>
                  <strong>{category.name}</strong>
                  <small>{category.desc}</small>
                  <ArrowUpRight className="category-arrow" size={18} />
                </button>
              );
            })}
          </div>
        </section>

        {/* FEATURED ITEMS */}
        <section className="featured-section" id="explore">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">SHARED BY YOUR CAMPUS</div>
                <h2>Good finds. <em>Zero cost.</em></h2>
                <p>Useful things waiting for their next student.</p>
              </div>
              <span className="free-label">
                <Leaf size={16} /> EVERYTHING FREE TO BORROW
              </span>
            </div>

            <div className="market-toolbar">
              <div className="search-field">
                <Search size={19} />
                <input
                  type="search"
                  placeholder="Search books, calculators, cameras..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="market-filters">
                {["All", "Books", "Electronics", "Study Tools"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`filter-button ${
                      activeCategory === category ? "filter-active" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const Icon = product.icon;
                  const isLiked = liked.includes(product.id);

                  return (
                    <article className="product-card" key={product.id}>
                      <div className={`product-image ${product.color}`}>
                        <div className="free-badge">FREE TO BORROW</div>
                        <button
                          className={`favorite-btn ${isLiked ? "liked" : ""}`}
                          onClick={() => toggleLike(product.id)}
                          aria-label="Save item"
                        >
                          <Heart size={19} fill={isLiked ? "currentColor" : "none"} />
                        </button>
                        <span className="product-emoji" aria-hidden="true">
                          {product.emoji}
                        </span>
                      </div>

                      <div className="product-info">
                        <div className="product-meta">
                          <span>{product.category}</span>
                          <span>{product.condition}</span>
                        </div>

                        <h3>{product.name}</h3>

                        <div className="product-location">
                          <MapPin size={14} /> {product.location}
                        </div>

                        <div className="product-footer">
                          <div className="owner-info">
                            <span className="owner-avatar">
                              {product.owner.charAt(0)}
                            </span>
                            <span>{product.owner}</span>
                          </div>
                          <span className="product-arrow">
                            <ArrowUpRight size={17} />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="no-results">
                  <Search size={28} />
                  <h3>No items found</h3>
                  <p>Try another search or category.</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            <div className="market-bottom">
              <p>These are sample preview listings. Real campus listings will appear after database integration.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                View all preview items <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section" id="how-it-works">
          <div className="section-container">
            <div className="how-heading">
              <div>
                <div className="eyebrow eyebrow-light">SIMPLE BY DESIGN</div>
                <h2>
                  Sharing made
                  <br />
                  <em>simple.</em>
                </h2>
              </div>
              <p>
                No payments. No complicated setup. Just students sharing
                useful things with people in their college.
              </p>
            </div>

            <div className="steps-grid">
              <article className="step-card">
                <span className="step-number">01</span>
                <Users size={27} />
                <h3>Join your campus</h3>
                <p>Create your student profile and become part of your college community.</p>
              </article>

              <article className="step-card">
                <span className="step-number">02</span>
                <Recycle size={27} />
                <h3>Find or share</h3>
                <p>Borrow something you need or list an item another student can use.</p>
              </article>

              <article className="step-card">
                <span className="step-number">03</span>
                <ShieldCheck size={27} />
                <h3>Pass it forward</h3>
                <p>Agree on pickup and return, then keep the sharing cycle going.</p>
              </article>
            </div>

            <div className="bottom-cta" id="join">
              <div>
                <div className="eyebrow eyebrow-light">BE PART OF THE CIRCLE</div>
                <h2>
                  Have something
                  <br />
                  <em>worth sharing?</em>
                </h2>
              </div>

             <a href="/register" className="btn btn-lime">
  Get started <ArrowUpRight size={18} />
</a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="section-container footer-inner">
          <a href="#home" className="logo">
            <span className="logo-icon">u</span>
            usecircle<span className="logo-dot">.</span>
          </a>
          <p>Share more. Buy less. Build community.</p>
          <span>© {new Date().getFullYear()} USECIRCLE</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

