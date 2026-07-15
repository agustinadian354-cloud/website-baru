# Arsitektur — Cinematic AI Ads Director Portfolio

Dokumen ini adalah peta kerja: kenapa strukturnya seperti ini, komponen mana
yang dibangun duluan, bagaimana motion diimplementasikan secara efisien, dan
bagaimana pipeline aset lewat Higgsfield MCP.

Referensi arah: pengalaman immersive ala [noth.in](https://www.noth.in/), tetapi
dengan angle berbeda — bukan "studio 3D playground", melainkan **ruang grading
seorang director**: gelap, presisi, penuh readout kamera. Semua keputusan visual
diturunkan dari satu konsep itu, bukan dari tren.

---

## 1. Stack & alasannya

| Lapisan | Pilihan | Kenapa |
|---|---|---|
| Framework | React 19 + Vite + TypeScript | Iterasi cepat, type-safe, ekosistem motion terbaik |
| Styling | Tailwind CSS v4 (`@theme`) | Design tokens hidup di CSS, dipakai Tailwind & CSS biasa sekaligus |
| Motion UI | Framer Motion | Varian deklaratif, `whileInView`, spring fisik, exit animation |
| Smooth scroll | Lenis | Standar industri situs award-winning; ringan, satu instance global |
| 3D | three.js via @react-three/fiber | Scene 3D sebagai komponen React, ikut lifecycle & lazy-load |
| Routing | React Router 7 | Halaman detail karya (`/works/:slug`) dengan layout bersama |

Prinsip: **satu sumber kebenaran untuk token** (`src/index.css`), **satu sumber
kebenaran untuk konten** (`src/data/works.ts`). Komponen tidak menyimpan warna,
durasi, atau data proyek sendiri-sendiri.

---

## 2. Design system

### 2.1 Warna — "teal & orange" grading, bukan palet acak

Semua warna dideklarasikan di `src/index.css` dalam blok `@theme` sehingga
otomatis menjadi utility Tailwind (`bg-ink`, `text-film-dim`, dst.):

- `--color-ink` / `--color-ink-raised` — hampir-hitam ruang grading (base & kartu).
- `--color-film` / `--color-film-dim` — off-white film base untuk teks primer/sekunder.
- `--color-grade-teal(-bright)` — aksen shadow. `--color-grade-amber(-bright)` — aksen highlight.
- `--color-rec` — merah indikator REC, hanya untuk elemen HUD.

Aturan pakai: **amber = aksi/CTA, teal = sekunder/meta, rec = status**. Jangan
menambah warna baru; kalau butuh variasi, mainkan opacity token yang ada.

### 2.2 Tipografi — tiga suara, tiga peran

- `--font-display` (Bebas Neue): headline besar, judul karya — "title card" film.
- `--font-mono` (IBM Plex Mono): semua data — timecode, label scene, credits.
  Readout kamera selalu monospace; ini yang membuat HUD terasa otentik.
- `--font-body` (Archivo): body copy, sinopsis.

Hierarki dibangun dari **kontras skala ekstrem** (headline `13vw` vs mono `12px`),
bukan dari banyak ukuran menengah. Dua ujung skala yang jauh membuat halaman
terasa intentional; sepuluh ukuran mirip membuatnya terasa template.

### 2.3 Motion tokens

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);  /* default semua reveal */
--ease-shutter:  cubic-bezier(0.65, 0, 0.35, 1); /* letterbox / elemen mekanis */
--dur-micro: 150ms;   /* hover, focus */
--dur-base: 500ms;    /* reveal elemen */
--dur-reveal: 1100ms; /* momen sinematik (letterbox, headline) */
```

Satu kurva default untuk semuanya. Website terasa premium ketika **semua elemen
bergerak dengan "fisika" yang sama** — dan murahan ketika tiap komponen punya
easing sendiri.

---

## 3. Urutan build komponen (kalau membangun ulang / menambah halaman)

Urutan ini disengaja: tiap langkah adalah fondasi langkah berikutnya. Jangan
mulai dari hero — hero yang dibangun tanpa token akan di-refactor dua kali.

1. **`src/index.css` — design tokens.** Warna, font, motion token. Semua
   komponen setelah ini hanya mengonsumsi token.
2. **`Layout.tsx` + `useLenis.ts` + `.grain`.** Kerangka global: Nav, Footer,
   smooth scroll (satu instance di root, otomatis mati saat reduced-motion),
   overlay grain. Setelah ini setiap halaman baru otomatis terasa "sedunia".
3. **`LetterboxBars.tsx` — primitive motion pertama.** Reveal bar 2.39:1 dipakai
   di Hero dan WorkDetailPage; membangunnya sebagai komponen umum sejak awal
   mencegah duplikasi.
4. **`Hero.tsx` (tanpa 3D dulu).** Headline stagger, sub-copy, CTA, background
   still + gradient kontras. Hero harus sudah "jadi" secara komposisi sebelum
   partikel masuk — 3D adalah bumbu, bukan struktur.
5. **`HeroScene.tsx` + `HudOverlay.tsx`.** Partikel teal/amber + parallax kamera,
   dimuat `lazy()` agar tidak menghambat first paint; HUD timecode di atasnya.
6. **`WorksList.tsx` + `WorkItem.tsx` + `data/works.ts`.** Shot list dengan
   preview mengikuti cursor. Konten dipisah ke data file supaya menambah karya
   = menambah objek, bukan menyentuh komponen.
7. **`WorkDetailPage.tsx`.** Halaman kasus: kredit, sinopsis, reel, stills,
   "next scene". Memakai ulang LetterboxBars & token — tidak ada motion baru.
8. **`Studio.tsx` + `Footer.tsx`.** Narasi director, proses, spec sheet, kontak.
9. **Terakhir: polish pass.** Satu sesi khusus menyamakan durasi/easing/jarak
   viewport margin di semua section. Konsistensi inilah yang dirasakan user
   sebagai "premium".

---

## 4. Sistem motion — best practices yang dipakai

### 4.1 Tiga lapis motion, tiga alat

| Lapis | Alat | Contoh di sini |
|---|---|---|
| Scroll feel | Lenis (global, sekali) | `useLenis.ts` di Layout |
| Reveal & micro-interaction | Framer Motion | headline stagger, `whileInView`, preview cursor |
| Ambient / immersive | R3F `useFrame` | partikel + camera rig di `HeroScene` |

Jangan mencampur: scroll-reveal tidak dikerjakan di three.js, dan partikel tidak
dikerjakan dengan CSS. Tiap lapis punya alat yang paling murah untuknya.

### 4.2 Aturan performa (sudah diterapkan, pertahankan)

- **Hanya animasikan `transform` & `opacity`.** Tidak pernah `top/left/width` —
  itu memicu layout & paint, bukan compositing.
- **Lazy-load beban 3D.** `HeroScene` diimpor via `lazy()`; headline & CTA render
  instan bahkan sebelum three.js diunduh (chunk ±880 kB terpisah dari bundle utama).
- **`dpr={[1, 1.75]}`** membatasi resolusi render canvas di layar retina.
- **Lerp untuk pointer-follow, bukan nilai mentah.** CameraRig me-lerp 3% per
  frame; preview cursor memakai `useSpring`. Lag kecil ini = kesan "berat
  kamera dolly" — motion terasa natural justru karena tidak instan.
- **`whileInView` + `viewport={{ once: true }}`** untuk reveal — observer lepas
  setelah tampil, tidak ada scroll listener yang menumpuk.
- **`prefers-reduced-motion`**: Lenis tidak dipasang, dan CSS mematikan semua
  animasi. Ini non-negotiable untuk aksesibilitas.

### 4.3 Koreografi

- **Stagger, jangan serentak.** Headline masuk baris per baris (0.12s antar
  baris) dengan mask `overflow-hidden` — pola "line reveal" khas situs high-end.
- **Delay bercerita.** Letterbox terbuka → headline → sub-copy (1.1s) → CTA
  (1.3s). Urutan reveal = urutan membaca = hierarki.
- **Satu momen mahal per halaman.** Hero mendapat 1100ms sinematik; sisanya
  cukup 500–700ms. Kalau semuanya dramatis, tidak ada yang dramatis.

---

## 5. Pipeline aset via Higgsfield MCP

Semua visual (hero still, thumbnail karya, stills galeri, reel) digenerate lewat
MCP Higgsfield, lalu URL CDN-nya dimasukkan ke `src/data/media.ts` dan
`src/data/works.ts`.

Alur per aset:

1. **Generate** — `generate_image` untuk still/thumbnail (minta gaya:
   *"cinematic commercial film still, teal and orange grade, anamorphic,
   2.39:1"* agar konsisten dengan design system), `generate_video` untuk reel.
   Gunakan `models_explore(action:'recommend')` bila ragu model mana.
2. **Refine** — `upscale_image`/`upscale_video` untuk resolusi final;
   `reframe` bila butuh rasio lain (mis. still 2.39:1 → thumbnail 16:9);
   `outpaint_image` untuk memperluas komposisi hero.
3. **Pakai** — hasil generate punya URL CDN persisten; tempel langsung di data
   file, atau unduh ke `public/works/<slug>/` untuk kontrol penuh (path lokal
   sudah menjadi konvensi di `works.ts`).

Aturan: aspek rasio aset mengikuti frame sinematik (2.39:1 untuk hero/stills,
16:9 untuk reel), dan prompt selalu menyebut grade teal/amber — supaya aset
dan UI tampak digrading di ruang yang sama.

> Catatan: Higgsfield juga punya `create_website` (hosting full-stack sendiri).
> Repo ini sengaja standalone (Vite statis, deploy bebas: Cloudflare/Netlify/
> Vercel — `public/_redirects` sudah ada untuk SPA fallback). MCP dipakai untuk
> **produksi aset**, bukan hosting.

---

## 6. Menambahkan karya baru

1. Generate thumbnail + stills + reel (bagian 5).
2. Tambah satu objek `Work` di `src/data/works.ts` — slug, scene number,
   sinopsis 2–3 kalimat, credits, path media.
3. Selesai. Shot list, halaman detail, dan navigasi "next scene" otomatis.
