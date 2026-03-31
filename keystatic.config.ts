import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  // --- PERSONALIZACIÓN VISUAL DEL PANEL ---
  ui: {
    brand: { 
      name: 'NutreFitLife Admin',
    },
    navigation: {
      'Contenido Principal': ['header', 'hero', 'about', 'footer'],
      'Tienda y Servicios': ['products', 'consultoria', 'logistica'],
    },
  },
  // ----------------------------------------
  singletons: {
    header: singleton({
      label: 'Configuración del Menú',
      path: 'src/content/header/header',
      schema: {
        brandName: fields.text({ 
          label: 'Nombre de la Marca',
          description: 'Nombre que aparece en la esquina superior izquierda.' 
        }),
        logoPath: fields.text({ 
          label: 'Ruta del Logo',
          description: 'Ejemplo: /assets/logo.png' 
        }),
        contactLink: fields.url({ label: 'Enlace WhatsApp (Botón de contacto)' }),
        navItems: fields.array(
          fields.object({
            label: fields.text({ label: 'Texto del botón' }),
            sectionId: fields.text({ label: 'Ancla (ID)', description: 'Ej: #productos' }),
          }),
          { 
            label: 'Botones de Navegación', 
            itemLabel: (p) => p.fields.label.value || 'Nuevo Botón'
          }
        ),
      },
    }),
    hero: singleton({
      label: 'Sección de Bienvenida (Inicio)',
      path: 'src/content/hero/hero',
      schema: {
        titleMain: fields.text({ label: 'Título Grande (Normal)' }),
        titleItalic: fields.text({ label: 'Título Grande (Cursiva/Rojo)' }),
        description: fields.text({ label: 'Texto de Introducción', multiline: true }),
        logoPath: fields.text({ label: 'Logo Central (Ruta)' }),
        whatsappLink: fields.url({ label: 'Enlace de consulta directa' }),
        primaryBtnText: fields.text({ label: 'Texto Botón Rojo (Principal)' }),
        secondaryBtnText: fields.text({ label: 'Texto Botón Blanco (Secundario)' }),
      },
    }),
    about: singleton({
      label: 'Sección Sobre Nosotros',
      path: 'src/content/about/about',
      schema: {
        badge: fields.text({ label: 'Etiqueta pequeña (Ej: NOSOTROS)' }),
        title: fields.text({ label: 'Título Principal' }),
        titleItalic: fields.text({ label: 'Parte del título en cursiva' }),
        imagePath: fields.text({ label: 'Ruta de imagen de fondo/lateral' }),
        sections: fields.array(
          fields.object({
            subtitle: fields.text({ label: 'Subtítulo (Ej: NUESTRA VISIÓN)' }),
            content: fields.text({ label: 'Texto del párrafo', multiline: true }),
          }),
          { 
            label: 'Bloques de texto informativos', 
            itemLabel: (p) => p.fields.subtitle.value || 'Nuevo Bloque'
          }
        ),
      },
    }),
    logistica: singleton({
      label: 'Logística, Envíos y Sedes',
      path: 'src/content/logistica/logistica',
      schema: {
        title: fields.text({ label: 'Título de la Sección completa' }),
        localDelivery: fields.object({
          title: fields.text({ label: 'Título Envío Local' }),
          description: fields.text({ label: 'Texto descriptivo' }),
          scheduleTitle: fields.text({ label: 'Etiqueta (Ej: Horarios)' }),
          scheduleTime: fields.text({ label: 'Horario detallado' }),
          note: fields.text({ label: 'Nota importante (Ej: Solo efectivo)' }),
        }, { label: 'Configuración Delivery Local' }),
        nationalShipping: fields.object({
          title: fields.text({ label: 'Título Envío Nacional' }),
          description: fields.text({ label: 'Texto descriptivo' }),
          scheduleTitle: fields.text({ label: 'Etiqueta (Ej: Días de despacho)' }),
          scheduleDays: fields.text({ label: 'Días/Frecuencia' }),
          note: fields.text({ label: 'Nota importante' }),
        }, { label: 'Configuración Envíos Nacionales' }),
        locations: fields.array(
          fields.object({
            city: fields.text({ label: 'Ciudad' }),
            area: fields.text({ label: 'Barrio o Zona' }),
            address: fields.text({ label: 'Dirección Completa' }),
            googleMapsUrl: fields.url({ label: 'Link de ubicación (Google Maps)' }),
            mapEmbedUrl: fields.text({ label: 'Link de Mapa Embebido (Iframe)', description: 'Solo el src del iframe de Google Maps' }),
            type: fields.text({ label: 'Tipo de local', defaultValue: 'Venta Mayorista y Minorista' }),
          }),
          { 
            label: 'Sucursales Físicas', 
            itemLabel: (p) => `${p.fields.city.value} - ${p.fields.area.value}`
          }
        ),
      },
    }),
    footer: singleton({
      label: 'Pie de Página (Footer)',
      path: 'src/content/footer/footer',
      schema: {
        brandName: fields.text({ label: 'Nombre de la Empresa' }),
        description: fields.text({ label: 'Breve descripción bajo el logo' }),
        logoPath: fields.text({ label: 'Ruta del Logo' }),
        officialBrands: fields.array(fields.text({ label: 'Nombre de Marca Aliada' }), { label: 'Marcas que distribuyen' }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Red Social (Ej: Instagram)' }),
            handle: fields.text({ label: 'Usuario (Ej: @nutrefitlife)' }),
            link: fields.url({ label: 'Link directo al perfil' }),
          }),
          { itemLabel: (p) => p.fields.label.value || 'Nueva Red Social' }
        ),
        credits: fields.object({
          designer: fields.text({ label: 'Desarrollado por' }),
          expert: fields.text({ label: 'Asesoría de' }),
        }, { label: 'Créditos del Sitio' }),
      },
    }),
  },
  collections: {
    products: collection({
      label: 'Catálogo de Productos',
      path: 'src/content/products/*',
      slugField: 'name',
      schema: {
        name: fields.slug({ name: { label: 'Nombre del Producto', description: 'Esto generará la URL del producto.' } }),
        description: fields.text({ label: 'Resumen para la Card', description: 'Texto corto que se ve en el catálogo.' }),
        price: fields.text({ label: 'Precio (Ej: 150.000 Gs.)' }),
        category: fields.text({ label: 'Categoría (Ej: Proteínas)' }),
        brand: fields.text({ label: 'Marca del Suplemento' }),
        image: fields.text({ label: 'Ruta de la Imagen', description: '/assets/products/nombre.png' }),
        fullDescription: fields.text({ label: 'Descripción Larga (Detalle)', multiline: true }),
        benefits: fields.array(fields.text({ label: 'Beneficio' }), { 
          label: 'Lista de Beneficios',
          itemLabel: (p) => p.value || 'Nuevo beneficio'
        }),
        usage: fields.text({ label: '¿Cómo consumir este producto?', multiline: true }),
        format: fields.text({ label: 'Formato / Peso (Ej: 2 Lbs / 60 Caps)' }),
      },
    }),
    consultoria: collection({
      label: 'Servicios de Consultoría',
      path: 'src/content/consultoria/*',
      slugField: 'professionalName',
      schema: {
        professionalName: fields.slug({ name: { label: 'Nombre Completo del Profesional' } }),
        title: fields.text({ label: 'Especialidad / Título' }),
        description: fields.text({ label: 'Descripción del servicio', multiline: true }),
        professionalHandle: fields.text({ label: 'Usuario-@' }),
        socialLink: fields.url({ label: 'Link a red social' }),
        image: fields.text({ label: 'Foto del Profesional (Ruta)' }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: 'Título del ítem' }),
            desc: fields.text({ label: 'Descripción corta' }),
          }),
          { 
            label: 'Puntos clave del servicio',
            itemLabel: (p) => p.fields.title.value || 'Nuevo ítem'
          }
        ),
      },
    }),
  },
});