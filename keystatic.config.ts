import { config, fields, collection, singleton } from '@keystatic/core';
import React from 'react';

export default config({
  storage: process.env.NODE_ENV === 'development' 
    ? { kind: 'local' } 
    : { kind: 'cloud' },
  cloud: {
    project: 'nutrefitlife/nutrefitlife-landing',
  },
  ui: {
    brand: { 
      name: 'NutreFitLife Admin',
      mark: () => (
        React.createElement('img', { 
          src: '/assets/nutrefitlife_logo.png', 
          alt: 'Logo', 
          style: { height: '24px', display: 'block' } 
        })
      ),
    },
    navigation: {
      '🏠 Identidad y Menú': ['header', 'footer'],
      '🚀 Secciones de la Web': ['hero', 'about', 'logistica'],
      '📦 Gestión de Tienda': ['products', 'consultoria'],
    },
  },
  singletons: {
    header: singleton({
      label: 'Configuración del Menú',
      path: 'src/content/header/header',
      format: { data: 'json' },
      schema: {
        brandName: fields.text({ label: 'Nombre de la Marca' }),
        // Cambio a Imagen
        logoPath: fields.image({
          label: 'Logo del Menú',
          directory: 'public/assets/header',
          publicPath: '/assets/header/',
        }),
        contactLink: fields.url({ label: 'Enlace WhatsApp' }),
        navItems: fields.array(
          fields.object({
            label: fields.text({ label: 'Texto del botón' }),
            sectionId: fields.text({ label: 'Ancla (ID de sección)' }),
          }),
          { 
            label: 'Botones de Navegación', 
            itemLabel: (p) => p.fields.label.value || 'Nuevo Botón' 
          }
        ),
      },
    }),
    hero: singleton({
      label: 'Sección de Bienvenida',
      path: 'src/content/hero/hero',
      format: { data: 'json' },
      schema: {
        titleMain: fields.text({ label: 'Título Principal (Blanco)' }),
        titleItalic: fields.text({ label: 'Título Secundario (Rojo/Cursiva)' }),
        description: fields.text({ label: 'Descripción de Intro', multiline: true }),
        // Cambio a Imagen
        logoPath: fields.image({
          label: 'Logo Central Hero',
          directory: 'public/assets/hero',
          publicPath: '/assets/hero/',
        }),
        whatsappLink: fields.url({ label: 'Link de WhatsApp' }),
        primaryBtnText: fields.text({ label: 'Texto Botón Principal' }),
        secondaryBtnText: fields.text({ label: 'Texto Botón Secundario' }),
      },
    }),
    about: singleton({
      label: 'Sección Nosotros',
      path: 'src/content/about/about',
      format: { data: 'json' },
      schema: {
        badge: fields.text({ label: 'Etiqueta pequeña (Ej: NOSOTROS)' }),
        title: fields.text({ label: 'Título Principal' }),
        titleItalic: fields.text({ label: 'Texto en Cursiva' }),
        // Cambio a Imagen
        imagePath: fields.image({
          label: 'Imagen Lateral Nosotros',
          directory: 'public/assets/about',
          publicPath: '/assets/about/',
        }),
        sections: fields.array(
          fields.object({
            subtitle: fields.text({ label: 'Subtítulo (Misión/Visión)' }),
            content: fields.text({ label: 'Párrafo de texto', multiline: true }),
          }),
          { 
            label: 'Bloques de Información', 
            itemLabel: (p) => p.fields.subtitle.value || 'Nuevo Bloque' 
          }
        ),
      },
    }),
    logistica: singleton({
      label: 'Envíos y Sucursales',
      path: 'src/content/logistica/logistica',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Título de la Sección' }),
        localDelivery: fields.object({
          title: fields.text({ label: 'Título Delivery' }),
          description: fields.text({ label: 'Descripción corta' }),
          scheduleTitle: fields.text({ label: 'Texto Horarios' }),
          scheduleTime: fields.text({ label: 'Horas' }),
          note: fields.text({ label: 'Nota/Aviso' }),
        }, { label: 'Configuración Delivery Local' }),
        nationalShipping: fields.object({
          title: fields.text({ label: 'Título Nacional' }),
          description: fields.text({ label: 'Descripción' }),
          scheduleTitle: fields.text({ label: 'Texto Días' }),
          scheduleDays: fields.text({ label: 'Días' }),
          note: fields.text({ label: 'Nota/Aviso' }),
        }, { label: 'Configuración Envíos Nacionales' }),
        locations: fields.array(
          fields.object({
            city: fields.text({ label: 'Ciudad' }),
            area: fields.text({ label: 'Barrio/Zona' }),
            address: fields.text({ label: 'Dirección Exacta' }),
            googleMapsUrl: fields.url({ label: 'Link a Google Maps' }),
            mapEmbedUrl: fields.text({ label: 'URL Iframe (Mapa embebido)' }),
            type: fields.text({ label: 'Tipo de local' }),
          }),
          { 
            label: 'Listado de Sucursales', 
            itemLabel: (p) => `${p.fields.city.value} - ${p.fields.area.value}` 
          }
        ),
      },
    }),
    footer: singleton({
      label: 'Pie de Página',
      path: 'src/content/footer/footer',
      format: { data: 'json' },
      schema: {
        brandName: fields.text({ label: 'Nombre en Footer' }),
        description: fields.text({ label: 'Texto bajo el logo', multiline: true }),
        // Cambio a Imagen
        logoPath: fields.image({
          label: 'Logo del Footer',
          directory: 'public/assets/footer',
          publicPath: '/assets/footer/',
        }),
        officialBrands: fields.array(fields.text({ label: 'Nombre de Marca' }), { label: 'Marcas que distribuimos' }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Red Social' }),
            handle: fields.text({ label: 'Usuario (@...)' }),
            link: fields.url({ label: 'URL Perfil' }),
          }),
          { 
            label: 'Redes Sociales', 
            itemLabel: (p) => p.fields.label.value || 'Nueva Red' 
          }
        ),
        credits: fields.object({
          designer: fields.text({ label: 'Diseñador/Web' }),
          expert: fields.text({ label: 'Especialista/Asesor' }),
        }, { label: 'Créditos del sitio' }),
      },
    }),
  },
  collections: {
    products: collection({
      label: '📦 Productos',
      path: 'src/content/products/*',
      format: { data: 'json' },
      slugField: 'name',
      columns: ['brand', 'category', 'price'],
      schema: {
        name: fields.slug({ name: { label: 'Nombre del Producto' } }),
        brand: fields.text({ label: 'Marca' }),
        price: fields.text({ label: 'Precio' }),
        category: fields.text({ label: 'Categoría' }),
        description: fields.text({ label: 'Resumen Card' }),
        fullDescription: fields.text({ label: 'Detalle Completo', multiline: true }),
        format: fields.text({ label: 'Presentación' }),
        usage: fields.text({ label: 'Modo de Uso', multiline: true }),
        benefits: fields.array(fields.text({ label: 'Beneficio' }), { label: 'Lista de Beneficios' }),
        // Cambio a Imagen
        image: fields.image({
          label: 'Imagen del Producto',
          directory: 'public/assets/products',
          publicPath: '/assets/products/',
        }),
      },
    }),
    consultoria: collection({
      label: '🩺 Consultoría',
      path: 'src/content/consultoria/*',
      format: { data: 'json' },
      slugField: 'professionalName',
      columns: ['title', 'professionalHandle'],
      schema: {
        professionalName: fields.slug({ name: { label: 'Nombre del Profesional' } }),
        title: fields.text({ label: 'Servicio / Especialidad' }),
        description: fields.text({ label: 'Biografía / Info', multiline: true }),
        professionalHandle: fields.text({ label: 'Instagram (@...)' }),
        socialLink: fields.url({ label: 'Link Instagram' }),
        // Cambio a Imagen
        image: fields.image({
          label: 'Foto de Perfil',
          directory: 'public/assets/consultoria',
          publicPath: '/assets/consultoria/',
        }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: 'Título Ítem' }),
            desc: fields.text({ label: 'Descripción Ítem' }),
          }),
          { 
            label: 'Características', 
            itemLabel: (p) => p.fields.title.value || 'Nueva característica' 
          }
        ),
      },
    }),
  },
});