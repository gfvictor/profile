import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'Victor Farias — Desenvolvedor de Software'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function toDataUri(path: string, mime: string) {
  const data = await readFile(join(process.cwd(), path))
  return `data:${mime};base64,${data.toString('base64')}`
}

export default async function Image() {
  const [avatarSrc, logoSrc, kohoRegular, kohoBold] = await Promise.all([
    toDataUri('public/avatar/victor-light.jpg', 'image/jpeg'),
    toDataUri('public/codifylab-logo-og.png', 'image/png'),
    fetch('https://fonts.gstatic.com/s/koho/v18/K2F-fZ5fmddNBik.ttf').then((res) =>
      res.arrayBuffer(),
    ),
    fetch('https://fonts.gstatic.com/s/koho/v18/K2FxfZ5fmddNPpUxWJ4.ttf').then((res) =>
      res.arrayBuffer(),
    ),
  ])

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        fontFamily: 'KoHo',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
        <img
          src={avatarSrc}
          alt="Victor Farias"
          width={380}
          height={380}
          style={{ borderRadius: 32, objectFit: 'cover', border: '6px solid #b38e00' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, fontWeight: 700, color: '#27272a' }}>Victor Farias</div>
          <div style={{ fontSize: 40, fontWeight: 400, color: '#71717a', marginTop: 16 }}>
            Desenvolvedor de Software
          </div>
          <img src={logoSrc} alt="Codify Lab" width={288} height={72} style={{ marginTop: 32 }} />
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'KoHo', data: kohoRegular, weight: 400, style: 'normal' },
        { name: 'KoHo', data: kohoBold, weight: 700, style: 'normal' },
      ],
    },
  )
}
