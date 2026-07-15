export type Work = {
  slug: string; // dipakai di URL /works/:slug
  scene: string; // nomor scene, mis. "SC.01"
  title: string;
  client: string;
  role: string; // mis. "Director / AI Generation"
  year: string;
  thumbnail: string; // preview di daftar karya
  synopsis: string; // 2–3 kalimat tentang brief & pendekatan
  credits: { label: string; value: string }[];
  video?: string; // reel utama di halaman detail
  stills: string[]; // galeri frame/still
};

// GANTI dengan daftar proyek nyata Anda. Urutan di sini = urutan tampil & urutan "next scene".
export const works: Work[] = [
  {
    slug: "aether-nowhere-every-season",
    scene: "SC.01",
    title: "Nowhere, Every Season",
    client: "Aether Watches",
    role: "Director / AI Generation",
    year: "2026",
    // Aset digenerate via Higgsfield MCP (model soul_cinematic, grade teal/amber).
    // URL CDN persisten; kalau ingin self-host, unduh ke /public/works/aether/.
    thumbnail:
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_233321_909176b6-3e91-40c1-83ca-beb377812802_min.webp",
    synopsis:
      "A watch that doesn't age with the season, so the film shouldn't either. We generated four climates inside one continuous take, cutting on movement instead of edits — treating the diffusion model like a crew that never breaks for weather.",
    credits: [
      { label: "Director", value: "You" },
      { label: "Prompt design", value: "You" },
      { label: "Model", value: "Custom LoRA + video diffusion" },
      { label: "Grade", value: "Teal / amber, hand-tuned" },
      { label: "Runtime", value: "0:32" },
    ],
    // reel utama menyusul (generate_video); halaman detail aman tanpa video
    stills: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_233324_2bb86fb0-5a16-4bbf-aea0-53fa363e9b71_min.webp",
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_233327_f8e6d5a9-689b-4999-b0aa-674c359f6cba_min.webp",
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_233329_dbbd3c6e-a2cb-4e6a-acee-66c525ac6023_min.webp",
    ],
  },
  {
    slug: "arunika-the-last-pour",
    scene: "SC.02",
    title: "The Last Pour",
    client: "Arunika Kopi — Jakarta",
    role: "Director / Prompt Design",
    year: "2025",
    // Aset digenerate via Higgsfield MCP (model soul_cinematic, grade teal/amber).
    thumbnail:
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_233835_59e01e8d-5954-4de0-bd9c-c0c960da8c03_min.webp",
    synopsis:
      "An es kopi susu gula aren ad shot like a heist film — the reveal is one continuous pour of palm sugar syrup, tracked from a Javanese sugar workshop to a late-night warung kopi. Storyboarded frame-by-frame, then generated shot-for-shot to match the animatic's timing.",
    credits: [
      { label: "Director", value: "You" },
      { label: "Prompt design", value: "You" },
      { label: "Model", value: "Video diffusion" },
      { label: "Sound design", value: "Collaborator" },
      { label: "Runtime", value: "0:03 loop" },
    ],
    // loop cinemagraph via Higgsfield MCP (kling3_0_turbo, image-to-video dari thumbnail)
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260715_005734_c29371d0-4723-43dc-899f-2b8c7332bae8.mp4",
    stills: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_233837_ee78e3b5-2a50-4e4a-8e60-4892b97390c4_min.webp",
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_233840_b478411f-4468-42a5-9204-1ba5ad982c47_min.webp",
    ],
  },
  {
    slug: "kirana-skin-you-trust",
    scene: "SC.03",
    title: "Skin You Trust",
    client: "Kirana Botanics — Yogyakarta",
    role: "Director / Post",
    year: "2025",
    // Aset digenerate via Higgsfield MCP (model soul_cinematic, grade teal/amber).
    thumbnail:
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_235223_81071719-4d31-4435-8dd5-e9274c29c453_min.webp",
    synopsis:
      "A jamu-heritage serum built on temulawak, jasmine, and rice — so the film goes closer than any practical lens could without touching the skin. We built the macro textures entirely in latent space, then graded them to sit seamlessly next to the practical brand footage around them.",
    credits: [
      { label: "Director", value: "You" },
      { label: "Model", value: "Image + video diffusion" },
      { label: "Grade", value: "Matched to practical footage" },
      { label: "Runtime", value: "0:18" },
    ],
    // reel utama menyusul (generate_video); halaman detail aman tanpa video
    stills: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_235225_82b812c5-3b74-4858-9f42-a0ebda1e05c8_min.webp",
      "https://d8j0ntlcm91z4.cloudfront.net/user_36avIXGX2r1x9xqEvTIgeJxLR0R/hf_20260714_235226_7bc512ff-5bad-430f-95f5-fe6a8d6d2874_min.webp",
    ],
  },
];

export function getWorkBySlug(slug: string | undefined) {
  return works.find((w) => w.slug === slug);
}

export function getAdjacentWork(slug: string | undefined) {
  const i = works.findIndex((w) => w.slug === slug);
  if (i === -1) return works[0];
  return works[(i + 1) % works.length];
}
