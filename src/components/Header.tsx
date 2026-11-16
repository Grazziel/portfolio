import { useRef, useState, type MouseEvent } from 'react'
import { useLanguage } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'

// Colores de las ondas que siguen al ratón (los mismos que en Canva)
const RIPPLE_COLORS = ['#c084fc', '#818cf8', '#a5b4fc', '#ddd6fe']
const RIPPLE_THROTTLE = 80 // milisegundos entre ondas

function Header() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  const lastRipple = useRef(0)

  // Crea una onda donde está el ratón y la borra al terminar la animación
  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const now = Date.now()
    if (now - lastRipple.current < RIPPLE_THROTTLE) return
    lastRipple.current = now

    const hero = e.currentTarget
    const rect = hero.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'hero-ripple'
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top = `${e.clientY - rect.top}px`
    ripple.style.borderColor = RIPPLE_COLORS[Math.floor(Math.random() * RIPPLE_COLORS.length)]
    hero.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }

  return (
    <header className="header">
      <div className="top-bar">
        <LanguageSwitcher />
        <nav className="menu">
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {t.menu.button} {open ? '▲' : '▼'}
          </button>
          {open && (
            <ul className="menu-list" onClick={() => setOpen(false)}>
              <li><a href="#about">{t.menu.about}</a></li>
              <li><a href="#projects">{t.menu.projects}</a></li>
              <li><a href="#skills">{t.menu.skills}</a></li>
              <li><a href="#contact">{t.menu.contact}</a></li>
            </ul>
          )}
        </nav>
      </div>

      <div className="hero" onMouseMove={handleMouseMove}>
        <div className="hero-orb" aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-pulse" />
          <div className="hero-pulse" />
          <div className="hero-spinner" />
        </div>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-name">Graziele Gomes</p>
        <p className="hero-tagline">
          {t.hero.tagline} <a href="#contact">{t.hero.cta}</a>
        </p>
      </div>
    </header>
  )
}

export default Header
