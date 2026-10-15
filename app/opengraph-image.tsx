import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'iParking — estacionamento da Galeria A, no Calhau'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Imagem() {
  const logo = await readFile(join(process.cwd(), 'public/marca/iparking.png'))
  const src = `data:image/png;base64,${logo.toString('base64')}`
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', background: '#D9DAD5', padding: 24, gap: 16,
        }}
      >
        <div style={{ display: 'flex', flex: 1, background: '#FFFFFF', borderRadius: 6, alignItems: 'center', paddingLeft: 64 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={720} height={258} alt="" />
        </div>
        <div style={{ display: 'flex', gap: 16, height: 150 }}>
          <div style={{ display: 'flex', flex: 1, background: '#121315', color: '#FFFFFF', borderRadius: 6, padding: 28, fontSize: 34 }}>
            Estacionamento da Galeria A, no Calhau
          </div>
          <div style={{ display: 'flex', flex: 1, background: '#019A48', color: '#121315', borderRadius: 6, padding: 28, fontSize: 34 }}>
            R$ 10 a primeira hora
          </div>
        </div>
      </div>
    ),
    size,
  )
}
