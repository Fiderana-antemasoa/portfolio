import { useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiPhone, FiMail } from 'react-icons/fi'
import './Contact.css'

export default function Contact() {
  console.log('CONTACT CSS CHARGE')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [sent, setSent] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="contact section">
      <div className="section-inner contact__inner">
        <div className="contact__header reveal">
          <p className="section-eyebrow">✦ Contact</p>

          <h2 className="section-title">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>

          <p className="contact__desc">
            Un projet en tête ? Une collaboration ? Ou juste envie de dire bonjour ?
            Je suis toujours ravie d'échanger. ✿
          </p>
        </div>

        <div
          className="contact__form-wrap reveal"
          style={{ transitionDelay: '0.15s' }}
        >
          {sent ? (
            <div className="contact__success">
              <span>🌸</span>
              <h3>Message envoyé !</h3>
              <p>Merci, je reviens vers vous très vite.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Nom
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Votre nom"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="votre@email.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="form-input form-textarea"
                  placeholder="Votre message..."
                  value={formState.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="form-submit">
                Envoyer le message ✦
              </button>
            </form>
          )}
        </div>

        <div
          className="contact__socials reveal"
          style={{ transitionDelay: '0.3s' }}
        >
          {[
            {
              icon: <FaGithub />,
              label: 'GitHub',
              href: 'https://github.com/Fiderana-antemasoa',
              external: true,
            },
            {
              icon: <FaLinkedin />,
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/fiderana-rakotonjanahary-7581a4403',
              external: true,
            },
            {
              icon: <FiPhone />,
              label: 'Téléphone',
              href: 'tel:+261327640693',
              external: false,
            },
            {
              icon: <FiMail />,
              label: 'Email',
              href: 'mailto:fideranasrakotonjanahary@gmail.com',
              external: false,
            },
          ].map(({ icon, label, href, external }) => (
            <a
              key={label}
              href={href}
              className="contact__social"
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              <span className="contact__social-icon">{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}