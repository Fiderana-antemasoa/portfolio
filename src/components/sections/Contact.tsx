import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate email service (EmailJS, Resend, etc.)
    setSent(true)
  }

  return (
    <section id="contact" className="contact section">
      <div className="section-inner contact__inner">
        <div className="contact__left reveal">
          <p className="section-eyebrow">✦ Contact</p>
          <h2 className="section-title">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>
          <p className="contact__desc">
            Un projet en tête ? Une collaboration ? Ou juste envie de dire bonjour ? 
            Je suis toujours ravie d'échanger. ✿
          </p>

          <div className="contact__socials">
            {[
              { icon: '🔗', label: 'LinkedIn',  href: '#' },
              { icon: '🐙', label: 'GitHub',    href: '#' },
              { icon: '✉️', label: 'Email',     href: 'mailto:hello@monportfolio.fr' },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} className="contact__social">
                <span>{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact__form-wrap reveal" style={{ transitionDelay: '0.15s' }}>
          {sent ? (
            <div className="contact__success">
              <span>🌸</span>
              <h3>Message envoyé !</h3>
              <p>Merci, je reviens vers vous très vite.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nom</label>
                <input
                  id="name" name="name" type="text" required
                  className="form-input" placeholder="Votre nom"
                  value={formState.name} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email" name="email" type="email" required
                  className="form-input" placeholder="votre@email.com"
                  value={formState.email} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" required rows={5}
                  className="form-input form-textarea" placeholder="Votre message..."
                  value={formState.message} onChange={handleChange}
                />
              </div>
              <button type="submit" className="form-submit">
                Envoyer le message ✦
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}