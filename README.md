# FLIX Frontend

Proyek ini adalah bagian frontend dari aplikasi **FLIX** (movie recommendation & social discussion hub). Proyek ini dibangun menggunakan modern toolchain fast-refresh dan styling library berbasis komponen.

## 🛠️ Tech Stack

Berikut adalah teknologi utama yang digunakan di sisi frontend:

- **Framework**: [React](https://react.dev/) (dengan JSX/JS)
- **Build Tool**: [Vite](https://vitejs.dev/) - untuk environment development yang super cepat dan build tool yang efisien.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework (diintegrasikan secara natif dengan Vite plugin).
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Koleksi komponen UI siap pakai yang dibangun di atas Radix UI dan Tailwind CSS.
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Routing**: *[Akan ditambahkan misal: React Router]*

## 🚀 Cara Instalasi & Menjalankan Project

Ikuti langkah-langkah di bawah ini untuk menjalankan project frontend ini di komputer lokal kamu.

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
   Pastikan kamu berada di dalam direktori `frontend`.
   ```bash
   cd final_project/frontend
   ```

3. **Install dependensi (Package)**:
   Jalankan perintah berikut untuk menginstal semua library yang dibutuhkan (React, Tailwind, komponen shadcn, dll).
   ```bash
   npm install
   ```

4. **Jalankan Development Server**:
   Setelah instalasi selesai, jalankan server lokal Vite.
   ```bash
   npm run dev
   ```

5. **Buka di Browser**:
   Buka browser kamu dan akses alamat berikut:
   **[http://localhost:5173/](http://localhost:5173/)**

## 🧩 Struktur Folder Utama

- `src/components/ui/` - Berisi berbagai komponen shadcn/ui (misal: button, card, dll) yang bisa digunakan ulang (*reusable*).
- `src/lib/utils.js` - Helper utility (misalnya `cn` function wajib untuk shadcn).
- `src/index.css` - File CSS global tempat konfigurasi Tailwind v4 dan variabel tema shadcn didefinisikan secara dinamis (`@theme`).

## 👨‍💻 Menambahkan Komponen UI Baru (shadcn/ui)

Jika kamu ingin menambahkan komponen baru dari shadcn, cukup gunakan CLI di terminal (pastikan berada di folder `frontend`):
```bash
npx shadcn@latest add <nama-komponen>
```
Contoh: `npx shadcn@latest add input`
