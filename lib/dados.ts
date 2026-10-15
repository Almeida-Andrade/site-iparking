export const URL_SITE = process.env.NEXT_PUBLIC_URL_SITE
  ? process.env.NEXT_PUBLIC_URL_SITE
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

// Preços confirmados pelo dono em 13/10/2026 (mensalidade corrigida para R$ 500 em 15/10/2026). Mudou na cancela, muda aqui.
export const PRECO = {
  primeiraHora: 10,
  horaAdicional: 4,
  diaria: 50,
  mensal: 500,
}

export const LOCAL = {
  predio: 'Galeria A',
  predioCompleto: 'Centro Comercial e Empresarial Galeria A',
  rua: 'Av. dos Sambaquis, 33',
  bairro: 'Calhau',
  cidade: 'São Luís',
  uf: 'MA',
  mapa: 'https://maps.app.goo.gl/WyjpUih4B9enpkms8',
}

// Horário comercial, no fuso de São Luís. dia: 0 = domingo.
// Confirmado pelo dono em 13/10/2026.
export const HORARIO: { dias: string; abre: string | null; fecha: string | null; semana: number[] }[] = [
  { dias: 'Segunda a sexta', abre: '7h30', fecha: '18h', semana: [1, 2, 3, 4, 5] },
  { dias: 'Sábado', abre: '7h30', fecha: '12h', semana: [6] },
  { dias: 'Domingo', abre: null, fecha: null, semana: [0] },
]

// Minutos desde a meia-noite, por dia da semana. Sem entrada = fechado.
export const JANELAS: Record<number, [number, number]> = {
  1: [450, 1080], 2: [450, 1080], 3: [450, 1080], 4: [450, 1080], 5: [450, 1080],
  6: [450, 720],
}

// WhatsApp da operação (confirmado pelo dono em 13/10/2026). Mudou o número, muda aqui.
export const CONTATO = {
  whatsapp: 'https://wa.me/5598984812793',
  mensalista: 'https://wa.me/5598984812793?text=' + encodeURIComponent('Olá! Quero saber sobre a mensalidade da iParking na Galeria A.'),
  rotulo: 'WhatsApp (98) 98481-2793',
}

export const EMPRESA = {
  razao: 'I PARKING LTDA',
  cnpj: '48.466.535/0001-89',
  grupo: 'Grupo Almeida Andrade',
  grupoUrl: 'https://grupoaandrade.com.br',
}

export const real = (v: number) => `R$ ${v.toLocaleString('pt-BR')}`

// Avulso: primeira hora cheia, cada hora seguinte (iniciada) a mais, nunca acima da diária.
export function valorAvulso(horas: number) {
  if (horas <= 0) return 0
  const pelaTabela = PRECO.primeiraHora + Math.max(0, Math.ceil(horas) - 1) * PRECO.horaAdicional
  return Math.min(pelaTabela, PRECO.diaria)
}
