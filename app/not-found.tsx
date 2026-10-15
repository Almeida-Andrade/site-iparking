import Link from 'next/link'

export default function NaoEncontrada() {
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '120px 24px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>
        Esta vaga não existe
      </h1>
      <p style={{ marginTop: 16 }}>O endereço pode ter mudado. O estacionamento continua na Galeria A.</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/" style={{ fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Voltar para o início
        </Link>
      </p>
    </main>
  )
}
