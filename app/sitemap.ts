import type { MetadataRoute } from "next";

const BASE = "https://axusai.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${BASE}/servicios`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/nosotros`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contacto`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
