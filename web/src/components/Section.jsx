export default function Section({ id, eyebrow, title, intro, className = '', children }) {
  const headingId = id ? `${id}-heading` : undefined
  return (
    <section id={id} aria-labelledby={headingId} className={`px-4 py-20 sm:px-6 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <header className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-5 text-lg text-base-content/75">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
