'use client'

import { useEffect } from 'react'

// Revela as partes marcadas com data-entra quando a seção entra na tela, uma vez só.
export function Entradas() {
  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>('[data-entra]')
    if (!('IntersectionObserver' in window)) {
      alvos.forEach((a) => a.classList.add('dentro'))
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add('dentro')
            obs.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    alvos.forEach((a) => obs.observe(a))
    return () => obs.disconnect()
  }, [])
  return null
}
