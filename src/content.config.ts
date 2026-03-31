import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const header = defineCollection({
  loader: glob({ pattern: "header.md", base: "./src/content/header" }),
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

const hero = defineCollection({
  loader: glob({ pattern: "hero.md", base: "./src/content/hero" }),
  schema: z.object({
    titleMain: z.string(),     // "NutreFitLife"
    titleItalic: z.string(),   // "Group"
    description: z.string(),
    logoPath: z.string(),
    whatsappLink: z.string().url(),
    primaryBtnText: z.string(), // "CONSULTAR"
    secondaryBtnText: z.string(), // "VER PRODUCTOS"
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "about.md", base: "./src/content/about" }),
  schema: z.object({
    badge: z.string(), // "NOSOTROS"
    title: z.string(), // "Comprometidos con tu máximo potencial"
    titleItalic: z.string(), // "máximo potencial"
    imagePath: z.string(),
    sections: z.array(z.object({
      subtitle: z.string(), // "VISIÓN"
      content: z.string()
    }))
  }),
});

const products = defineCollection({
  // Loader para buscar archivos .md en la carpeta content
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }), // Recomendado: apuntar a la subcarpeta products
  schema: z.object({
    name: z.string(),
    description: z.string(), // Resumen corto para la card
    price: z.string(),
    category: z.string(),
    brand: z.string(),
    image: z.string().optional(),
    
    // --- NUEVOS CAMPOS PARA EL DETALLE (MODAL) ---
    fullDescription: z.string().optional(), // La info larga que vimos en tu captura
    benefits: z.array(z.string()).optional(), // Lista de beneficios (ej: ["Mejora fuerza", "Recuperación"])
    usage: z.string().optional(), // Modo de uso o recomendación
    format: z.string().optional(), // Ej: "Polvo 250g", "Cápsulas", etc.
  }),
});

const consultoria = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/consultoria" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    professionalName: z.string(),
    professionalHandle: z.string(), // @emilio.matiuda
    socialLink: z.string().url(),   // Link a IG o TikTok
    image: z.string().optional(),
    features: z.array(z.object({
      title: z.string(),
      desc: z.string()
    }))
  }),
});

const logistica = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/logistica" }),
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
    // Cambiado a un arreglo para soportar varias sedes con mapas
    locations: z.array(z.object({
      city: z.string(),
      area: z.string(),
      address: z.string(),
      googleMapsUrl: z.string().url(),
      mapEmbedUrl: z.string().optional(), // Link del iframe de Google Maps
      type: z.string().default("Venta Mayorista y Minorista")
    }))
  }),
});

const footer = defineCollection({
  loader: glob({ pattern: "footer.md", base: "./src/content/footer" }),
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

export const collections = { products, consultoria, logistica, footer, about, hero, header };