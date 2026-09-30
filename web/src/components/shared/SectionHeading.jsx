import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, intro, id, align = 'center', inverse = false }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <Reveal className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.14em] mb-3 ${inverse ? 'text-gold' : 'text-secondary'}`}>{eyebrow}</p>
      )}
      <h2 id={id} className="font-serif text-[28px] md:text-4xl lg:text-[40px] leading-tight">
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${inverse ? 'text-white/80' : 'text-base-content/75'}`}>{intro}</p>}
    </Reveal>
  )
}
