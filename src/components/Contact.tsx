import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../i18n'

const EMAIL = 'grazipgdm@icloud.com'
// Web3Forms reenvía cada mensaje del formulario a grazipgdm@icloud.com (sin servidor propio).
// La clave no es secreta: solo permite enviar mensajes a ese email.
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = 'de37b22b-7ad0-4f55-883b-f68b405d3021'

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Ventana con el formulario (estilo de "Get in touch" de Canva)
function ContactForm({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_KEY,
          subject: t.contact.subject,
          from_name: 'Portfolio',
          replyto: data.email,
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="contact-modal"
      aria-labelledby="contact-form-title"
      onClose={onClose}
      // Clic fuera de la ventana → cerrar
      onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
    >
      <div className="contact-modal-box">
        <button type="button" className="contact-modal-close" aria-label={t.contact.close} onClick={() => dialogRef.current?.close()}>
          ✕
        </button>
        <h3 id="contact-form-title">{t.contact.formTitle}</h3>

        {status === 'sent' ? (
          <p className="contact-form-status" role="status">{t.contact.sent}</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">{t.contact.name}</label>
            <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder={t.contact.namePlaceholder} />

            <label htmlFor="contact-email">{t.contact.email}</label>
            <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder={t.contact.emailPlaceholder} />

            <label htmlFor="contact-message">{t.contact.message}</label>
            <textarea id="contact-message" name="message" required rows={4} placeholder={t.contact.messagePlaceholder} />

            {/* Campo trampa para bots: las personas no lo ven, si viene marcado Web3Forms descarta el mensaje */}
            <input type="checkbox" name="botcheck" className="contact-honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {status === 'error' && <p className="contact-form-status is-error" role="alert">{t.contact.error}</p>}

            <button type="submit" className="contact-pill" disabled={status === 'sending'}>
              {status === 'sending' ? t.contact.sending : t.contact.send}
            </button>
          </form>
        )}
      </div>
    </dialog>
  )
}

function Contact() {
  const { t } = useLanguage()
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section id="contact" className="section section-contact">
      <div className="section-inner">
        <h2 className="display">{t.contact.title}</h2>
        <div className="contact-body">
          <p>{t.contact.text}</p>
          <ul className="contact-list">
            <li><span className="eyebrow">Email</span> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><span className="eyebrow">LinkedIn</span> <a href="https://www.linkedin.com/in/grazielegomesdemacedo/" target="_blank" rel="noopener noreferrer">linkedin.com/in/grazielegomesdemacedo</a></li>
          </ul>
          <button type="button" className="contact-pill" onClick={() => setFormOpen(true)}>
            {t.contact.openForm}
          </button>
        </div>
      </div>
      {formOpen && <ContactForm onClose={() => setFormOpen(false)} />}
    </section>
  )
}

export default Contact
