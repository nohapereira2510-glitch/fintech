import { motion } from 'framer-motion'

// Fade + slide up when the element enters the viewport. MotionConfig in App
// turns this into a plain fade-free render for reduced-motion users.
export function Reveal({ children, delay = 0, as = 'div', className = '', x = 0 }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: x ? 0 : 20, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </Component>
  )
}
