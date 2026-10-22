import { Link } from 'react-router-dom'
import { Logo } from '../components/shared/Logo'

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo />
      <h1 className="font-serif text-5xl">Page not found</h1>
      <p className="text-base-content/75">The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className="btn btn-primary h-12 px-8 text-base">
        Go to the homepage
      </Link>
    </main>
  )
}
