// Muitos em um: os carros chegam soltos (esquerda), passam em fila pela cancela (meio)
// e terminam em fileiras, como as vagas do pátio (direita). Um quadrado = um carro.
// Desenho determinístico: a mesma semente dá sempre o mesmo espalhamento (sem diferença entre servidor e navegador).

type Q = { x: number; y: number; zona: 0 | 1 | 2; tom: 0 | 1 }

function semente(n: number) {
  return () => {
    n |= 0; n = (n + 0x6d2b79f5) | 0
    let t = Math.imul(n ^ (n >>> 15), 1 | n)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const L = 12 // lado do quadrado
const W = 1350
const H = 300

function quadrados(): Q[] {
  const r = semente(48466535)
  const qs: Q[] = []
  // Soltos: 42 carros espalhados no primeiro terço, em dois tons claros.
  for (let i = 0; i < 42; i++) {
    qs.push({ x: 8 + r() * 400, y: 16 + r() * (H - 32 - L), zona: 0, tom: r() > 0.5 ? 1 : 0 })
  }
  // Fila: três de altura, apertados, no terço do meio.
  for (let c = 0; c < 20; c++) {
    for (let l = 0; l < 3; l++) {
      qs.push({ x: 468 + c * 21, y: H / 2 - 22 + l * 16, zona: 1, tom: 1 })
    }
  }
  // Vagas: fileiras alinhadas no último terço, no verde da marca.
  for (let l = 0; l < 5; l++) {
    for (let c = 0; c < 8; c++) {
      qs.push({ x: 940 + c * 52, y: 34 + l * 54, zona: 2, tom: 1 })
    }
  }
  return qs
}

const QS = quadrados()
const COR = ['var(--cinza)', 'var(--cinza-2)']

function Desenho({ vertical, className }: { vertical: boolean; className: string }) {
  // No celular o desenho gira: de cima para baixo em vez da esquerda para a direita.
  const vb = vertical ? `0 0 ${H} ${W}` : `0 0 ${W} ${H}`
  return (
    <svg className={className} viewBox={vb} role="img"
      aria-label="Carros chegando soltos, passando em fila pela cancela e estacionados em fileiras">
      {[0, 1, 2].map((z) => (
        <g key={z} data-entra style={{ '--ordem': z * 2 } as React.CSSProperties}>
          {QS.filter((q) => q.zona === z).map((q, i) => (
            <rect key={i} x={vertical ? q.y : q.x} y={vertical ? q.x : q.y} width={L} height={L} rx={2}
              fill={z === 2 ? 'var(--verde)' : COR[q.tom]} />
          ))}
        </g>
      ))}
    </svg>
  )
}

export function Fluxo({ classeLargo, classeAlto }: { classeLargo: string; classeAlto: string }) {
  return (
    <>
      <Desenho vertical={false} className={classeLargo} />
      <Desenho vertical className={classeAlto} />
    </>
  )
}
