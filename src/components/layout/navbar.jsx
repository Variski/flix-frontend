import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import flixLogo from "../../assets/flix-logo.png";
import searchIcon from "../../assets/icon/search-icon.png";
import chatIcon from "../../assets/icon/chat-icon.png";
import notificationIcon from "../../assets/icon/notification-icon.png";
import profileIcon from "../../assets/icon/profile-icon.png";
import myWatchlistIcon from "../../assets/icon/mywatchlist-icon.png";
import communityIcon from "../../assets/icon/community-icon.png";
import settingIcon from "../../assets/icon/setting-icon.png";
import logoutIcon from "../../assets/icon/logout-icon.png";
import blueDiamondIcon from "../../assets/icon/bluediamond-icon.png";

const navItems = [
  { key: "home", label: "Home", to: "/" },
  { key: "genre", label: "Genre", to: "/genre" },
  { key: "tv", label: "TV Series", to: "/tv-series" },
  { key: "movies", label: "Movies", to: "/movies" },
  { key: "community", label: "Community", to: "/community" },
];

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const getActiveKey = (pathname, activeKey) => {
  if (activeKey) return activeKey;
  if (pathname === "/") return "home";
  if (pathname.startsWith("/genre")) return "genre";
  if (pathname.startsWith("/tv-series")) return "tv";
  if (pathname.startsWith("/movie") || pathname.startsWith("/movies")) {
    return "movies";
  }
  if (pathname.startsWith("/community") || pathname.startsWith("/post")) {
    return "community";
  }
  return "";
};

function Navbar({ mode = "absolute", activeKey }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = getStoredUser();

  const currentActiveKey = getActiveKey(location.pathname, activeKey);
  const userInitial = (user?.username || user?.email || "M")
    .slice(0, 1)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const navbarPosition =
    mode === "fixed"
      ? "fixed"
      : mode === "static"
        ? "sticky top-0 bg-black/85"
        : "absolute";

  return (
    <>
      <header
        className={`
          ${navbarPosition}
          inset-x-0 top-0 z-40 w-full
          grid min-h-[95px] grid-cols-[160px_minmax(0,1fr)_220px]
          items-center gap-10 bg-black/30 px-[75px] py-[22px]
          text-white backdrop-blur-md
          max-[1040px]:grid-cols-[auto_1fr]
          max-[1040px]:gap-y-[18px]
          max-[1040px]:px-8
          max-[640px]:px-[18px]
        `}
      >
        <Link
          to="/"
          aria-label="FLIX Home"
          className="inline-flex h-12 w-[52px] items-center"
        >
          <img
            src={flixLogo}
            alt="FLIX"
            className="block h-12 w-[52px] object-contain"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="
            flex items-center justify-center
            gap-[clamp(42px,6.25vw,90px)]
            whitespace-nowrap text-sm font-medium text-white/85
            max-[1040px]:col-span-full
            max-[1040px]:row-start-2
            max-[1040px]:gap-[clamp(24px,6vw,54px)]
            max-[640px]:justify-start
            max-[640px]:gap-6
            max-[640px]:overflow-x-auto
            max-[640px]:[scrollbar-width:none]
            max-[640px]:[&::-webkit-scrollbar]:hidden
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className={`
                transition duration-200 hover:text-white hover:opacity-75
                ${
                  currentActiveKey === item.key
                    ? "font-bold text-[#f20712] opacity-100"
                    : ""
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className="
            flex w-[220px] items-center justify-end gap-5
            justify-self-end text-sm font-medium
            max-[1040px]:col-start-2
            max-[640px]:w-auto
            max-[640px]:gap-2.5
          "
        >
          <button
            type="button"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
            className="
              grid h-10 w-10 cursor-pointer place-items-center rounded-full
              border-0 bg-[#232323] p-0 text-white transition duration-200
              hover:-translate-y-0.5 hover:bg-[#f20712]/80
              hover:shadow-[0_8px_22px_rgba(242,7,18,0.22)]
            "
          >
            <img
              src={searchIcon}
              alt=""
              className="block h-6 w-6 object-contain brightness-0 invert"
            />
          </button>

          {(token && token !== "undefined" && token !== "null" && user) ? (
            <>
              <Link
                to="/community"
                aria-label="Messages"
                className="
                  grid h-10 w-10 place-items-center rounded-full
                  bg-transparent transition duration-200
                  hover:-translate-y-0.5 hover:bg-[#f20712]/80
                  hover:shadow-[0_8px_22px_rgba(242,7,18,0.22)]
                "
              >
                <img
                  src={chatIcon}
                  alt=""
                  className="block h-6 w-6 object-contain brightness-0 invert"
                />
              </Link>

              <button
                type="button"
                aria-label="Notifications"
                className="
                  grid h-10 w-10 cursor-pointer place-items-center rounded-full
                  border-0 bg-transparent p-0 transition duration-200
                  hover:-translate-y-0.5 hover:bg-[#f20712]/80
                  hover:shadow-[0_8px_22px_rgba(242,7,18,0.22)]
                "
              >
                <img
                  src={notificationIcon}
                  alt=""
                  className="block h-6 w-6 object-contain brightness-0 invert"
                />
              </button>

              <details className="relative h-10 w-10">
                <summary
                  aria-label="User menu"
                  className="
                    grid h-10 w-10 cursor-pointer list-none place-items-center
                    rounded-full transition duration-200
                    hover:-translate-y-0.5
                    hover:shadow-[0_8px_24px_rgba(242,7,18,0.28)]
                    [&::-webkit-details-marker]:hidden
                  "
                >
                  <span
                    className="
                      grid h-10 w-10 place-items-center rounded-full
                      bg-[#e50914] text-lg font-medium leading-none text-white
                    "
                  >
                    {userInitial}
                  </span>
                </summary>

                <div
                  className="
                    absolute right-[-18px] top-[calc(100%+16px)] z-[60]
                    flex w-[293px] flex-col gap-1 rounded-[20px]
                    bg-[#141414] px-[25px] py-4
                    shadow-[0_2px_3px_rgba(0,0,0,0.15),0_6px_6px_rgba(0,0,0,0.13),0_14px_8px_rgba(0,0,0,0.08),0_24px_10px_rgba(0,0,0,0.02)]
                  "
                >
                  <ProfileItem to="/profile" icon={profileIcon} label="Profile" />

                  <ProfileItem
                    to="/movies"
                    icon={myWatchlistIcon}
                    label="Watchlist"
                  />

                  <Link
                    to="/community"
                    className="
                      flex h-10 w-full items-center gap-3 rounded-[10px]
                      px-3 py-2 text-left text-lg font-normal leading-[22px]
                      text-white transition duration-200 hover:bg-white/5
                    "
                  >
                    <img
                      src={communityIcon}
                      alt=""
                      className="h-6 w-6 flex-none object-contain"
                    />
                    <span className="flex-1">Community</span>

                    <span
                      className="
                        inline-flex h-[27px] w-[60px] flex-none items-center
                        justify-center gap-[3px] rounded-full border border-white/15
                        bg-gradient-to-r from-[#e50914] to-[#7f050b]
                        text-xs font-medium text-white
                      "
                    >
                      <img
                        src={blueDiamondIcon}
                        alt=""
                        className="h-4 w-4 object-contain"
                      />
                      Pro
                    </span>
                  </Link>

                  <ProfileItem to="/profile" icon={settingIcon} label="Settings" />

                  {user?.role === "moderator" && (
                    <ProfileItem
                      to="/moderator"
                      icon={settingIcon}
                      label="Moderator"
                    />
                  )}

                  {user?.role === "admin" && (
                    <ProfileItem to="/admin" icon={settingIcon} label="Admin" />
                  )}

                  <div className="h-px w-full bg-[#232323]" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex h-10 w-full cursor-pointer items-center gap-3
                      rounded-[10px] border-0 bg-transparent px-3 py-2
                      text-left text-lg font-normal leading-[22px] text-white
                      transition duration-200 hover:bg-white/5
                    "
                  >
                    <img
                      src={logoutIcon}
                      alt=""
                      className="h-6 w-6 flex-none object-contain"
                    />
                    <span className="flex-1">Logout</span>
                  </button>
                </div>
              </details>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                  text-white transition duration-200 hover:opacity-75
                  max-[640px]:hidden
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  inline-flex h-10 min-w-[88px] items-center justify-center
                  rounded-3xl bg-[#f20712] px-5 text-white
                  transition duration-200
                  hover:-translate-y-0.5 hover:bg-[#ff1722]
                  hover:shadow-[0_8px_24px_rgba(242,7,18,0.28)]
                "
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </header>

      <SearchPopup open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

function SearchPopup({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && trending.length === 0) {
      const fetchTrending = async () => {
        try {
          const res = await fetch("/api/tmdb/trending?timeWindow=day");
          if (!res.ok) return;
          const json = await res.json();
          setTrending((json.data?.results || []).slice(0, 5));
        } catch (e) {
          console.error("Trending error:", e);
        }
      };
      fetchTrending();
    }
  }, [open, trending.length]);

  useEffect(() => {
    const keyword = query.trim();
    if (!keyword) {
      setResults([]);
      return undefined;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/tmdb/search?query=${encodeURIComponent(keyword)}&page=1`
        );
        if (!response.ok) throw new Error("Gagal mencari film");

        const json = await response.json();
        const data = json.data || { results: [] };
        
        // Ambil maksimal 5 hasil teratas
        setResults((data.results || []).slice(0, 5));
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  if (!open) return null;

  const handleSelectMovie = (movieId) => {
    onClose();
    navigate(`/movie/${movieId}`);
  };

  const handleSeeAll = () => {
    onClose();
    navigate(`/movies?search=${encodeURIComponent(query)}`);
  };

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[999] grid place-items-start bg-black/70 px-4 pt-28 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search movies"
        className="
          mx-auto w-full max-w-2xl rounded-3xl border border-white/10
          bg-[#141414] p-5 text-white shadow-2xl
        "
      >
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              <img
                src={searchIcon}
                alt=""
                className="block h-6 w-6 object-contain brightness-0 invert"
              />  
            </span>

            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search movies..."
              className="
                h-12 w-full rounded-2xl border border-white/10
                bg-[#232323] pl-11 pr-4 text-sm text-white
                outline-none transition
                placeholder:text-white/40
                focus:border-[#f20712]
              "
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="
              grid h-12 w-12 shrink-0 place-items-center rounded-2xl
              border border-white/10 bg-[#232323] text-xl text-white
              transition hover:border-[#f20712] hover:bg-[#f20712]/20
            "
          >
            ×
          </button>
        </div>

        <div className="mt-5 max-h-[320px] space-y-2 overflow-y-auto pr-1">
          {!query.trim() && trending.length > 0 && (
            <p className="mb-3 px-2 text-sm font-medium text-white/60">
               Trending 
            </p>
          )}

          {isLoading ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/50">
              Mencari...
            </p>
          ) : query.trim() && results.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/50">
              Film tidak ditemukan.
            </p>
          ) : (
            (query.trim() ? results : trending).map((movie) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => handleSelectMovie(movie.id)}
                className="
                  flex w-full items-center justify-between rounded-2xl
                  border border-transparent bg-white/5 px-4 py-3 text-left
                  transition hover:border-[#f20712]/60 hover:bg-[#f20712]/10
                "
              >
                <div className="flex items-center gap-3">
                  {movie.poster_url && (
                    <img 
                      src={movie.poster_url} 
                      alt="" 
                      className="h-12 w-8 rounded object-cover" 
                    />
                  )}
                  <div>
                    <p className="font-medium text-white">{movie.title}</p>
                    <p className="text-xs text-white/45">
                      {movie.release_date ? movie.release_date.substring(0, 4) : "Unknown Year"} 
                      {movie.vote_average ? ` • ⭐ ${movie.vote_average.toFixed(1)}` : ""}
                    </p>
                  </div>
                </div>

                <span className="text-sm text-[#f20712]">Lihat</span>
              </button>
            ))
          )}
        </div>

        {query.trim() && (
          <button
            type="button"
            onClick={handleSeeAll}
            className="
              mt-4 w-full rounded-2xl bg-[#f20712] px-4 py-3
              text-sm font-medium text-white transition hover:bg-[#ff1722]
            "
          >
            Lihat semua hasil untuk "{query}"
          </button>
        )}
      </div>
    </div>
  );
}

function ProfileItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="
        flex h-10 w-full items-center gap-3 rounded-[10px]
        px-3 py-2 text-left text-lg font-normal leading-[22px]
        text-white transition duration-200 hover:bg-white/5
      "
    >
      <img src={icon} alt="" className="h-6 w-6 flex-none object-contain" />
      <span className="flex-1">{label}</span>
    </Link>
  );
}

export default Navbar;