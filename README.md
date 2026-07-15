# Ads by Dian — cinematic AI ads director portfolio

Stack: React + TypeScript + Vite, Tailwind CSS v4, Framer Motion, Three.js
(via @react-three/fiber), React Router, Lenis untuk smooth scroll.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Struktur

```
src/
  index.css              -> design tokens (warna, font, motion) via Tailwind v4 @theme
  App.tsx                -> router utama (React Router)
  pages/
    HomePage.tsx           -> Hero + WorksList + Studio, scroll ke hash (#works, #studio)
    WorkDetailPage.tsx      -> halaman /works/:slug — kredit, sinopsis, reel, galeri, next scene
  lib/
    useLenis.ts             -> smooth scroll global (nonaktif otomatis jika reduced-motion)
    useTimecode.ts          -> timecode HUD berjalan (HH:MM:SS:FF)
    useScrollToHash.ts      -> scroll ke section setelah pindah halaman lewat Nav
  components/
    layout/Layout.tsx, Nav.tsx, Footer.tsx  -> Layout dipakai di semua route (Nav+Footer+grain+Lenis)
    common/LetterboxBars.tsx -> bar letterbox reveal, dipakai di Hero & WorkDetailPage
    hero/Hero.tsx            -> letterbox reveal + headline stagger
    hero/HeroScene.tsx       -> canvas Three.js, medan partikel teal/amber + parallax kamera
    hero/HudOverlay.tsx      -> readout REC, timecode, metadata generasi AI
    studio/Studio.tsx        -> narasi director, proses produksi, spec sheet kapabilitas
    works/WorksList.tsx      -> shot list dengan preview gambar mengikuti cursor
    works/WorkItem.tsx
  data/works.ts             -> GANTI dengan daftar proyek nyata Anda (termasuk slug, credits, stills)
```

## Konsep desain

Dibangun dari identitas "cinematic AI ads director" — bukan template studio kreatif
generik. Bahasa visualnya dipinjam dari monitor on-set dan proses color grading:

- **Warna**: dasar hampir-hitam (`--color-ink`) meniru ruang grading, dengan aksen
  teal (shadow) & amber (highlight) — merujuk ke color grading "teal & orange"
  yang jadi standar sinema komersial, bukan aksen warna acak.
- **Tipografi**: `Bebas Neue` untuk headline (kartu judul film), `IBM Plex Mono`
  untuk semua data HUD/timecode/metadata (readout kamera selalu monospace),
  `Archivo` untuk body copy.
- **Struktur**: penomoran "SC.01, SC.02..." pada daftar karya bukan dekorasi —
  karya memang disusun sebagai shot list/reel dengan urutan yang berarti.
- **Motion signature**: letterbox bar yang membuka seperti shutter kamera saat
  halaman dimuat, timecode yang benar-benar berjalan real-time, dan preview
  gambar karya yang mengikuti cursor dengan sedikit "lag" (spring physics) —
  meniru bobot dolly kamera, bukan snap instan.

## Yang perlu Anda isi

1. **`src/data/works.ts`** — ganti dengan proyek nyata Anda (judul, klien, tahun, link).
2. **Thumbnail** — taruh gambar/video preview di `public/works/` lalu update path
   `thumbnail` di `works.ts`. Saat ini pakai warna fallback polos.
3. **Kontak** — ganti email & link sosial di `Footer.tsx`.
4. **Reel utama** — `HeroScene.tsx` saat ini pakai medan partikel abstrak. Kalau
   Anda punya showreel video, bisa diganti/ditambah sebagai video texture di
   plane Three.js, atau video HTML biasa di belakang partikel.

## Catatan performa

Bundle Three.js membuat chunk JS cukup besar (~1.2MB sebelum gzip). Untuk
produksi, pertimbangkan lazy-load `HeroScene` dengan `React.lazy` + `Suspense`
supaya konten teks hero tetap render instan sementara canvas dimuat belakangan.
