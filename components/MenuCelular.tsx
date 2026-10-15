'use client'

import { useRef } from 'react'

// No celular os links das seções somem do topo; este botão os traz de volta numa lista.
// É um <details>: funciona sem script, e com script fecha sozinho ao tocar num link.
export function MenuCelular({ links, classes }: {
  links: { href: string; rotulo: string }[]
  classes: { menu: string; botao: string; lista: string }
}) {
  const ref = useRef<HTMLDetailsElement>(null)
  return (
    <details ref={ref} className={classes.menu}>
      <summary className={classes.botao}>Menu</summary>
      <nav aria-label="Seções" className={classes.lista}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => ref.current?.removeAttribute('open')}>
            {l.rotulo}
          </a>
        ))}
      </nav>
    </details>
  )
}
