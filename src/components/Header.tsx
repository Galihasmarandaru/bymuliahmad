import { useCallback } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}

export function smoothScrollToTop(duration = 400) {
  const start = window.scrollY
  if (start === 0) return
  let startTime: number | null = null

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, start * (1 - easeInOutQuart(progress)))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

function smoothScroll(targetId: string, duration = 400) {
  const el = document.getElementById(targetId)
  if (!el) return

  const start = window.scrollY
  const end = el.getBoundingClientRect().top + window.scrollY
  const distance = end - start
  let startTime: number | null = null

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, start + distance * easeInOutQuart(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

const SCROLL_DURATION = 800

function NavLink({
  to,
  hash,
  children,
}: {
  to: string
  hash?: string
  children: React.ReactNode
}) {
  const navigate = useNavigate()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const isSamePage = window.location.pathname === to

      if (hash) {
        const el = document.getElementById(hash)
        if (el) {
          e.preventDefault()
          smoothScroll(hash, SCROLL_DURATION)
          navigate({ to, hash, replace: true })
        }
      } else if (isSamePage) {
        e.preventDefault()
        smoothScrollToTop(SCROLL_DURATION)
      }
    },
    [hash, to, navigate],
  )

  return (
    <Link
      to={to}
      hash={hash}
      onClick={handleClick}
      className="nav-link"
      activeProps={{ className: 'nav-link is-active' }}
    >
      {children}
    </Link>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center justify-center gap-4 py-4 sm:py-6">
        <div className="flex items-center gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/" hash="contact">About</NavLink>
          <NavLink to="/works">Works</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </nav>
    </header>
  )
}