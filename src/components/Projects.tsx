import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n'

// Datos de cada proyecto (iguales en los dos idiomas).
// "demo" → botón "Ver la web"; "video" → botón "Vídeo demostrativo" que abre el vídeo en una ventana (pueden ir los dos).
// Sin vídeo, con "steps" en los textos → botón "Cómo funciona"; sin nada de esto → "Vídeo demostrativo" desactivado.
// "image" → captura en public/projects/; sin ella la tarjeta muestra un degradado con el nombre.
type ProjectInfo = { stack: string; image?: string; video?: string; demo?: string; github?: string }

const projectInfo: Record<string, ProjectInfo> = {
  'the-knife': { stack: 'React · Flask · PostgreSQL', image: '/projects/TheKnife.png', demo: 'https://the-knife.onrender.com/', github: 'https://github.com/4GeeksAcademy/TheKnife-pt-137' },
  'starwars-api': { stack: 'Flask · SQLAlchemy', github: 'https://github.com/Grazziel/starwars-api' },
  'starwars-blog': { stack: 'React · Context API', image: '/projects/Blog-StarWars.png', demo: 'https://starwars-blog-graziele.vercel.app/', video: '/videos/starwars-blog.mp4', github: 'https://github.com/Grazziel/starwars-blog' },
  'jwt-auth': { stack: 'Flask · React · JWT', github: 'https://github.com/Grazziel/jwt-auth-flask-react' },
  'contact-list': { stack: 'React · Context API', image: '/projects/List-contact.png', demo: 'https://graziele-contact-list.vercel.app/', video: '/videos/contact-list.mp4', github: 'https://github.com/Grazziel/contactList-Grazi-Julio' },
}

function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="video-modal"
      aria-label={title}
      onClose={onClose}
      // Clic fuera del vídeo (en el fondo oscuro) → cerrar
      onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
    >
      <div className="video-modal-inner">
        <button type="button" className="video-modal-close" aria-label={t.projects.close} onClick={() => dialogRef.current?.close()}>
          ✕
        </button>
        <video src={src} controls autoPlay playsInline />
      </div>
    </dialog>
  )
}

// Ventana "Cómo funciona": explica el proyecto paso a paso cuando no hay vídeo
function StepsModal({ title, steps, onClose }: { title: string; steps: string[]; onClose: () => void }) {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="steps-modal"
      aria-labelledby="steps-modal-title"
      onClose={onClose}
      // Clic fuera de la ventana → cerrar
      onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
    >
      <div className="steps-modal-box">
        <button type="button" className="contact-modal-close" aria-label={t.contact.close} onClick={() => dialogRef.current?.close()}>
          ✕
        </button>
        <p className="steps-modal-eyebrow">{t.projects.howItWorks}</p>
        <h3 id="steps-modal-title">{title}</h3>
        <ol className="steps-list">
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
    </dialog>
  )
}

// Tarjeta que gira al hacer clic: delante imagen y título, detrás descripción y enlaces
function ProjectCard({ id, title, text, steps, onOpenVideo, onOpenSteps }: {
  id: string
  title: string
  text: string
  steps?: string[]
  onOpenVideo: (src: string) => void
  onOpenSteps: () => void
}) {
  const { t } = useLanguage()
  const [flipped, setFlipped] = useState(false)
  const info = projectInfo[id] ?? { stack: '' }

  return (
    <li className={`project-card${flipped ? ' is-flipped' : ''}`}>
      <div className="project-card-inner">
        {/* La cara oculta es "inert" para que no se pueda llegar a sus botones con el tabulador */}
        <button type="button" className="project-card-front" onClick={() => setFlipped(true)} inert={flipped} aria-label={`${title}: ${t.projects.flip}`}>
          {info.image ? (
            <img className="project-card-image" src={info.image} alt="" loading="lazy" />
          ) : (
            <span className="project-card-image is-placeholder" aria-hidden="true">{title}</span>
          )}
          <span className="project-card-content">
            <span className="project-card-title">{title}</span>
            <span className="project-card-stack">{info.stack}</span>
            <span className="project-card-hint">{t.projects.flip} ⟲</span>
          </span>
        </button>

        <div className="project-card-back" inert={!flipped}>
          <h3>{title}</h3>
          <p className="project-card-stack">{info.stack}</p>
          <p className="project-card-text">{text}</p>
          <div className="project-links">
            {info.demo && (
              <a className="project-button" href={info.demo} target="_blank" rel="noopener noreferrer">
                {t.projects.liveSite}
              </a>
            )}
            {info.video ? (
              <button type="button" className="project-button" onClick={() => onOpenVideo(info.video!)}>
                ▶ {t.projects.videoDemo}
              </button>
            ) : steps ? (
              <button type="button" className="project-button" onClick={onOpenSteps}>
                {t.projects.howItWorks}
              </button>
            ) : !info.demo && (
              <span className="project-button is-disabled" aria-disabled="true" title={t.projects.demoSoon}>
                {t.projects.videoDemo}
              </span>
            )}
            {info.github && (
              <a className="project-button" href={info.github} target="_blank" rel="noopener noreferrer">
                <i className="devicon-github-original" aria-hidden="true" /> GitHub
              </a>
            )}
          </div>
          <button type="button" className="project-card-back-button" onClick={() => setFlipped(false)}>
            ⟲ {t.projects.flipBack}
          </button>
        </div>
      </div>
    </li>
  )
}

function Projects() {
  const { t } = useLanguage()
  const [openVideo, setOpenVideo] = useState<{ src: string; title: string } | null>(null)
  const [openSteps, setOpenSteps] = useState<{ title: string; steps: string[] } | null>(null)

  return (
    <section id="projects" className="section section-projects">
      <div className="section-inner">
        <p className="eyebrow">{t.projects.eyebrow}</p>
        <h2 className="display">{t.projects.title}</h2>
        <ul className="project-grid">
          {t.projects.items.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              text={project.text}
              steps={project.steps}
              onOpenVideo={(src) => setOpenVideo({ src, title: project.title })}
              onOpenSteps={() => project.steps && setOpenSteps({ title: project.title, steps: project.steps })}
            />
          ))}
        </ul>
      </div>
      {openVideo && <VideoModal src={openVideo.src} title={openVideo.title} onClose={() => setOpenVideo(null)} />}
      {openSteps && <StepsModal title={openSteps.title} steps={openSteps.steps} onClose={() => setOpenSteps(null)} />}
    </section>
  )
}

export default Projects
