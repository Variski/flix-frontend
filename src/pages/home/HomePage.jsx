import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaPlay,
  FaSlidersH,
  FaStar,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import Navbar from "../../components/layout/navbar";
import FilterPopup from "./FilterPopup";

import menegangkanIcon from "../../assets/emoticon/menegangkan-emoticon.png";
import pikiranIcon from "../../assets/emoticon/pikiran-emoticon.png";
import romantisIcon from "../../assets/emoticon/romantis-emoticon.png";
import santaiIcon from "../../assets/emoticon/santai-emoticon.png";
import sedihIcon from "../../assets/emoticon/sedih-emoticon.png";
import seruIcon from "../../assets/emoticon/seru-emoticon.png";

const fallbackHeroMovie = {
  id: "space-force",
  title: "Space Force",
  rating: "4.9",
  year: "2024",
  poster: "https://image.tmdb.org/t/p/w780/zgu3p4NvisS8CI68cUfBKbvAvu8.jpg",
  backdrop: "https://image.tmdb.org/t/p/original/lV6WA95QboTUQDkFWjP3wI9U8xp.jpg",
  overview:
    "Sekelompok orang menjalankan cabang baru angkatan bersenjata dengan misi besar dan situasi yang tidak selalu berjalan sesuai rencana.",
  genre_ids: [35],
};

const moods = [
  { id: "santai", label: "Santai", icon: santaiIcon, genre: "35|10751|16" },
  { id: "seru", label: "Seru", icon: seruIcon, genre: "28|12" },
  { id: "sedih", label: "Sedih", icon: sedihIcon, genre: "18" },
  {
    id: "menegangkan",
    label: "Menegangkan",
    icon: menegangkanIcon,
    genre: "53|27",
  },
  { id: "romantis", label: "Romantis", icon: romantisIcon, genre: "10749" },
  { id: "pikiran", label: "Pikiran", icon: pikiranIcon, genre: "878|9648" },
];

const fallbackPosterUrl =
  "https://image.tmdb.org/t/p/w500/cdPSUck4tBRvRu6DFk6XciDrssn.jpg";

const fallbackBackdropUrl =
  "https://image.tmdb.org/t/p/original/tiIpajUBpLMNWMEzpjRBxo0jCbD.jpg";

const defaultGenreLookup = {
  12: "Petualangan",
  14: "Fantasi",
  16: "Animasi",
  18: "Drama",
  27: "Horor",
  28: "Aksi",
  35: "Komedi",
  53: "Thriller",
  878: "Sci-Fi",
  9648: "Misteri",
  10749: "Romantis",
  10751: "Keluarga",
};

const movieFilterGenreOptions = [
  { value: "all", label: "Semua" },
  { value: "18", label: "Drama" },
  { value: "53", label: "Thriller" },
  { value: "16", label: "Animasi" },
  { value: "35", label: "Komedi" },
  { value: "12", label: "Adventure" },
  { value: "14", label: "Fantasy" },
  { value: "27", label: "Horror" },
  { value: "28", label: "Aksi" },
  { value: "10749", label: "Romantis" },
];

const platformFilterOptions = [
  { value: "all", label: "Semua" },
  { value: "netflix", label: "Netflix" },
  { value: "disney", label: "Disney+" },
  { value: "prime", label: "Prime Video" },
  { value: "vidio", label: "Vidio" },
  { value: "viu", label: "Viu" },
  { value: "wetv", label: "WeTV" },
  { value: "hbo", label: "HBO Max" },
  { value: "apple", label: "Apple TV" },
  { value: "catchplay", label: "Catchplay" },
];

const platformMatchers = {
  netflix: ["netflix"],
  disney: ["disney", "hotstar"],
  prime: ["prime video", "amazon"],
  vidio: ["vidio"],
  viu: ["viu"],
  wetv: ["wetv", "we tv"],
  hbo: ["hbo", "max"],
  apple: ["apple tv"],
  catchplay: ["catchplay"],
};

const movieSortOptions = [
  { value: "latest", label: "Terbaru" },
  { value: "za", label: "Z - A" },
  { value: "az", label: "A - Z" },
  { value: "rating", label: "Rating Tertinggi" },
];

const defaultFilterValues = {
  genre: "all",
  platform: "all",
  sort: "latest",
};

const fallbackMovies = Array.from({ length: 8 }, (_, index) => ({
  id: `fallback-${index + 1}`,
  title: "Cargo",
  year: "2023",
  rating: "4.9",
  poster: fallbackPosterUrl,
  backdrop: fallbackBackdropUrl,
  overview:
    "Seorang ayah berusaha melindungi bayinya dalam perjalanan penuh risiko setelah wabah mengubah dunia menjadi tempat yang berbahaya.",
  genre_ids: [18, 53],
}));

const heroMovieLimit = 4;

const getMovieYear = (date) => date?.slice(0, 4) || "-";

const getMovieRating = (voteAverage) => {
  const numericRating = Number(voteAverage);

  if (!Number.isFinite(numericRating) || numericRating <= 0) {
    return "-";
  }

  return (numericRating / 2).toFixed(1);
};

const getShortOverview = (overview) => {
  const cleanOverview = overview?.trim();

  if (!cleanOverview) {
    return "Deskripsi belum tersedia.";
  }

  if (cleanOverview.length <= 96) {
    return cleanOverview;
  }

  return `${cleanOverview.slice(0, 93).trim()}...`;
};

const getProviderNames = (watchProviders = {}) => {
  const providers = [
    ...(watchProviders.all || []),
    ...(watchProviders.flatrate || []),
    ...(watchProviders.free || []),
    ...(watchProviders.ads || []),
    ...(watchProviders.rent || []),
    ...(watchProviders.buy || []),
  ];

  return [...new Set(providers.map((provider) => provider.provider_name || ""))]
    .map((providerName) => providerName.toLowerCase())
    .filter(Boolean);
};

const matchesPlatformFilter = (watchProviders, selectedPlatform) => {
  if (selectedPlatform === "all") {
    return true;
  }

  const keywords = platformMatchers[selectedPlatform] || [selectedPlatform];

  return getProviderNames(watchProviders).some((providerName) =>
    keywords.some((keyword) => providerName.includes(keyword))
  );
};

const getRatingSortScore = (rating) => {
  const score = Number(rating);
  return Number.isFinite(score) ? score : 0;
};

const sortMovieList = (movies, sortKey) => {
  const sortedMovies = [...movies];

  if (sortKey === "az") {
    return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortKey === "za") {
    return sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (sortKey === "rating") {
    return sortedMovies.sort(
      (a, b) => getRatingSortScore(b.rating) - getRatingSortScore(a.rating)
    );
  }

  return sortedMovies;
};

const applyMovieFilters = (movies, filters, providersByMovieId) => {
  const filteredMovies = movies.filter((movie) => {
    const movieId = String(movie.id);

    const matchesGenre =
      filters.genre === "all" ||
      (movie.genre_ids || [])
        .map((genreId) => String(genreId))
        .includes(filters.genre);

    const hasLoadedProvider = Object.prototype.hasOwnProperty.call(
      providersByMovieId,
      movieId
    );

    const matchesPlatform =
      filters.platform === "all" ||
      !hasLoadedProvider ||
      matchesPlatformFilter(providersByMovieId[movieId], filters.platform);

    return matchesGenre && matchesPlatform;
  });

  return sortMovieList(filteredMovies, filters.sort);
};

const mapTmdbMovie = (movie) => ({
  id: movie.id,
  title: movie.title || movie.original_title || "Untitled",
  year: getMovieYear(movie.release_date),
  rating: getMovieRating(movie.vote_average),
  poster: movie.poster_url,
  backdrop: movie.backdrop_url,
  overview: getShortOverview(movie.overview),
  genre_ids: movie.genre_ids || [],
});

const uniqueById = (movies) => {
  const seen = new Set();

  return movies.filter((movie) => {
    if (!movie.id || seen.has(movie.id) || !movie.poster) {
      return false;
    }

    seen.add(movie.id);
    return true;
  });
};

function HomePage() {
  const navigate = useNavigate();
  const moodScrollerRef = useRef(null);

  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [hitMovies, setHitMovies] = useState([
    fallbackHeroMovie,
    ...fallbackMovies,
  ]);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [moodMovies, setMoodMovies] = useState(fallbackMovies);
  const [providersByMovieId, setProvidersByMovieId] = useState({});
  const [filterValues, setFilterValues] = useState(defaultFilterValues);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [moodLoading, setMoodLoading] = useState(true);
  const [moodError, setMoodError] = useState("");
  const [genreLookup, setGenreLookup] = useState(defaultGenreLookup);

  const filteredMoodMovies = applyMovieFilters(
    moodMovies,
    filterValues,
    providersByMovieId
  );

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/films/genres");

        if (!response.ok) {
          throw new Error("Gagal mengambil genre");
        }

        const json = await response.json();
        const genreList = json.data || json.genres || [];

        const genres = Object.fromEntries(
          genreList.map((genre) => [genre.id, genre.name])
        );

        setGenreLookup({
          ...defaultGenreLookup,
          ...genres,
        });
      } catch {
        setGenreLookup(defaultGenreLookup);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchHitMovies = async () => {
      try {
        const [nowPlayingResponse, trendingResponse] = await Promise.all([
          fetch("/api/tmdb/popular?page=1"),
          fetch("/api/tmdb/trending?timeWindow=week"),
        ]);

        if (!nowPlayingResponse.ok && !trendingResponse.ok) {
          throw new Error("Gagal mengambil film hits");
        }

        const nowPlayingJson = nowPlayingResponse.ok
          ? await nowPlayingResponse.json()
          : { data: { results: [] } };

        const trendingJson = trendingResponse.ok
          ? await trendingResponse.json()
          : { data: { results: [] } };

        const nowPlayingData = nowPlayingJson.data || { results: [] };
        const trendingData = trendingJson.data || { results: [] };

        const movies = uniqueById(
          [...(nowPlayingData.results || []), ...(trendingData.results || [])].map(
            mapTmdbMovie
          )
        ).slice(0, heroMovieLimit);

        if (movies.length > 0) {
          setHitMovies(movies);
          setActiveHeroIndex(0);
        }
      } catch {
        setHitMovies(
          [fallbackHeroMovie, ...fallbackMovies].slice(0, heroMovieLimit)
        );
      }
    };

    fetchHitMovies();
  }, []);

  useEffect(() => {
    if (hitMovies.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) => (currentIndex + 1) % hitMovies.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [hitMovies]);

  useEffect(() => {
    const fetchMoodMovies = async () => {
      try {
        setMoodLoading(true);
        setMoodError("");

        const response = await fetch(
          `/api/tmdb/discover?with_genres=${encodeURIComponent(
            selectedMood.genre
          )}&sort_by=popularity.desc&page=1`
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil rekomendasi mood");
        }

        const json = await response.json();
        const data = json.data || { results: [] };

        const movies = uniqueById((data.results || []).map(mapTmdbMovie)).slice(
          0,
          16
        );

        if (movies.length > 0) {
          setMoodMovies(movies);
          moodScrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
        }
      } catch {
        setMoodError(
          "Rekomendasi mood belum bisa dimuat, menampilkan data contoh."
        );
        setMoodMovies(fallbackMovies);
      } finally {
        setMoodLoading(false);
      }
    };

    fetchMoodMovies();
  }, [selectedMood]);

  useEffect(() => {
    const missingMovieIds = moodMovies
      .map((movie) => String(movie.id))
      .filter(
        (movieId) =>
          Number.isInteger(Number(movieId)) &&
          !Object.prototype.hasOwnProperty.call(providersByMovieId, movieId)
      );

    if (missingMovieIds.length === 0) {
      return undefined;
    }

    let shouldIgnore = false;

    const loadMovieProviders = async () => {
      const providerEntries = await Promise.all(
        missingMovieIds.map(async (movieId) => {
          try {
            const response = await fetch(
              `/api/tmdb/${movieId}/watch-providers`
            );

            if (!response.ok) {
              throw new Error("Gagal mengambil provider film");
            }

            const json = await response.json();
            return [movieId, json.data || { all: [] }];
          } catch {
            return [movieId, { all: [] }];
          }
        })
      );

      if (!shouldIgnore) {
        setProvidersByMovieId((currentProviders) => ({
          ...currentProviders,
          ...Object.fromEntries(providerEntries),
        }));
      }
    };

    loadMovieProviders();

    return () => {
      shouldIgnore = true;
    };
  }, [moodMovies, providersByMovieId]);

  const moveHero = (direction) => {
    setActiveHeroIndex((currentIndex) => {
      const totalMovies = hitMovies.length || 1;
      return (currentIndex + direction + totalMovies) % totalMovies;
    });
  };

  const heroMovies = hitMovies.slice(0, heroMovieLimit);
  const currentHeroMovie = heroMovies[activeHeroIndex] || fallbackHeroMovie;
  const heroBackdrop = currentHeroMovie.backdrop || fallbackHeroMovie.backdrop;

  const openMovieDetail = (movieId) => {
    if (Number.isInteger(Number(movieId))) {
      navigate(`/movie/${movieId}`);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#181818] text-white">
      <Navbar mode="absolute" activeKey="home" />

      <section className="relative min-h-[820px] bg-[#222] max-[720px]:min-h-0">
        <div
          className="absolute inset-0 bg-cover bg-[center_top] opacity-[0.78]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.48) 46%, rgba(0,0,0,0.78)),
              linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(25,25,25,0.42) 62%, rgba(34,34,34,0.92) 91%, #222 100%),
              url(${heroBackdrop})
            `,
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[190px] bg-gradient-to-b from-[#22222200] via-[#222222b8] to-[#222]" />

        <div className="relative z-[1] mx-auto grid min-h-[820px] max-w-[1238px] grid-cols-[minmax(0,1fr)_464px] items-start gap-16 px-[78px] pb-[70px] pt-[162px] max-[1080px]:grid-cols-1 max-[1080px]:px-7 max-[1080px]:pb-[72px] max-[1080px]:pt-[170px] max-[720px]:min-h-0 max-[720px]:gap-[42px] max-[720px]:px-[18px] max-[720px]:pb-[62px] max-[720px]:pt-44">
          <div>
            <div className="inline-flex h-[52px] items-center gap-6 rounded-[18px] border border-[#f20712] bg-black/30 px-12 text-2xl font-medium leading-none text-white max-[720px]:min-h-11 max-[720px]:px-[18px] max-[720px]:text-[15px]">
              <span className="h-0.5 w-7 bg-white max-[720px]:w-5" />
              WEBSITE REKOMENDASI FILM
            </div>

            <h1 className="my-8 text-[clamp(48px,6.1vw,76px)] font-bold leading-[1.25] text-white max-[720px]:text-[44px]">
              Temukan Film
              <br />
              yang <strong className="text-[#f20712]">Tepat</strong>
              <br />
              untuk Harimu
            </h1>

            <p className="w-full max-w-[560px] text-[22px] leading-[1.55] text-[#d0d0d0] max-[720px]:text-[17px]">
              Pilih suasana hatimu sekarang! FLIX akan merekomendasikan film
              &amp; series terbaik yang sesuai perasaanmu.
            </p>

            <div className="mt-[29px] flex items-center gap-6 max-[720px]:flex-col max-[720px]:items-stretch">
              <a
                href="#mood"
                className="inline-flex h-14 min-w-[180px] items-center justify-center gap-[13px] rounded-[17px] bg-[#f20712] text-xl font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff1f2a] hover:shadow-[0_12px_32px_rgba(242,7,18,0.34)] max-[720px]:w-full"
              >
                <FaPlay />
                Pilih Mood
              </a>

              <button
                type="button"
                onClick={() => navigate("/movies")}
                className="inline-flex h-14 min-w-[230px] cursor-pointer items-center justify-center rounded-[17px] border border-[#747474] bg-black/20 text-xl font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 max-[720px]:w-full"
              >
                Lihat Watchlist
              </button>
            </div>
          </div>

          <div className="w-[464px] max-[1080px]:mx-auto max-[1080px]:w-full max-[1080px]:max-w-[464px]">
            <article
              role="button"
              tabIndex={0}
              onClick={() => openMovieDetail(currentHeroMovie.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  openMovieDetail(currentHeroMovie.id);
                }
              }}
              className="group relative mt-[-9px] min-h-[568px] w-[464px] cursor-pointer overflow-hidden rounded-[20px] border border-[#f20712]/60 bg-[#080808] shadow-[0_22px_42px_rgba(242,7,18,0.22)] transition duration-200 hover:-translate-y-1 hover:border-[#f20712]/80 hover:shadow-[0_26px_48px_rgba(242,7,18,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f20712] max-[1080px]:w-full max-[720px]:min-h-0 max-[720px]:aspect-[0.84]"
            >
              <div className="absolute inset-0 bg-[#090909]">
                <img
                  src={currentHeroMovie.poster}
                  alt={currentHeroMovie.title}
                  className="block h-full w-full object-cover object-top"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[177px] bg-gradient-to-b from-[#14141400] via-[#141414e6] to-[#141414] max-[720px]:h-[154px]" />

              <div className="absolute bottom-24 left-[58px] z-[2] flex gap-2.5 max-[720px]:bottom-[88px] max-[720px]:left-6">
                <span className="inline-flex h-[23px] min-w-[61px] items-center justify-center gap-[5px] rounded-full bg-black px-[9px] text-lg leading-none text-white">
                  <FaStar className="text-[#ffd21f]" />
                  {currentHeroMovie.rating}
                </span>

                <span className="inline-flex h-[23px] min-w-[61px] items-center justify-center rounded-full bg-black px-[9px] text-lg leading-none text-white">
                  {currentHeroMovie.year}
                </span>
              </div>

              <h2 className="absolute bottom-[34px] left-7 right-7 z-[2] line-clamp-2 text-center text-[28px] font-medium leading-[1.18] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.88)] max-[720px]:bottom-7 max-[720px]:left-5 max-[720px]:right-5 max-[720px]:text-[22px]">
                {currentHeroMovie.title}
              </h2>
            </article>

            <div className="mt-[26px] flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => moveHero(-1)}
                aria-label="Film hits sebelumnya"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/30 bg-black/30 text-white transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-[#f20712]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f20712]"
              >
                <FaChevronLeft />
              </button>

              <div className="flex items-center gap-2 max-[720px]:hidden">
                {heroMovies.map((movie, index) => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => setActiveHeroIndex(index)}
                    aria-label={`Tampilkan ${movie.title}`}
                    className={`h-2 cursor-pointer rounded-full bg-white transition-all duration-200 hover:bg-[#f20712] ${activeHeroIndex === index ? "w-11" : "w-2"
                      }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => moveHero(1)}
                aria-label="Film hits berikutnya"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/30 bg-black/30 text-white transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-[#f20712]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f20712]"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="mood"
        className="relative mt-[-1px] bg-[#222] px-[78px] pb-9 pt-[54px] max-[720px]:px-[18px]"
      >
        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex h-8 min-w-[178px] items-center justify-center gap-3.5 rounded-2xl border border-[#f20712] bg-black/30 px-[22px] text-base font-medium leading-none text-white">
            <span className="h-0.5 w-[22px] bg-white" />
            PILIH MOOD
          </div>

          <h2 className="mb-3 mt-[17px] text-[38px] font-bold leading-[1.2] text-white max-[720px]:text-3xl">
            Bagaimana <strong className="text-[#f20712]">Mood Mu</strong> Hari Ini?
          </h2>

          <p className="text-xl leading-[1.45] text-[#c6c6c6] max-[720px]:text-[17px]">
            Pilih suasana hatimu - kami siapkan tontonan yang pas
          </p>
        </div>

        <div className="mx-auto mt-[60px] grid max-w-[1094px] grid-cols-6 gap-[25px] max-[1080px]:grid-cols-3 max-[720px]:mt-[38px] max-[720px]:grid-cols-2 max-[720px]:gap-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelectedMood(mood)}
              className={`flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border bg-[#080808] px-3.5 py-[22px] text-xl font-medium text-white transition duration-200 hover:-translate-y-1.5 hover:border-[#f20712] hover:bg-[#111] hover:shadow-[0_18px_38px_rgba(242,7,18,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f20712] max-[720px]:min-h-[142px] max-[720px]:text-base ${selectedMood.id === mood.id
                ? "border-[#f20712]"
                : "border-transparent"
                }`}
            >
              <span className="grid h-[62px] w-[62px] place-items-center rounded-full bg-[#252525]">
                <img
                  src={mood.icon}
                  alt=""
                  aria-hidden="true"
                  className="block h-[42px] w-[42px] object-contain"
                />
              </span>

              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section
        id="recommendations"
        className="relative bg-[#151515] px-[66px] pb-24 pt-[39px] max-[720px]:px-[18px]"
      >
        <div className="relative mx-auto mb-11 flex min-h-[42px] max-w-[1260px] items-start justify-center max-[720px]:pt-[52px]">
          <div className="relative inline-flex h-[34px] w-[min(500px,calc(100%-300px))] min-w-[436px] items-center justify-center rounded-full border border-[#505050] bg-black px-7 text-xl font-normal text-[#bdbdbd] max-[720px]:w-full max-[720px]:min-w-0 max-[720px]:px-[18px] max-[720px]:text-base">
            Rekomendasi Film Untuk Mood {selectedMood.label}
          </div>

          <div className="absolute right-0 top-0 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex h-[42px] min-w-[116px] items-center justify-center gap-3 rounded-full border border-[#f20712] bg-transparent px-[18px] text-xl font-normal text-[#bdbdbd] transition duration-200 hover:border-[#ff2b35] hover:bg-[#f20712]/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f20712]"
            >
              <FaSlidersH />
              Filter
            </button>
          </div>
        </div>

        {moodError && (
          <p className="mx-auto mb-5 mt-[-24px] max-w-[1270px] text-sm text-[#aaa]">
            {moodError}
          </p>
        )}

        {moodLoading && (
          <p className="mx-auto mb-5 mt-[-24px] max-w-[1270px] text-sm text-[#aaa]">
            Memuat rekomendasi mood...
          </p>
        )}

        {!moodLoading && filteredMoodMovies.length === 0 && (
          <p className="mx-auto mb-5 mt-[-24px] max-w-[1270px] text-sm text-[#aaa]">
            Tidak ada film yang cocok dengan filter ini.
          </p>
        )}

        <div
          ref={moodScrollerRef}
          className="mx-auto flex max-w-[1270px] snap-x gap-[26px] overflow-x-auto overflow-y-hidden scroll-smooth pb-[18px] [scrollbar-color:#f20712_#252525] [scrollbar-width:thin] max-[720px]:gap-[18px]"
        >
          {filteredMoodMovies.map((movie) => {
            const movieGenres = (movie.genre_ids || [])
              .map((genreId) => genreLookup[genreId])
              .filter(Boolean)
              .slice(0, 2);

            return (
              <article
                key={movie.id}
                role="button"
                tabIndex={0}
                onClick={() => openMovieDetail(movie.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    openMovieDetail(movie.id);
                  }
                }}
                className="group min-w-[232px] flex-[0_0_232px] snap-start cursor-pointer outline-none max-[1080px]:min-w-[220px] max-[1080px]:flex-[0_0_220px] max-[720px]:min-w-[168px] max-[720px]:flex-[0_0_168px]"
              >
                <div className="relative aspect-[0.76] overflow-hidden rounded-[14px] bg-[#2b2b2b] group-focus-visible:ring-2 group-focus-visible:ring-[#f20712]">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="block h-full w-full object-cover transition duration-200 group-hover:scale-105 group-hover:brightness-[0.58] group-focus-visible:scale-105 group-focus-visible:brightness-[0.58]"
                  />

                  <button
                    type="button"
                    aria-label={`Simpan ${movie.title}`}
                    onClick={(event) => event.stopPropagation()}
                    className="absolute right-3.5 top-4 z-[3] grid h-10 w-10 cursor-pointer place-items-center rounded-[11px] border border-white/50 bg-black/40 text-xl text-[#d9d9d9] transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-[#f20712]/80 hover:text-white"
                  >
                    <FaBookmark />
                  </button>

                  <div className="pointer-events-none absolute inset-0 z-[2] flex translate-y-3 flex-col justify-end gap-3 bg-gradient-to-b from-black/10 via-black/60 to-black/90 p-4 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <div className="flex flex-wrap gap-1.5 pr-[42px]">
                      {(movieGenres.length > 0 ? movieGenres : ["Film"]).map(
                        (genre) => (
                          <span
                            key={genre}
                            className="inline-flex min-h-[22px] max-w-full items-center rounded-full border border-white/20 bg-[#f20712]/70 px-[9px] text-xs leading-none text-white"
                          >
                            {genre}
                          </span>
                        )
                      )}
                    </div>

                    <p className="line-clamp-2 text-xs leading-[1.35] text-[#ededed]">
                      {getShortOverview(movie.overview)}
                    </p>
                  </div>
                </div>

                <h3 className="mb-1 mt-3 text-2xl font-medium leading-[1.15] text-white max-[720px]:text-xl">
                  {movie.title}
                </h3>

                <p className="flex items-center gap-[13px] text-lg font-normal text-[#d8d8d8]">
                  {movie.year}
                  <span className="inline-flex items-center gap-[5px]">
                    <FaStar className="text-[#ffd21f]" />
                    {movie.rating}
                  </span>
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <FilterPopup
        open={isFilterOpen}
        title="Filter Rekomendasi"
        values={filterValues}
        genreOptions={movieFilterGenreOptions}
        platformOptions={platformFilterOptions}
        sortOptions={movieSortOptions}
        onChange={setFilterValues}
        onClose={() => setIsFilterOpen(false)}
      />
    </main>
  );
}

export default HomePage;
