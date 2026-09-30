import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

// Animates a number once when scrolled into view; renders the final value for reduced motion.
export function CountUp({ value, format = (v) => Math.round(v).toLocaleString('en-US'), duration = 1.2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, { duration, ease: [0.4, 0, 0.2, 1], onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {format(display)}
    </span>
  )
}
