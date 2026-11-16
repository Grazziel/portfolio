import { useLanguage } from '../i18n'

function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="section about">
      <div className="section-inner about-layout">
        <div className="about-heading">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="display">{t.about.title}</h2>
        </div>
        {/* Vídeo decorativo: la muñequita saludando, en bucle y sin sonido */}
        <video className="about-video" src="/videos/avatar.mp4" autoPlay loop muted playsInline aria-hidden="true" />
        <p className="about-text">{t.about.text}</p>
      </div>
    </section>
  )
}

export default About
