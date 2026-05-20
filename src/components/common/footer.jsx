export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6">
        {/* Brand */}
        <div>
          <h1 className="text-lg font-bold">
            Flix<span className="text-red-500">.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Your simple movie recommendation platform
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-10 text-sm text-gray-600">
          <div className="space-y-2">
            <p className="font-medium text-black">Explore</p>
            <a href="/">
              Movies <br />
            </a>
            <a href="/">
              Tv Series
              <br />
            </a>
            <a href="/">
              Genres
              <br />
            </a>
            <a href="/">
              Community
              <br />
            </a>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-black">Company</p>
            <a href="/">
              About <br />{" "}
            </a>
            <a href="/">
              Contact <br />{" "}
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-4 border-t">
        © {new Date().getFullYear()} Flix. All rights reserved.
      </div>
    </footer>
  );
}
