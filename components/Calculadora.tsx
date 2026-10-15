'use client'

import { useId, useState } from 'react'
import { PRECO, real, valorAvulso } from '@/lib/dados'
import s from './Calculadora.module.css'

const DIAS_UTEIS = 22
const MAX_HORAS = 11 // onze horas pela tabela já dão a diária

export function Calculadora() {
  const [horas, setHoras] = useState(2)
  const id = useId()
  const valor = valorAvulso(horas)
  const naDiaria = valor >= PRECO.diaria
  const noMes = valor * DIAS_UTEIS
  const mensalCompensa = noMes > PRECO.mensal

  const conta = naDiaria
    ? `Chegou ao valor da diária: ${real(PRECO.diaria)} cobre o dia.`
    : horas === 1
      ? `Só a primeira hora.`
      : `${real(PRECO.primeiraHora)} da primeira hora + ${horas - 1} × ${real(PRECO.horaAdicional)}.`

  const muda = (n: number) => setHoras(Math.min(MAX_HORAS, Math.max(1, n)))

  return (
    <div className={s.calculadora}>
      <div className={s.controle} data-entra style={{ '--ordem': 0 } as React.CSSProperties}>
        <h3 className={s.titulo}>Quanto vou pagar?</h3>
        <label htmlFor={id} className={s.pergunta}>
          Vou ficar <strong>{horas} {horas === 1 ? 'hora' : 'horas'}</strong>
        </label>
        <div className={s.linha}>
          <button type="button" className={s.passo} onClick={() => muda(horas - 1)} disabled={horas <= 1}
            aria-label="Uma hora a menos">−</button>
          <input
            id={id}
            className={s.trilho}
            type="range"
            min={1}
            max={MAX_HORAS}
            step={1}
            value={horas}
            onChange={(e) => muda(Number(e.target.value))}
          />
          <button type="button" className={s.passo} onClick={() => muda(horas + 1)} disabled={horas >= MAX_HORAS}
            aria-label="Uma hora a mais">+</button>
        </div>
      </div>

      <output htmlFor={id} className={s.resultado} data-entra style={{ '--ordem': 1 } as React.CSSProperties}
        aria-live="polite">
        <span className={s.valor}>{real(valor)}</span>
        <span className={s.conta}>{conta}</span>
      </output>

      <p className={s.mes} data-entra data-compensa={mensalCompensa ? 'sim' : 'nao'}
        style={{ '--ordem': 2 } as React.CSSProperties}>
        Assim em {DIAS_UTEIS} dias úteis, o mês sai por <strong>{real(noMes)}</strong>.{' '}
        {mensalCompensa
          ? `A mensalidade de ${real(PRECO.mensal)} fica mais em conta.`
          : `Abaixo da mensalidade de ${real(PRECO.mensal)}: o avulso compensa.`}
      </p>
    </div>
  )
}
