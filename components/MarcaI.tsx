// O "i" do logo da iParking: a haste preta traz recortada a vela da marca da Galeria A,
// com o pingo azul por cima. Redesenhado do logo oficial (coordenadas do arquivo 1754×1241).
export function MarcaI({ className, tinta = 'var(--tinta)' }: { className?: string; tinta?: string }) {
  return (
    <svg className={className} viewBox="110 296 168 460" aria-hidden="true" focusable="false">
      <ellipse cx="217" cy="353" rx="57" ry="55" fill="var(--azul)" />
      <path
        fill={tinta}
        fillRule="evenodd"
        d="M160 458H273V754H160Z M195 607C214 652 238 716 271 754H186C201 744 206 724 198 702C191 684 181 668 174 654Z"
      />
      <path fill={tinta} d="M115 754C130 749 140 739 143 726C145 740 151 750 159 754Z" />
    </svg>
  )
}
