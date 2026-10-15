'use client'

import { useEffect, useState } from 'react'
import { JANELAS } from '@/lib/dados'

const FUSO = 'America/Fortaleza' // São Luís: UTC−3, sem horário de verão
const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

function agoraEmSaoLuis() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: FUSO, weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false,
  }).formatToParts(new Date())
  const pega = (t: string) => partes.find((p) => p.type === t)?.value ?? ''
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(pega('weekday'))
  const hora = Number(pega('hour')) % 24
  const minuto = Number(pega('minute'))
  return { dia, minutos: hora * 60 + minuto, hora, minuto }
}

const hm = (m: number) => {
  const h = Math.floor(m / 60)
  const mm = m % 60
  return mm ? `${h}h${String(mm).padStart(2, '0')}` : `${h}h`
}

export function situacao(dia: number, minutos: number) {
  const hoje = JANELAS[dia]
  if (hoje && minutos >= hoje[0] && minutos < hoje[1]) {
    return { aberto: true, texto: `Aberto agora, até as ${hm(hoje[1])}` }
  }
  if (hoje && minutos < hoje[0]) return { aberto: false, texto: `Fechado agora. Abre hoje às ${hm(hoje[0])}` }
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7
    const j = JANELAS[d]
    if (j) {
      const quando = i === 1 ? 'amanhã' : DIAS[d]
      return { aberto: false, texto: `Fechado agora. Abre ${quando} às ${hm(j[0])}` }
    }
  }
  return { aberto: false, texto: 'Fechado agora' }
}

function useMinuto() {
  const [agora, setAgora] = useState<ReturnType<typeof agoraEmSaoLuis> | null>(null)
  useEffect(() => {
    const tique = () => setAgora(agoraEmSaoLuis())
    tique()
    const id = setInterval(tique, 30_000)
    return () => clearInterval(id)
  }, [])
  return agora
}

/** "Aberto agora, até as 18h". Antes do script, mostra o horário fixo. */
export function Situacao({ className, reserva }: { className?: string; reserva: string }) {
  const agora = useMinuto()
  if (!agora) return <p className={className}>{reserva}</p>
  const s = situacao(agora.dia, agora.minutos)
  return (
    <p className={className} data-aberto={s.aberto ? 'sim' : 'nao'} aria-live="polite">
      {s.texto}
    </p>
  )
}

/** A hora de São Luís, para o rodapé. */
export function Relogio() {
  const agora = useMinuto()
  if (!agora) return <span>—</span>
  return (
    <time>
      {String(agora.hora).padStart(2, '0')}:{String(agora.minuto).padStart(2, '0')}
    </time>
  )
}
