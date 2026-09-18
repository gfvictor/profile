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
  const [photoSrc, logoSrc, kohoRegular, kohoBold, jetbrainsMono] = await Promise.all([
    toDataUri('public/avatar/victor-light.jpg', 'image/jpeg'),
    toDataUri('public/codifylab-logo-og.png', 'image/png'),
    fetch('https://fonts.gstatic.com/s/koho/v18/K2F-fZ5fmddNBik.ttf').then((res) =>
      res.arrayBuffer(),
    ),
    fetch('https://fonts.gstatic.com/s/koho/v18/K2FxfZ5fmddNPpUxWJ4.ttf').then((res) =>
      res.arrayBuffer(),
    ),
    fetch(
      'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPg.woff',
    ).then((res) => res.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#fafafa',
          fontFamily: 'KoHo',
        }}
      >
        <img
          src={photoSrc}
          alt="Victor Farias"
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            left: '38%',
            top: 0,
            width: '62%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '38%',
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            backgroundImage: 'linear-gradient(100deg, #fafafa 0%, rgba(250,250,250,0) 35%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '38%',
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            backgroundImage: 'linear-gradient(0deg, #fafafa 0%, rgba(250,250,250,0) 40%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 7,
            display: 'flex',
            backgroundColor: '#b38e00',
          }}
        />

        <img
          src={logoSrc}
          alt="Codify Lab"
          width={190}
          height={40}
          style={{ position: 'absolute', left: '6%', top: '8%' }}
        />

        <div
          style={{
            position: 'absolute',
            left: '6%',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '56%',
          }}
        >
          <div style={{ display: 'flex', fontWeight: 700, fontSize: 64, color: '#27272a' }}>
            Victor Farias.
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 12,
              fontWeight: 500,
              fontSize: 24,
              color: '#27272a',
            }}
          >
            <span style={{ display: 'flex' }}>software developer.</span>
            <span style={{ display: 'flex' }}>web designer.</span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: '6%',
            bottom: '8%',
            display: 'flex',
            maxWidth: '56%',
            fontFamily: 'JetBrainsMono',
            fontSize: 17,
          }}
        >
          <span style={{ display: 'flex', color: '#b38e00', marginRight: 6 }}>{'>'}</span>
          <span style={{ display: 'flex', color: '#71717a' }}>
            construindo ecossistemas digitais.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'KoHo', data: kohoRegular, weight: 400, style: 'normal' },
        { name: 'KoHo', data: kohoBold, weight: 700, style: 'normal' },
        { name: 'JetBrainsMono', data: jetbrainsMono, weight: 400, style: 'normal' },
      ],
    },
  )
}
