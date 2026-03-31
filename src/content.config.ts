import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- HEADER ---
const header = defineCollection({
  loader: glob({ pattern: "header.json", base: "./src/content/header" }),
  schema: z.object({
    brandName: z.string(),
    logoPath: z.string(),
    contactLink: z.string().url(),
    navItems: z.array(z.object({
      label: z.string(),
      sectionId: z.string()
    }))
  }),
});

// --- HERO ---
const hero = defineCollection({
  loader: glob({ pattern: "hero.json", base: "./src/content/hero" }),
  schema: z.object({
    titleMain: z.string(),
    titleItalic: z.string(),
    description: z.string(),
    logoPath: z.string(),
    whatsappLink: z.string().url(),
    primaryBtnText: z.string(),
    secondaryBtnText: z.string(),
  }),
});

// --- ABOUT ---
const about = defineCollection({
  loader: glob({ pattern: "about.json", base: "./src/content/about" }),
  schema: z.object({
    badge: z.string(),
    title: z.string(),
    titleItalic: z.string(),
    imagePath: z.string(),
    sections: z.array(z.object({
      subtitle: z.string(),
      content: z.string()
    }))
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string(),
  }),
});

const brands = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/brands" }),
  schema: z.object({
    name: z.string(),
    isOfficial: z.boolean().default(false),
  }),
});

// --- PRODUCTS ---
const products = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products" }),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    price: z.string(),
    category: z.string(),
    description: z.string(),
    image: z.string().optional(),
    fullDescription: z.string().optional(),
    benefits: z.array(z.string()).optional(),
    usage: z.string().optional(),
    format: z.string().optional(),
  }),
});

// --- CONSULTORIA ---
const consultoria = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/consultoria" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    professionalName: z.string(),
    professionalHandle: z.string(),
    socialLink: z.string().url(),
    image: z.string().optional(),
    features: z.array(z.object({
      title: z.string(),
      desc: z.string()
    }))
  }),
});

// --- LOGISTICA ---
const logistica = defineCollection({
  loader: glob({ pattern: "logistica.json", base: "./src/content/logistica" }),
  schema: z.object({
    title: z.string(),
    localDelivery: z.object({
      title: z.string(),
      description: z.string(),
      scheduleTitle: z.string(),
      scheduleTime: z.string(),
      note: z.string()
    }),
    nationalShipping: z.object({
      title: z.string(),
      description: z.string(),
      scheduleTitle: z.string(),
      scheduleDays: z.string(),
      note: z.string()
    }),
    locations: z.array(z.object({
      city: z.string(),
      area: z.string(),
      address: z.string(),
      googleMapsUrl: z.string().url(),
      mapEmbedUrl: z.string().optional(),
      type: z.string().default("Venta Mayorista y Minorista")
    }))
  }),
});

// --- FOOTER ---
const footer = defineCollection({
  loader: glob({ pattern: "footer.json", base: "./src/content/footer" }),
  schema: z.object({
    brandName: z.string(),
    description: z.string(),
    logoPath: z.string(),
    officialBrands: z.array(z.string()),
    socials: z.array(z.object({
      label: z.string(),
      handle: z.string(),
      link: z.string().url()
    })),
    credits: z.object({
      designer: z.string(),
      expert: z.string()
    })
  }),
});

export const collections = {categories, brands, products, consultoria, logistica, footer, about, hero, header };