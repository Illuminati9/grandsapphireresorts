import { faqItems } from "@/data/faq";
import { bookingLinkProps } from "@/data/booking";
import { translate, type Locale } from "@/i18n/messages";

/** Server-rendered so every answer is plain HTML for visitors and crawlers. */
export function FaqSection({ locale }: { locale: Locale }) {
  return (
    <section id="faq" className="mx-auto max-w-content px-md sm:px-lg py-16 lg:py-20" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title text-deep-forest">{translate(locale, "Frequently Asked Questions")}</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {faqItems(locale).map(item => (
          <div key={item.question}>
            <h3 className="font-headline text-xl text-deep-forest mb-2">{item.question}</h3>
            <p className="text-on-surface-variant text-body-md">{item.answer}</p>
            {item.link && (
              <a {...bookingLinkProps(item.link.href)} className="mt-3 inline-flex text-deep-forest underline underline-offset-4 hover:text-antique-gold focus-ring">
                {item.link.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
