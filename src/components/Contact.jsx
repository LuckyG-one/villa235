import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT_EMAIL } from "../data/villa.js";

export default function Contact() {
  const { t } = useI18n();
  const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });

  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("VILLA235 — bezichtiging / informatie");
    const body = encodeURIComponent(
      `Naam: ${data.name}\nE-mail: ${data.email}\nTelefoon: ${data.phone}\n\n${data.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact section" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-intro reveal">
          <p className="eyebrow">{t("contact.eyebrow")}</p>
          <h2 className="contact-title">{t("contact.title")}</h2>
          <p className="contact-text">{t("contact.text")}</p>
          <p className="contact-direct">
            {t("contact.or")}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>

        <form className="contact-form reveal" onSubmit={onSubmit}>
          <label className="field">
            <span>{t("contact.name")}</span>
            <input name="name" value={data.name} onChange={onChange} required autoComplete="name" />
          </label>
          <label className="field">
            <span>{t("contact.email")}</span>
            <input name="email" type="email" value={data.email} onChange={onChange} required autoComplete="email" />
          </label>
          <label className="field">
            <span>{t("contact.phone")}</span>
            <input name="phone" value={data.phone} onChange={onChange} autoComplete="tel" />
          </label>
          <label className="field">
            <span>{t("contact.message")}</span>
            <textarea
              name="message"
              rows="4"
              value={data.message}
              onChange={onChange}
              placeholder={t("contact.message.ph")}
            />
          </label>
          <button type="submit" className="btn btn-primary">{t("contact.send")}</button>
        </form>
      </div>
    </section>
  );
}
