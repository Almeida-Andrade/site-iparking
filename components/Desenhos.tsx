// Desenhos da iParking, em formas chapadas com as cores do logo.
// São esquemas, não plantas: mostram o caminho (rua, cancela, subsolo) e que só o subsolo é da iParking;
// o pátio da frente é público.

// Um carro visto de lado, 120 × 55, com a frente para a direita.
function Carro({ x, y, cor, escala = 1 }: { x: number; y: number; cor: string; escala?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`}>
      <path d="M0 34Q0 22 12 22H28L44 4Q47 0 52 0H84Q89 0 92 4L106 22H112Q120 22 120 32V44H0Z" fill={cor} />
      <path d="M50 6H82L94 20H40Z" fill="var(--tinta)" opacity="0.5" />
      <rect x="64" y="6" width="4" height="14" fill={cor} />
      <circle cx="26" cy="44" r="10" fill="var(--tinta)" stroke={cor} strokeWidth="4" />
      <circle cx="94" cy="44" r="10" fill="var(--tinta)" stroke={cor} strokeWidth="4" />
    </g>
  )
}

const CHAO = 'var(--cinza-2)'

export function PictoChegue({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 180" aria-hidden="true" focusable="false">
      <rect x="0" y="142" width="300" height="6" rx="3" fill={CHAO} />
      <rect x="6" y="100" width="26" height="5" rx="2.5" fill={CHAO} />
      <rect x="14" y="114" width="20" height="5" rx="2.5" fill={CHAO} />
      <rect x="2" y="128" width="30" height="5" rx="2.5" fill={CHAO} />
      <Carro x={44} y={87} cor="var(--cinza)" />
      <path d="M192 112H262M244 94L264 112L244 130" fill="none" stroke="var(--verde)" strokeWidth="9"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PictoCancela({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 180" aria-hidden="true" focusable="false">
      <rect x="0" y="142" width="300" height="6" rx="3" fill={CHAO} />
      {/* O leitor no poste lê a placa: o feixe vai até a frente do carro */}
      <path d="M204 62L146 108V124Z" fill="var(--azul)" opacity="0.45" />
      <Carro x={22} y={87} cor="var(--cinza)" />
      {/* O braço levantado: a cancela abriu */}
      <g transform="rotate(35 213 84)">
        <rect x="100" y="78" width="120" height="12" rx="6" fill="var(--papel)" />
        <rect x="116" y="78" width="16" height="12" fill="var(--verde)" />
        <rect x="148" y="78" width="16" height="12" fill="var(--verde)" />
        <rect x="180" y="78" width="16" height="12" fill="var(--verde)" />
      </g>
      <rect x="204" y="70" width="18" height="74" rx="3" fill="var(--papel)" />
      <rect x="196" y="54" width="34" height="18" rx="4" fill="var(--azul)" />
    </svg>
  )
}

export function PictoSubsolo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 180" aria-hidden="true" focusable="false">
      {/* O prédio em cima, o chão, e o subsolo verde embaixo */}
      <rect x="132" y="10" width="150" height="52" rx="3" fill="#2A2C30" />
      {[0, 1].map((l) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${l}-${c}`} x={142 + c * 27} y={18 + l * 20} width="20" height="12" rx="2" fill={CHAO} opacity="0.55" />
        )),
      )}
      <rect x="0" y="62" width="300" height="6" rx="3" fill={CHAO} />
      <path d="M56 6V46M40 32L56 50L72 32" fill="none" stroke="var(--papel)" strokeWidth="8"
        strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="80" width="280" height="96" rx="6" fill="var(--verde)" />
      <Carro x={26} y={112} cor="var(--tinta)" escala={0.95} />
      <Carro x={158} y={112} cor="var(--tinta)" escala={0.95} />
    </svg>
  )
}

// O corte da Galeria A: rua à esquerda, pátio público na frente, prédio, e o subsolo da iParking embaixo.
export function Corte({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 500" role="img" focusable="false"
      aria-label="Desenho em corte da Galeria A: a rua, o pátio da frente, que é público, o prédio e, embaixo dele, o subsolo com as vagas da iParking">
      {/* Prédio: quatro andares de vidro */}
      <rect x="640" y="40" width="540" height="240" rx="4" fill="#2A2C30" />
      {[0, 1, 2, 3].map((l) =>
        Array.from({ length: 9 }, (_, c) => (
          <rect key={`${l}-${c}`} x={664 + c * 56} y={58 + l * 54} width="42" height="34" rx="3" fill={CHAO} opacity="0.5" />
        )),
      )}
      {/* Rua e pátio, no nível do chão */}
      <rect x="0" y="232" width="250" height="48" fill="#2A2C30" />
      <Carro x={60} y={210} cor="var(--cinza)" />
      <Carro x={320} y={210} cor="var(--cinza-2)" />
      <Carro x={470} y={210} cor="var(--cinza-2)" />
      <rect x="0" y="276" width="1200" height="8" rx="4" fill={CHAO} />
      {/* A descida para o subsolo */}
      <path d="M210 250C262 250 262 320 296 352" fill="none" stroke="var(--papel)" strokeWidth="10" strokeLinecap="round" />
      <path d="M268 352L300 356L290 326" fill="none" stroke="var(--papel)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      {/* O subsolo: a iParking */}
      <rect x="320" y="304" width="860" height="176" rx="8" fill="var(--verde)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Carro key={i} x={360 + i * 162} y={392} cor="var(--tinta)" />
      ))}
    </svg>
  )
}
