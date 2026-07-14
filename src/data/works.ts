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
    thumbnail: "/works/aether/thumb.jpg",
    synopsis:
      "A watch that doesn't age with the season, so the film shouldn't either. We generated four climates inside one continuous take, cutting on movement instead of edits — treating the diffusion model like a crew that never breaks for weather.",
    credits: [
      { label: "Director", value: "You" },
      { label: "Prompt design", value: "You" },
      { label: "Model", value: "Custom LoRA + video diffusion" },
      { label: "Grade", value: "Teal / amber, hand-tuned" },
      { label: "Runtime", value: "0:32" },
    ],
    video: "/works/aether/reel.mp4",
    stills: [
      "/works/aether/still-01.jpg",
      "/works/aether/still-02.jpg",
      "/works/aether/still-03.jpg",
    ],
  },
  {
    slug: "marrow-the-last-pour",
    scene: "SC.02",
    title: "The Last Pour",
    client: "Marrow Coffee",
    role: "Director / Prompt Design",
    year: "2025",
    thumbnail: "/works/marrow/thumb.jpg",
    synopsis:
      "A coffee ad shot like a heist film — the reveal is one continuous pour tracked through three rooms. Storyboarded frame-by-frame, then generated shot-for-shot to match the original animatic's timing.",
    credits: [
      { label: "Director", value: "You" },
      { label: "Prompt design", value: "You" },
      { label: "Model", value: "Video diffusion" },
      { label: "Sound design", value: "Collaborator" },
      { label: "Runtime", value: "0:24" },
    ],
    video: "/works/marrow/reel.mp4",
    stills: ["/works/marrow/still-01.jpg", "/works/marrow/still-02.jpg"],
  },
  {
    slug: "lucent-skin-you-trust",
    scene: "SC.03",
    title: "Skin You Trust",
    client: "Lucent Skincare",
    role: "Director / Post",
    year: "2025",
    thumbnail: "/works/lucent/thumb.jpg",
    synopsis:
      "Macro textures no practical lens could reach without touching the skin. We built the close-ups entirely in latent space, then graded them to sit seamlessly next to the practical brand footage around them.",
    credits: [
      { label: "Director", value: "You" },
      { label: "Model", value: "Image + video diffusion" },
      { label: "Grade", value: "Matched to practical footage" },
      { label: "Runtime", value: "0:18" },
    ],
    video: "/works/lucent/reel.mp4",
    stills: ["/works/lucent/still-01.jpg"],
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
