export default function FilterPopup({
  open,
  title = "Filter",
  values,
  genreOptions = [],
  platformOptions = [],
  sortOptions = [],
  onChange,
  onClose,
}) {
  if (!open) return null;

  const handleChange = (key, value) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141414] p-6 text-white shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-white/70 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/70">Genre</label>
            <select
              value={values.genre}
              onChange={(event) => handleChange("genre", event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#232323] px-4 py-3 text-white outline-none focus:border-[#f20712]"
            >
              {genreOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Platform</label>
            <select
              value={values.platform}
              onChange={(event) => handleChange("platform", event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#232323] px-4 py-3 text-white outline-none focus:border-[#f20712]"
            >
              {platformOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Urutkan</label>
            <select
              value={values.sort}
              onChange={(event) => handleChange("sort", event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#232323] px-4 py-3 text-white outline-none focus:border-[#f20712]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              onChange({
                genre: "all",
                platform: "all",
                sort: "latest",
              })
            }
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#f20712] px-5 py-2 text-sm font-medium text-white hover:bg-[#ff1f2a]"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}