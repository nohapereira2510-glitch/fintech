import { useState } from 'react'
import { PlayIcon } from '@heroicons/react/24/solid'
import { demo } from '../content'
import { track } from '../lib/analytics'
import { Button } from './shared/Button'
import { Reveal } from './shared/Reveal'
import { SectionHeading } from './shared/SectionHeading'
import { useDemoModal } from '../hooks/useDemoModal'

export function DemoVideo() {
  const [playing, setPlaying] = useState(false)
  const { open } = useDemoModal()

  const play = () => {
    track('video_play', { video: 'product_tour' })
    setPlaying(true)
  }

  return (
    <section id="demo" aria-labelledby="demo-title" className="section-pad">
      <div className="container-default">
        <SectionHeading id="demo-title" eyebrow="Product tour" title="See AggregateIQ in Action" intro={demo.description} />

        <Reveal className="mx-auto mt-12 max-w-[900px]">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-deep shadow-2xl">
            {playing && demo.src ? (
              // Video is only mounted after the click, so nothing loads up front.
              <video className="h-full w-full" controls autoPlay playsInline preload="none">
                <source src={demo.src} type="video/mp4" />
                {demo.captions && <track kind="captions" src={demo.captions} srcLang="en" label="English" default />}
              </video>
            ) : (
              <button
                type="button"
                onClick={play}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white"
                aria-label="Play the 3-minute AggregateIQ product tour"
              >
                <div aria-hidden="true" className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-content shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <PlayIcon className="ml-1 h-9 w-9" aria-hidden="true" />
                </span>
                <span className="relative font-semibold">
                  {playing ? 'Video coming soon. Book a live demo below.' : 'Watch the 3-minute tour'}
                </span>
              </button>
            )}
          </div>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {demo.chapters.map((c) => (
              <li key={c.time} className="flex gap-3 rounded-lg bg-base-200 px-4 py-3 text-sm">
                <span className="font-mono font-semibold text-secondary">{c.time}</span>
                <span>{c.label}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <p className="text-lg font-medium">Ready to see it with your own data?</p>
            <Button trackId="video_schedule_demo" onClick={() => open('video')}>
              Schedule a Personalized Demo
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
