# FLIX Frontend

Proyek ini adalah bagian frontend dari aplikasi **FLIX** (movie recommendation & social discussion hub). Proyek ini dibangun menggunakan modern toolchain fast-refresh dan styling library berbasis komponen.

## 🛠️ Tech Stack

Berikut adalah teknologi utama yang digunakan di sisi frontend:

- **Framework**: [React](https://react.dev/) (dengan JSX/JS)
- **Build Tool**: [Vite](https://vitejs.dev/) - untuk environment development yang super cepat dan build tool yang efisien.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Koleksi komponen UI siap pakai.
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Routing**: *[Akan ditambahkan misal: React Router]*

---

## 🚀 Cara Instalasi & Menjalankan Project

### Prasyarat:
Pastikan kamu telah menginstal:
- **Node.js** (versi 18+ direkomendasikan)
- **npm** (Node Package Manager)

### Langkah-langkah:

1. **Clone repositori** (jika belum):
   ```bash
   git clone <url-repo-kalian>
   ```

2. **Masuk ke folder frontend**:
   Pastikan kamu berada di dalam direktori frontend.
   ```bash
   cd final_project(frontend)/frontend
   ```

3. **Install dependensi (Package)**:
   ```bash
   npm install
   ```

4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```

5. **Buka di Browser**:
   Buka browser kamu dan akses alamat: **[http://localhost:5173/](http://localhost:5173/)**

---

## 🧩 Arsitektur & Struktur Folder (Feature-Sliced)

Frontend ini menggunakan arsitektur **Feature-Slicing** yang disejajarkan (*aligned*) dengan domain pada Backend (Node.js/Express) di repositori sebelah (`final_project/`). Folder `components` dan `pages` dipecah menjadi fitur spesifik agar lebih rapi.

### Struktur Direktori:


frontend/src/
├── assets/           # Gambar, logo, icon, dan aset statis lainnya
├── lib/              # Utility global (contoh: setup axios client, helper formatting)
│   └── utils.js      # Helper utility (misalnya `cn` function wajib untuk shadcn)
├── components/       # Komponen UI React (Dikelompokkan per domain backend)
│   ├── ui/           # Komponen UI Reusable (shadcn/ui: Button, Input, Card, dll)
│   ├── layout/       # Komponen kerangka dasar (Navbar, Footer)
│   ├── auth/         # Komponen form login/register
│   ├── cinethreads/  # Komponen feed sosial (PostComposer, CineThreadCard)
│   ├── discussions/  # Komponen forum diskusi per film
│   ├── films/        # Komponen movie (MovieCard, FilmHero, RatingStars, FilterBar)
│   ├── messages/     # Komponen Direct Message/Chat
│   ├── notifications/# Komponen item notifikasi
│   ├── users/        # Komponen spesifik profil (AvatarPicker, ProfileHeader)
│   └── watchlists/   # Komponen daftar tonton (WatchlistCard, WatchlistItem)
├── pages/            # Halaman utama aplikasi (Routed Pages)
│   ├── auth/         # LoginPage.jsx, RegisterPage.jsx
│   ├── cinethreads/  # CommunityPage.jsx (Feed utama)
│   ├── discussions/  # DiscussionListPage.jsx, DiscussionDetailPage.jsx
│   ├── films/        # MovieListPage.jsx, MovieDetailPage.jsx, GenrePage.jsx
│   ├── home/         # HomePage.jsx (Landing page)
│   ├── search/       # SearchPage.jsx
│   ├── messages/     # MessengerPage.jsx
│   ├── notifications/# NotificationPage.jsx
│   ├── users/        # ProfilePage.jsx, EditProfilePage.jsx
│   └── watchlists/   # WatchlistPage.jsx
├── index.css         # CSS global (Konfigurasi Tailwind v4 & tema shadcn)
├── App.jsx           # Entry Component & (TODO: React Router Setup)
└── main.jsx          # Titik mount React ke HTML

### Konvensi dan Aturan Tim (Frontend)
1. **Komponen Reusable (ui/)**: Komponen spesifik fitur (seperti `MovieCard`) **jangan** ditaruh di dalam `/components/ui/`. Folder `ui/` hanya untuk *building block* generik seperti Button, Input, dll.
2. **Absolute Imports**: Selalu gunakan absolute import `@/` (contoh: `import Button from "@/components/ui/button"`) daripada *relative import* (`../../components/ui/button`).
3. **Penamaan**: 
   - `PascalCase` untuk komponen dan file `.jsx` (contoh: `MovieCard.jsx`).
   - *kebab-case* untuk nama folder dan utilitas `.js` (kecuali domain-driven).

---

## 👨‍💻 Menambahkan Komponen UI Baru (shadcn/ui)

Jika kamu ingin menambahkan komponen baru dari shadcn, cukup gunakan CLI di terminal (pastikan berada di folder `frontend`):
```bash
npx shadcn@latest add <nama-komponen>
```
Contoh: `npx shadcn@latest add input`

---

## 🚀 Workflow Mengembangkan Fitur Baru

Jika kamu dan tim bekerja secara fullstack:
1. **Backend**: Update schema database (Prisma), buat Service, Controller, dan daftarkan Route-nya. Jangan lupa perbarui file `swagger.js` agar endpoint baru terlihat.
2. **Test Endpoint**: Cek dokumentasi API (`http://localhost:3000/api/docs`) untuk melihat struktur JSON *Request* dan *Response*-nya.
3. **Frontend**:
   - Tentukan domain fitur tersebut (misal: masuk ke domain `films`).
   - Buat file `.jsx` di `src/components/films/`.
   - Pasang (rakit) komponen tersebut ke halaman yang berada di `src/pages/films/`.
   - Update rute navigasi di `App.jsx` jika itu adalah halaman baru.
