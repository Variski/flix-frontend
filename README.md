# FLIX Frontend

**FLIX Frontend** adalah bagian antarmuka pengguna dari aplikasi **FLIX**, sebuah platform rekomendasi film berbasis mood yang dilengkapi fitur komunitas dan diskusi film. Frontend ini dibangun menggunakan React, Vite, Tailwind CSS, dan shadcn/ui untuk menghasilkan pengalaman pengguna yang cepat, responsif, dan modern.

---

## 📌 Tentang Project

FLIX dirancang untuk membantu pengguna menemukan film berdasarkan suasana hati atau preferensi tertentu. Selain fitur rekomendasi film, aplikasi ini juga menyediakan ruang komunitas agar pengguna dapat berdiskusi, membagikan opini, membuat thread, dan menyusun watchlist secara kolaboratif.

Repositori ini berfokus pada sisi **frontend** aplikasi, sedangkan backend dikelola pada repositori terpisah.

---

## 🛠️ Tech Stack

Teknologi utama yang digunakan pada project ini:

| Kategori | Teknologi |
|---|---|
| Framework | [React](https://react.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Routing | React Router *(akan/opsional digunakan)* |

---

## 🚀 Cara Instalasi dan Menjalankan Project

### 1. Prasyarat

Pastikan perangkat sudah menginstal:

- **Node.js** versi 18 atau lebih baru
- **npm** sebagai package manager
- **Git** untuk clone repository

### 2. Clone Repository

```bash
git clone <url-repository>
```

### 3. Masuk ke Folder Project

```bash
cd final_project\(frontend\)/frontend
```

> Catatan: Sesuaikan path folder jika struktur project di perangkat kamu berbeda.

### 4. Install Dependencies

```bash
npm install
```

### 5. Jalankan Development Server

```bash
npm run dev
```

### 6. Buka Project di Browser

Akses project melalui:

```text
http://localhost:5173/
```

---

## 🧩 Arsitektur Project

Project ini menggunakan pendekatan **feature-based structure**, yaitu pengelompokan folder berdasarkan domain atau fitur aplikasi. Struktur ini dibuat agar project lebih rapi, mudah dikembangkan, dan memudahkan kerja tim.

```text
frontend/src/
├── assets/                 # Gambar, logo, icon, dan aset statis lainnya
├── lib/                    # Utility global dan helper function
│   └── utils.js            # Helper utility, misalnya cn() untuk shadcn/ui
├── components/             # Kumpulan komponen React
│   ├── ui/                 # Komponen UI reusable dari shadcn/ui
│   ├── layout/             # Komponen layout seperti Navbar dan Footer
│   ├── auth/               # Komponen login dan register
│   ├── cinethreads/        # Komponen fitur komunitas atau thread
│   ├── discussions/        # Komponen forum diskusi film
│   ├── films/              # Komponen movie, card, filter, rating, dan hero
│   ├── messages/           # Komponen direct message atau chat
│   ├── notifications/      # Komponen notifikasi
│   ├── users/              # Komponen profil pengguna
│   └── watchlists/         # Komponen watchlist
├── pages/                  # Halaman utama aplikasi
│   ├── auth/               # LoginPage.jsx dan RegisterPage.jsx
│   ├── cinethreads/        # CommunityPage.jsx
│   ├── discussions/        # DiscussionListPage.jsx dan DiscussionDetailPage.jsx
│   ├── films/              # MovieListPage.jsx, MovieDetailPage.jsx, GenrePage.jsx
│   ├── home/               # HomePage.jsx
│   ├── search/             # SearchPage.jsx
│   ├── messages/           # MessengerPage.jsx
│   ├── notifications/      # NotificationPage.jsx
│   ├── users/              # ProfilePage.jsx dan EditProfilePage.jsx
│   └── watchlists/         # WatchlistPage.jsx
├── index.css               # CSS global dan konfigurasi Tailwind
├── App.jsx                 # Root component dan routing utama
└── main.jsx                # Entry point React
```

---

## 📁 Penjelasan Folder Penting

### `components/ui`

Berisi komponen dasar yang bersifat reusable dan berasal dari shadcn/ui, seperti:

- Button
- Input
- Card
- Dialog
- Dropdown
- Form

Folder ini **tidak digunakan** untuk komponen spesifik fitur seperti `MovieCard`, `ProfileHeader`, atau `WatchlistCard`.

### `components/films`

Berisi komponen yang berhubungan dengan film, misalnya:

- `MovieCard.jsx`
- `FilmHero.jsx`
- `RatingStars.jsx`
- `FilterBar.jsx`

### `pages`

Berisi halaman utama yang akan dihubungkan dengan routing. Contohnya:

- `HomePage.jsx`
- `MovieListPage.jsx`
- `MovieDetailPage.jsx`
- `ProfilePage.jsx`
- `SearchPage.jsx`

---

## 🧱 Konvensi Penulisan Kode

Agar project tetap rapi dan konsisten, gunakan aturan berikut:

### 1. Penamaan File dan Komponen

Gunakan `PascalCase` untuk file komponen React.

```text
MovieCard.jsx
ProfileHeader.jsx
WatchlistCard.jsx
```

Gunakan `kebab-case` untuk folder jika diperlukan.

```text
movie-detail/
watchlist-item/
```

### 2. Penggunaan Import

Disarankan menggunakan absolute import dengan alias `@/`.

```jsx
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/films/MovieCard";
```

Hindari penggunaan relative import yang terlalu panjang.

```jsx
import MovieCard from "../../../components/films/MovieCard";
```

### 3. Pemisahan Komponen

Komponen yang digunakan secara umum ditempatkan di:

```text
src/components/ui/
```

Komponen yang spesifik pada fitur tertentu ditempatkan sesuai domainnya.

```text
src/components/films/
src/components/users/
src/components/watchlists/
```

---

## 👨‍💻 Menambahkan Komponen shadcn/ui

Untuk menambahkan komponen baru dari shadcn/ui, jalankan perintah berikut di folder frontend:

```bash
npx shadcn@latest add <nama-komponen>
```

Contoh:

```bash
npx shadcn@latest add input
npx shadcn@latest add button
npx shadcn@latest add dialog
```

---

## 🔄 Workflow Pengembangan Fitur

Jika bekerja secara fullstack bersama backend, alur pengembangan fitur yang disarankan adalah:

1. **Update Backend**
   - Tambahkan atau sesuaikan schema database.
   - Buat service, controller, dan route.
   - Perbarui dokumentasi API jika menggunakan Swagger.

2. **Test Endpoint**
   - Jalankan backend.
   - Cek endpoint melalui Swagger atau Postman.
   - Pastikan format request dan response sudah sesuai.

3. **Integrasi Frontend**
   - Tentukan domain fitur.
   - Buat komponen di folder `src/components/`.
   - Buat atau update halaman di folder `src/pages/`.
   - Hubungkan halaman dengan routing di `App.jsx`.
   - Integrasikan data dari API backend.

---

## 🧪 Script yang Tersedia

Beberapa script yang umum digunakan:

```bash
npm run dev
```

Menjalankan project dalam mode development.

```bash
npm run build
```

Melakukan build project untuk production.

```bash
npm run preview
```

Menjalankan hasil build secara lokal.

---

## 🧑‍🤝‍🧑 Panduan untuk Anggota Tim

Jika anggota tim baru ingin menjalankan project ini:

1. Clone repository.
2. Masuk ke folder frontend.
3. Jalankan `npm install`.
4. Jalankan `npm run dev`.
5. Buka `http://localhost:5173/`.
6. Buat branch baru sebelum mengerjakan fitur.
7. Commit perubahan dengan pesan yang jelas.
8. Push branch dan buat pull request jika diperlukan.

Contoh membuat branch baru:

```bash
git checkout -b feature/movie-list-page
```

Contoh commit:

```bash
git add .
git commit -m "feat: add movie list page"
git push origin feature/movie-list-page
```

---

## 📌 Catatan Pengembangan

- Pastikan struktur folder tetap mengikuti domain fitur.
- Jangan menaruh komponen spesifik fitur di folder `components/ui`.
- Gunakan komponen shadcn/ui untuk menjaga konsistensi tampilan.
- Pastikan setiap halaman yang dibuat sudah terhubung dengan routing.
- Gunakan nama file dan komponen yang jelas agar mudah dipahami anggota tim lain.

---

## 📄 Lisensi

Project ini dibuat untuk kebutuhan pembelajaran dan pengembangan final project FLIX.
n