import Image from 'next/image'
import { Situacao, Relogio } from '@/components/Agora'
import { Calculadora } from '@/components/Calculadora'
import { Entradas } from '@/components/Entradas'
import { Fluxo } from '@/components/Fluxo'
import { MarcaI } from '@/components/MarcaI'
import { CONTATO, EMPRESA, HORARIO, LOCAL, PRECO, real } from '@/lib/dados'
import fachada from '@/public/fotos/galeria-a-fachada.jpg'
import fachadaSol from '@/public/fotos/galeria-a-sol.jpg'
import fachadaNublado from '@/public/fotos/galeria-a-nublado.jpg'
import orla from '@/public/fotos/pescadores-litoranea.jpg'
import s from './page.module.css'

const ordem = (n: number) => ({ '--ordem': n }) as React.CSSProperties

const HORARIO_CURTO = 'Seg a sex, 7h30 às 18h · sáb, 7h30 às 12h'

const PLANOS = [
  {
    nome: 'Avulso',
    preco: real(PRECO.primeiraHora),
    periodo: 'a primeira hora',
    linhas: [
      `${real(PRECO.horaAdicional)} cada hora a mais`,
      'Consulta, reunião ou compra na Galeria',
      'A cancela registra a placa e a hora',
    ],
    acao: { rotulo: 'Como chegar', href: LOCAL.mapa },
  },
  {
    nome: 'Diária',
    preco: real(PRECO.diaria),
    periodo: 'por dia',
    linhas: [
      'Um valor fechado para o dia',
      'Quem passa o expediente no Calhau',
      'A cancela registra a placa e a hora',
    ],
    acao: { rotulo: 'Como chegar', href: LOCAL.mapa },
  },
  {
    nome: 'Mensal',
    preco: real(PRECO.mensal),
    periodo: 'por mês',
    linhas: [
      'Um valor fechado para o mês',
      'Quem trabalha na Galeria todo dia',
      'Placa cadastrada: a cancela reconhece o carro',
    ],
    acao: { rotulo: 'Quero ser mensalista', href: CONTATO.mensalista },
    destaque: true,
  },
]

const COMPARA = ['Como cobra', 'Para quem', 'Na entrada']

const DUVIDAS = [
  {
    p: 'Quando vale a diária?',
    r: `Quando você vai ficar 11 horas ou mais. Pela tabela por hora, 11 horas dão ${real(PRECO.diaria)}, o mesmo valor da diária.`,
  },
  {
    p: 'Como funciona a mensalidade?',
    r: `São ${real(PRECO.mensal)} por mês. A placa do carro fica cadastrada e a cancela reconhece o carro na entrada.`,
  },
  {
    p: 'Onde ficam as vagas?',
    r: `No pátio em frente ao prédio e no subsolo da ${LOCAL.predio}, com entrada pela ${LOCAL.rua.replace(', 33', '')}.`,
  },
  {
    p: 'Abre no fim de semana?',
    r: 'Aos sábados, das 7h30 ao meio-dia. Aos domingos não abre.',
  },
  {
    p: 'Tem iParking em outro lugar?',
    r: `Não. A iParking funciona só no ${LOCAL.predioCompleto}, no ${LOCAL.bairro}.`,
  },
]

function Seta() {
  return (
    <svg className={s.seta} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 38 38 10M16 10h22v22" fill="none" stroke="currentColor" strokeWidth="4" />
    </svg>
  )
}

export default function Pagina() {
  return (
    <>
      <Entradas />

      {/* Primeira tela: o quadro de blocos */}
      <header className={s.quadro} id="inicio">
        <div className={s.topo}>
          <a href="#inicio" className={`${s.bloco} ${s.blocoMarca}`} aria-label="iParking, início">
            <MarcaI className={s.marcaPequena} tinta="var(--papel)" />
          </a>
          <nav className={`${s.bloco} ${s.blocoNav}`} aria-label="Principal">
            <a href="#precos">Preços</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#onde-fica">Onde fica</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a href={LOCAL.mapa} className={`${s.bloco} ${s.blocoAcao}`} target="_blank" rel="noopener">
            Como chegar
          </a>
        </div>

        <div className={s.grade}>
          <div className={`${s.bloco} ${s.blocoNome}`}>
            <h1 className={s.nome}>
              <MarcaI className={s.nomeI} />
              <span className="sr-only">i</span>Parking
            </h1>
          </div>

          <figure className={`${s.bloco} ${s.blocoFoto} ${s.obturador}`}>
            <Image src={fachadaNublado} alt="A Galeria A vista da rua, com palmeiras no pátio"
              fill priority sizes="(max-width: 760px) 100vw, 42vw" className={s.foto} />
          </figure>

          <figure className={`${s.bloco} ${s.blocoFoto} ${s.blocoFotoBaixo}`}>
            <Image src={fachadaSol} alt="Fachada de vidro da Galeria A, na Av. dos Sambaquis, com o pátio de vagas na frente"
              fill sizes="(max-width: 760px) 100vw, 58vw" className={s.foto} />
          </figure>

          <div className={s.dupla}>
            <p className={`${s.bloco} ${s.blocoEscuro}`}>
              Estacionamento rotativo no pátio e no subsolo da {LOCAL.predio}, no {LOCAL.bairro}.
            </p>
            <div className={`${s.bloco} ${s.blocoVerde}`}>
              <p>{real(PRECO.primeiraHora)} a primeira hora. {real(PRECO.horaAdicional)} cada hora a mais.</p>
              <Situacao className={s.situacao} reserva={HORARIO_CURTO} />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Preços */}
        <section id="precos" className={s.precos} aria-labelledby="titulo-precos">
          <table className={s.tabela}>
            <caption className="sr-only">Preços da iParking</caption>
            <thead>
              <tr>
                <th scope="col" className={s.cantoTitulo}>
                  <h2 id="titulo-precos" className={s.tituloSecao}>Quanto custa</h2>
                </th>
                {PLANOS.map((p) => (
                  <th key={p.nome} scope="col" className={p.destaque ? s.colDestaque : undefined}>
                    <span className={s.planoNome}>{p.nome}</span>
                    <span className={s.planoPreco}>{p.preco}</span>
                    <span className={s.planoPeriodo}>{p.periodo}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARA.map((c, i) => (
                <tr key={c}>
                  <th scope="row">{c}</th>
                  {PLANOS.map((p) => (
                    <td key={p.nome} className={p.destaque ? s.colDestaque : undefined}>{p.linhas[i]}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td />
                {PLANOS.map((p) => (
                  <td key={p.nome} className={p.destaque ? s.colDestaque : undefined}>
                    <a className={s.botao} href={p.acao.href}
                      {...(p.acao.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                      {p.acao.rotulo}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* No celular, cada plano vira um bloco */}
          <div className={s.planosCelular}>
            <h2 className={s.tituloSecao}>Quanto custa</h2>
            {PLANOS.map((p) => (
              <div key={p.nome} className={`${s.planoBloco} ${p.destaque ? s.planoBlocoDestaque : ''}`}>
                <div>
                  <p className={s.planoCelularTopo}>
                    {p.nome}<br />
                    <span>{p.preco}</span>
                  </p>
                  <p className={s.planoCelularPeriodo}>{p.periodo}</p>
                </div>
                <dl>
                  {COMPARA.map((c, i) => (
                    <div key={c}>
                      <dt>{c}</dt>
                      <dd>{p.linhas[i]}</dd>
                    </div>
                  ))}
                </dl>
                <a className={s.botao} href={p.acao.href}
                  {...(p.acao.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                  {p.acao.rotulo}
                </a>
              </div>
            ))}
          </div>

          <Calculadora />
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className={s.como} aria-labelledby="titulo-como">
          <div className={s.comoTexto}>
            <h2 id="titulo-como" className={s.tituloSecao} data-entra style={ordem(0)}>Da rua<br />para a vaga</h2>
            <p data-entra style={ordem(1)}>
              Você chega pela {LOCAL.rua.replace(', 33', '')}, a cancela registra a placa e a hora, e o carro
              fica no pátio ou no subsolo. Na saída, você paga pelo tempo que ficou.
            </p>
          </div>
          <div className={s.comoDesenho}>
            <Fluxo classeLargo={s.fluxoLargo} classeAlto={s.fluxoAlto} />
            <ol className={s.etapas}>
              <li data-entra style={ordem(1)}>
                <strong>Chegue</strong>
                Entrada pela avenida, em frente à {LOCAL.predio}.
              </li>
              <li data-entra style={ordem(3)}>
                <strong>Cancela</strong>
                Ela registra a placa do carro e a hora de entrada.
              </li>
              <li data-entra style={ordem(5)}>
                <strong>Estacione</strong>
                Vagas no pátio da frente e no subsolo do prédio.
              </li>
            </ol>
          </div>
        </section>

        {/* Onde fica */}
        <section id="onde-fica" className={s.onde} aria-labelledby="titulo-onde">
          <div className={s.ondeFoto}>
            <Image src={fachada} alt="A Galeria A com o pátio de estacionamento na frente, palmeiras e o meio-fio pintado de amarelo"
              fill sizes="100vw" className={s.foto} />
          </div>
          <div className={s.cartao}>
            <h2 id="titulo-onde" className={s.cartaoTitulo}>Na {LOCAL.predio}</h2>
            <address className={s.endereco}>
              {LOCAL.rua}, {LOCAL.bairro}<br />
              {LOCAL.cidade} — {LOCAL.uf}
            </address>
            <dl className={s.horario}>
              {HORARIO.map((h) => (
                <div key={h.dias}>
                  <dt>{h.dias}</dt>
                  <dd>{h.abre ? `${h.abre} – ${h.fecha}` : 'Fechado'}</dd>
                </div>
              ))}
            </dl>
            <Situacao className={s.cartaoSituacao} reserva="Horário comercial" />
            <p className={s.endereco}>
              <a href={CONTATO.whatsapp} target="_blank" rel="noopener" className={s.cartaoLink}>{CONTATO.rotulo}</a>
            </p>
            <a href={LOCAL.mapa} className={s.cartaoBotao} target="_blank" rel="noopener">Abrir no mapa</a>
          </div>
        </section>

        {/* Dúvidas */}
        <section id="duvidas" className={s.duvidas} aria-labelledby="titulo-duvidas">
          <div className={s.duvidasTitulo}>
            <h2 id="titulo-duvidas" data-entra>Antes de vir</h2>
          </div>
          {DUVIDAS.map((d) => (
            <div key={d.p} className={s.faixa}>
              <h3 data-entra style={ordem(0)}>{d.p}</h3>
              <p data-entra style={ordem(1)}>{d.r}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Rodapé de blocos */}
      <footer className={s.rodape}>
        <div className={`${s.bloco} ${s.rodapeFrase}`}>
          <p>A iParking é uma empresa do {EMPRESA.grupo}, de São Luís.</p>
          <p className={s.miudo}>
            {EMPRESA.razao} · CNPJ {EMPRESA.cnpj}<br />
            Foto da orla: Lyssuel Calvet, <a href="https://creativecommons.org/licenses/by/2.0/" rel="license noopener" target="_blank">CC BY 2.0</a>, via{' '}
            <a href="https://commons.wikimedia.org/w/index.php?curid=53522645" target="_blank" rel="noopener">Wikimedia Commons</a>
          </p>
        </div>
        <nav className={`${s.bloco} ${s.rodapeNav}`} aria-label="Rodapé">
          <a href="#precos">Preços</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#onde-fica">Onde fica</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <div className={`${s.bloco} ${s.rodapeHora}`}>
          <Image src={orla} alt="Escultura de três pescadores puxando a rede, na orla de São Luís"
            fill sizes="(max-width: 760px) 50vw, 17vw" className={s.foto} />
          <p className={s.rodapeHoraTexto}>São Luís, <Relogio /></p>
        </div>
        <a href={EMPRESA.grupoUrl} className={`${s.bloco} ${s.rodapeGrupo}`}>
          <span>Conheça o {EMPRESA.grupo}</span>
        </a>
        <div className={`${s.bloco} ${s.rodapeNome}`} aria-hidden="true">
          <MarcaI className={s.rodapeI} tinta="var(--papel)" />Parking
        </div>
        <a href={LOCAL.mapa} className={`${s.bloco} ${s.rodapeAcao}`} target="_blank" rel="noopener">
          <span>Como chegar à {LOCAL.predio}</span>
          <Seta />
        </a>
      </footer>
    </>
  )
}
