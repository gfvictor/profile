'use client'

import Image from 'next/image'
import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })

const MENU_ITEMS = [
  {
    name: 'Burger da Casa',
    desc: 'Blend 160g, queijo, molho da casa, picles.',
    price: '¥900',
    image: '/models/basic/burger-dark.webp',
  },
  {
    name: 'Cheddar Duplo',
    desc: 'Dois blends, cheddar cremoso, bacon.',
    price: '¥1.150',
    image: '/models/basic/burger-hand.webp',
  },
  {
    name: 'Batata Rústica',
    desc: 'Casca grossa, temperinho da casa.',
    price: '¥450',
    image: '/models/basic/fries.webp',
  },
  {
    name: 'Milkshake Artesanal',
    desc: 'Baunilha ou chocolate, chantilly.',
    price: '¥680',
    image: '/models/basic/shake.webp',
  },
]

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.07c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.51-.09.19-.14.3-.28.47-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.23 1.38.27.14.43.12.59-.05.16-.17.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.43.19.5.3.07.11.07.62-.17 1.3z" />
    </svg>
  )
}

export function FumacaTruckPreview() {
  return (
    <div className="w-full bg-[#211E1A] text-[#F5EFE4]">
      <div className="relative flex h-[420px] flex-col justify-end">
        <Image src="/models/basic/hero.webp" alt="" fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211E1A] from-5% via-[#211E1A]/75 via-60% to-transparent to-90%" />
        <div className="relative z-10 flex flex-col gap-2.5 p-6 pb-7">
          <span className="text-[.68rem] font-bold tracking-[0.2em] text-[#D8592E] uppercase">
            food truck
          </span>
          <h1
            className={`${bebasNeue.className} text-[3.4rem] leading-[0.85] tracking-wide text-balance`}
          >
            FUM<span className="text-[#D8592E]">A</span>ÇA
          </h1>
          <p className="max-w-[30ch] text-sm text-[#D9CFBE]">
            Sabor de rua, direto na chapa. Sextas e sábados, sempre no mesmo lugar.
          </p>
          <div className="mt-2 flex flex-wrap gap-2.5">
            <button className="rounded-lg bg-[#D8592E] px-4.5 py-3 text-xs font-bold tracking-wide text-[#211E1A] uppercase">
              ver cardápio
            </button>
            <button className="rounded-lg border-[1.5px] border-[#F5EFE4]/40 px-4.5 py-3 text-xs font-bold tracking-wide text-[#F5EFE4] uppercase">
              chamar no zap
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 px-6 py-10">
        <span className="text-[.68rem] font-bold tracking-[0.2em] text-[#D8592E] uppercase">
          nossa história
        </span>
        <h2 className={`${bebasNeue.className} text-3xl tracking-wide`}>
          Comida de verdade, sem pressa.
        </h2>
        <p className="text-sm leading-relaxed text-[#B4A99A]">
          Começamos numa garagem, testando receita com os vizinhos. Hoje rodamos a cidade inteira —
          mas o lanche continua feito na hora, sempre.
        </p>
      </div>

      <div className="flex flex-col gap-3.5 bg-[#2B2721] px-6 py-10">
        <span className="text-[.68rem] font-bold tracking-[0.2em] text-[#D8592E] uppercase">
          cardápio
        </span>
        <h2 className={`${bebasNeue.className} text-3xl tracking-wide`}>O que sai da chapa</h2>

        {MENU_ITEMS.map((item, i) => (
          <div
            key={item.name}
            className={`flex items-center gap-3.5 py-3.5 ${i < MENU_ITEMS.length - 1 ? 'border-b border-[#F5EFE4]/[0.08]' : ''}`}
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px]">
              <Image src={item.image} alt="" fill className="object-cover" unoptimized />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className={`${bebasNeue.className} text-lg tracking-wide`}>{item.name}</span>
              <span className="text-[.72rem] leading-tight text-[#8F8576]">{item.desc}</span>
            </div>
            <span className="font-bold text-[#D8592E] tabular-nums">{item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 px-6 py-10">
        <span className="text-[.68rem] font-bold tracking-[0.2em] text-[#D8592E] uppercase">
          onde e quando
        </span>
        <h2 className={`${bebasNeue.className} text-3xl tracking-wide`}>Nos encontre</h2>
        <div className="flex items-start gap-2.5 text-sm text-[#B4A99A]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-[#D8592E]"
          >
            <path d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>Praça Central, em frente à estação — mesmo ponto, toda semana.</span>
        </div>
        <div className="mt-1.5">
          <div className="flex justify-between border-b border-[#F5EFE4]/[0.08] py-2.5 text-sm">
            <span className="text-[#B4A99A]">Sex &amp; Sáb</span>
            <span className="font-semibold text-[#F5EFE4]">18h – 23h</span>
          </div>
          <div className="flex justify-between border-b border-[#F5EFE4]/[0.08] py-2.5 text-sm">
            <span className="text-[#B4A99A]">Domingo</span>
            <span className="font-semibold text-[#F5EFE4]">12h – 16h</span>
          </div>
          <div className="flex justify-between py-2.5 text-sm">
            <span className="text-[#B4A99A]">Seg – Qui</span>
            <span className="font-semibold text-[#F5EFE4]">fechado</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3.5 bg-[#D8592E] px-6 py-11 text-center text-[#F5EFE4]">
        <h2 className={`${bebasNeue.className} text-4xl leading-none text-balance`}>
          Bora matar a fome?
        </h2>
        <p className="max-w-[26ch] text-sm text-[#F6DCCF]">
          Chama no WhatsApp e já deixa separado o seu.
        </p>
        <button className="mt-1 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4.5 py-3 text-xs font-bold tracking-wide text-white uppercase">
          <WhatsAppIcon />
          chamar no whatsapp
        </button>
      </div>
      <div className="px-6 py-5 text-center text-[.68rem] text-[#D8592E]">
        Fumaça Truck — feito por CodifyLab
      </div>
    </div>
  )
}
