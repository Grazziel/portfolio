import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Language = 'es' | 'en'

const translations = {
  es: {
    menu: {
      button: 'Menú',
      about: 'Sobre mí',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    languageLabel: 'Cambiar idioma',
    hero: {
      title: 'Portfolio',
      tagline: 'Lista para aportar en desarrollo y seguir aprendiendo en el proceso.',
      cta: '¿Hablamos?',
    },
    about: {
      eyebrow: 'Sobre mi camino',
      title: 'De Finanzas a Full-Stack',
      text: 'Vengo del mundo de Administración y Finanzas, y hace un tiempo decidí dar el salto hacia la programación. Hice la formaci de 4Geeks Academy, donde aprendí Python, Flask y React, y desde entonces no he parado de construir proyectos y aprender cosas nuevas. Me gusta entender bien cómo funcionan las cosas por dentro, resolver problemas paso a paso, y disfruto especialmente el momento en que algo que estaba roto por fin funciona. Este portfolio es, de hecho, mi primer proyecto construido completamente por mi cuenta.',
    },
    projects: {
      eyebrow: 'Proyectos de formaci',
      title: 'Proyectos',
      demoSoon: 'Vídeo próximamente',
      videoDemo: 'Vídeo demostrativo',
      liveSite: 'Ver la web',
      howItWorks: 'Cómo funciona',
      close: 'Cerrar vídeo',
      flip: 'Ver detalles',
      flipBack: 'Volver',
      items: [
        { id: 'the-knife', title: 'The Knife', text: 'Proyecto final de la formaci: plataforma de gestión de restaurantes con roles (gerente, chef, cocina, sala, recepción y cliente), reservas, comandas y recetas. React, Flask, PostgreSQL y JWT, con Google Maps, Cloudinary y la API de Claude para generar recetas a partir de una foto.' },
        { id: 'starwars-api', title: 'API REST de Star Wars', text: 'API construida con Flask y SQLAlchemy: modelado de base de datos con usuarios, personajes, planetas y un sistema de favoritos, con endpoints REST para consultarlos y gestionarlos.', steps: [
          'Modelé la base de datos con SQLAlchemy: usuarios, personajes, planetas y favoritos.',
          'GET /people y GET /planets devuelven todos los personajes y planetas; con /people/<id> o /planets/<id>, solo uno.',
          'GET /users lista los usuarios y GET /users/favorites muestra los favoritos del usuario.',
          'POST /favorite/planet/<id> o /favorite/people/<id> añade un favorito, y DELETE en la misma ruta lo quita.',
          'Todas las respuestas van en JSON, con un error 404 claro si lo que pides no existe.',
        ] },
        { id: 'starwars-blog', title: 'Blog de Star Wars', text: 'Aplicación en React con Context API que consume SWAPI.tech para mostrar personajes, planetas y vehículos, con sistema de favoritos.' },
        { id: 'jwt-auth', title: 'Autenticación JWT', text: 'Registro, login y rutas privadas protegidas con Flask y React, con manejo de tokens en sessionStorage.', steps: [
          'Te registras con tu email y una contraseña.',
          'Inicias sesión: el servidor Flask comprueba tus datos y te devuelve un token JWT.',
          'React guarda ese token en sessionStorage.',
          'Con el token entras a una página privada que antes estaba bloqueada. Sin él, te devuelve al login.',
          'Al cerrar sesión el token se borra y la página vuelve a quedar bloqueada.',
        ] },
        { id: 'contact-list', title: 'Lista de Contactos', text: 'Aplicación en React con Context API y CRUD completo consumiendo una API REST externa.' },
      ],
    },
    skills: {
      eyebrow: 'Herramientas esenciales',
      title: 'Habilidades',
    },
    contact: {
      title: 'Contacto',
      text: 'Si quieres ponerte en contacto conmigo, escríbeme por email o conecta conmigo en LinkedIn.',
      openForm: 'Escríbeme aquí',
      formTitle: 'Hablamos',
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'tu@email.com',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntame en qué puedo ayudarte...',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      sent: '¡Gracias! Tu mensaje me ha llegado y te responderé pronto.',
      error: 'No se ha podido enviar. Inténtalo de nuevo o escríbeme directamente al email.',
      close: 'Cerrar formulario',
      subject: 'Nuevo mensaje desde el portfolio',
    },
    backToTop: {
      text: '↑ Volver arriba',
      label: 'Volver arriba',
    },
  },
  en: {
    menu: {
      button: 'Menu',
      about: 'About me',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    languageLabel: 'Change language',
    hero: {
      title: 'Portfolio',
      tagline: 'Ready to contribute to development and keep learning along the way.',
      cta: "Let's talk!",
    },
    about: {
      eyebrow: 'About my journey',
      title: 'From Finance to Full-Stack',
      text: "I come from Administration and Finance, and a while ago I decided to make the jump into programming. I completed 4Geeks Academy's Full-Stack training, where I learned Python, Flask and React, and since then I haven't stopped building projects and learning new things. I like to really understand how things work under the hood, solve problems step by step, and I especially enjoy the moment when something that was broken finally works. This portfolio is, in fact, my first project built entirely on my own.",
    },
    projects: {
      eyebrow: 'Training projects',
      title: 'Projects',
      demoSoon: 'Video coming soon',
      videoDemo: 'Video demo',
      liveSite: 'Visit site',
      howItWorks: 'How it works',
      close: 'Close video',
      flip: 'See details',
      flipBack: 'Back',
      items: [
        { id: 'the-knife', title: 'The Knife', text: 'Final training project: a restaurant management platform with roles (manager, chef, kitchen, waiter, host and client), reservations, orders and recipes. React, Flask, PostgreSQL and JWT, with Google Maps, Cloudinary and the Claude API to generate recipes from a photo.' },
        { id: 'starwars-api', title: 'Star Wars REST API', text: 'API built with Flask and SQLAlchemy: database modeling with users, characters, planets and a favorites system, with REST endpoints to query and manage them.', steps: [
          'I modeled the database with SQLAlchemy: users, characters, planets and favorites.',
          'GET /people and GET /planets return every character and planet; /people/<id> or /planets/<id> return just one.',
          'GET /users lists the users and GET /users/favorites shows the favorites of the user.',
          'POST /favorite/planet/<id> or /favorite/people/<id> adds a favorite, and DELETE on the same route removes it.',
          'Every response is JSON, with a clear 404 error if what you ask for does not exist.',
        ] },
        { id: 'starwars-blog', title: 'Star Wars Blog', text: 'React app with Context API that consumes SWAPI.tech to show characters, planets and vehicles, with a favorites system.' },
        { id: 'jwt-auth', title: 'JWT Authentication', text: 'Sign-up, login and protected private routes with Flask and React, with tokens handled in sessionStorage.', steps: [
          'You sign up with your email and a password.',
          'You log in: the Flask server checks your details and returns a JWT token.',
          'React stores that token in sessionStorage.',
          'With the token you get into a private page that was locked before. Without it, you are sent back to the login.',
          'When you log out the token is deleted and the page is locked again.',
        ] },
        { id: 'contact-list', title: 'Contact List', text: 'React app with Context API and full CRUD against an external REST API.' },
      ],
    },
    skills: {
      eyebrow: 'Essential tools',
      title: 'Skills',
    },
    contact: {
      title: 'Get in Touch',
      text: 'If you want to get in touch, send me an email or connect with me on LinkedIn.',
      openForm: 'Write to me here',
      formTitle: 'Get in touch',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      message: 'Message',
      messagePlaceholder: 'Tell me how I can help...',
      send: 'Send message',
      sending: 'Sending...',
      sent: "Thanks! I've received your message and will reply soon.",
      error: "It couldn't be sent. Try again or email me directly.",
      close: 'Close form',
      subject: 'New message from the portfolio',
    },
    backToTop: {
      text: '↑ Back to top',
      label: 'Back to top',
    },
  },
}

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (typeof translations)['es']
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('language')
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // localStorage no disponible: usamos el idioma del navegador
  }
  return navigator.language.startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    try {
      localStorage.setItem('language', language)
    } catch {
      // sin persistencia, no pasa nada
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage debe usarse dentro de LanguageProvider')
  return context
}
