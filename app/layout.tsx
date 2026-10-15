import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { URL_SITE } from '@/lib/dados'
import './globals.css'

const fonte = Bricolage_Grotesque({
  subsets: ['latin'], weight: ['400', '500', '600'], variable: '--fonte', display: 'swap',
})

const TITULO = 'iParking — Estacionamento da Galeria A, no Calhau'
const DESCRICAO =
  'Estacionamento rotativo no subsolo da Galeria A, Av. dos Sambaquis, Calhau, São Luís. ' +
  'R$ 10 a primeira hora, R$ 4 a hora adicional, diária de R$ 50 e mensalidade de R$ 500.'

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: { default: TITULO, template: '%s · iParking' },
  description: DESCRICAO,
  applicationName: 'iParking',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'iParking',
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#D9DAD5' }

// Liga as entradas animadas só quando há script: sem ele, tudo aparece de saída.
const LIGA_JS = "document.documentElement.classList.add('js')"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fonte.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LIGA_JS }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
