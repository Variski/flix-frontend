import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [genres, setGenres] = useState({ genres: [], moods: [] });

  // 🔥 Dummy API Simulation (Genres)
  useEffect(() => {
    const dummyData = {
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Comedy" },
        { id: 3, name: "Drama" },
        { id: 4, name: "Horror" },
        { id: 5, name: "Romance" },
        { id: 6, name: "Sci-Fi" },
      ],
      moods: [
        { id: 101, name: "Feel Good 😊" },
        { id: 102, name: "Chill 😌" },
        { id: 103, name: "Exciting 🔥" },
        { id: 104, name: "Dark 🌑" },
      ],
    };

    setTimeout(() => {
      setGenres(dummyData);
    }, 300);
  }, []);

  return (
    <nav className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="px-4 h-16 flex items-center justify-between mr-5 ml-5">
        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="#">
            Flix<span className="text-red-500">.</span>
          </a>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex gap-6 text-md absolute left-1/2 -translate-x-1/2 font-semibold">
          <a href="#" className="hover:text-red-500">
            Home
          </a>

          <a href="#" className="hover:text-red-500">
            Movies
          </a>

          <a href="#" className="hover:text-red-500">
            TV Series
          </a>

          {/* 🔥 GENRES DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:text-red-500">Genres</button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[420px] p-4 rounded-xl shadow-xl bg-white">
              {/* GENRES */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Browse by Genre
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {genres.genres.length === 0 ? (
                    <p className="text-sm text-gray-400 col-span-3">
                      Loading...
                    </p>
                  ) : (
                    genres.genres.map((genre) => (
                      <div
                        key={genre.id}
                        className="cursor-pointer px-2 py-1 rounded-md hover:bg-red-100 hover:text-red-500 transition text-sm"
                        onClick={() => console.log("Genre:", genre.name)}
                      >
                        {genre.name}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* MOODS */}
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Browse by Mood
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {genres.moods.length === 0 ? (
                    <p className="text-sm text-gray-400 col-span-2">
                      Loading...
                    </p>
                  ) : (
                    genres.moods.map((mood) => (
                      <div
                        key={mood.id}
                        className="cursor-pointer px-2 py-1 rounded-md hover:bg-red-100 hover:text-red-500 transition text-sm"
                        onClick={() => console.log("Mood:", mood.name)}
                      >
                        {mood.name}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="#" className="hover:text-red-500">
            Community
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* 🔥 SEARCH DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-100 hover:text-red-500"
              >
                <Search className="w-5 h-5" />
              </Button>
            </DialogTrigger>

            {/* [&>button]:hidden = menyembunyikan tombol X default Shadcn */}
            <DialogContent className="max-w-2xl [&>button]:hidden">
              <SearchPopup />
            </DialogContent>
          </Dialog>

          {/* ACTION DESKTOP */}
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" className="hover:text-red-500">
              Login
            </Button>

            <Button className="bg-red-500 text-white hover:bg-red-600">
              Sign Up
            </Button>
          </div>

          {/* BURGER MENU */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-t bg-white">
          <a href="#" className="hover:text-red-500">
            Home
          </a>

          <a href="#" className="hover:text-red-500">
            Movies
          </a>

          <a href="#" className="hover:text-red-500">
            TV Series
          </a>

          <a href="#" className="hover:text-red-500">
            Genres
          </a>

          <a href="#" className="hover:text-red-500">
            Community
          </a>

          <div className="flex gap-2 pt-2">
            <Button variant="ghost" className="w-full hover:text-red-500">
              Login
            </Button>

            <Button className="w-full bg-red-500 text-white hover:bg-red-600">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* 🔍 SEARCH POPUP COMPONENT */
function SearchPopup() {
  const [query, setQuery] = useState("");

  const dummyMovies = [
    { id: 1, title: "Avengers: Endgame", genre: "Action" },
    { id: 2, title: "The Conjuring", genre: "Horror" },
    { id: 3, title: "Interstellar", genre: "Sci-Fi" },
    { id: 4, title: "La La Land", genre: "Romance" },
    { id: 5, title: "The Hangover", genre: "Comedy" },
  ];

  const filteredMovies = dummyMovies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* SEARCH BAR + CUSTOM CLOSE BUTTON */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <Input
            autoFocus
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-4"
          />
        </div>

        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0 hover:bg-red-100 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </div>

      {/* SEARCH RESULT */}
      <div className="max-h-[300px] overflow-y-auto flex flex-col gap-2">
        {filteredMovies.length === 0 ? (
          <p className="text-gray-400 text-sm">No results found</p>
        ) : (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="p-2 rounded-md hover:bg-red-100 cursor-pointer transition"
            >
              <p className="font-medium">{movie.title}</p>
              <p className="text-xs text-gray-500">{movie.genre}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
