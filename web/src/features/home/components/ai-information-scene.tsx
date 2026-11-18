/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useId } from 'react'

import { useSystemConfig } from '@/hooks/use-system-config'
import { getLobeIcon } from '@/lib/lobe-icon'

import '@/styles/jackey-ai-scenes.css'

const stars = Array.from({ length: 180 }, (_, i) => {
  const angle = i * 2.399963
  const radius = 35 + Math.sqrt(i / 180) * 195
  return {
    x: 300 + Math.cos(angle) * radius,
    y: 260 + Math.sin(angle) * radius * 0.82,
    radius: i % 7 === 0 ? 2 : 0.9,
    opacity: 0.25 + (i % 6) * 0.12,
  }
})

const modelBrands = [
  { name: 'OpenAI / GPT', icon: 'OpenAI', angle: -105 },
  { name: 'Gemini', icon: 'Gemini.Color', angle: -45 },
  { name: 'Claude', icon: 'Claude.Color', angle: 15 },
  { name: 'Google Cloud', icon: 'GoogleCloud.Color', angle: 75 },
  { name: 'AWS', icon: 'Aws.Color', angle: 135 },
  { name: 'Azure', icon: 'Azure.Color', angle: 195 },
]

export function AIInformationScene() {
  const id = useId().replaceAll(':', '')
  const { logo, systemName } = useSystemConfig()
  const paint = (name: string) => `url(#${id}-${name})`

  return (
    <div className='ai-nebula-scene relative aspect-[600/520] w-full overflow-hidden'>
      <svg
        aria-hidden='true'
        viewBox='0 0 600 520'
        fill='none'
        className='absolute inset-0 h-full w-full'
      >
        <defs>
          <radialGradient id={`${id}-aura`}>
            <stop stopColor='#20d7c0' stopOpacity='.18' />
            <stop offset='1' stopColor='#20d7c0' stopOpacity='0' />
          </radialGradient>
        </defs>
        <ellipse cx='300' cy='260' rx='260' ry='235' fill={paint('aura')} />
        <g>
          <g className='ai-scene-cloud'>
            {stars.map((star, i) => (
              <circle
                key={`${star.x}-${star.y}`}
                cx={star.x}
                cy={star.y}
                r={star.radius}
                fill={
                  i % 4 === 0
                    ? 'var(--nebula-star-accent)'
                    : 'var(--nebula-star)'
                }
                opacity={star.opacity}
              />
            ))}
            {stars
              .filter((_, i) => i % 6 === 0)
              .map((star, i, selected) => (
                <path
                  key={`${star.x}-${star.y}`}
                  d={`M${star.x} ${star.y} L${selected[(i + 3) % selected.length].x} ${selected[(i + 3) % selected.length].y}`}
                  stroke='var(--nebula-mesh)'
                  strokeWidth='var(--nebula-mesh-width)'
                  opacity='var(--nebula-mesh-opacity)'
                />
              ))}
          </g>
          <ellipse
            cx='300'
            cy='260'
            rx='180'
            ry='75'
            transform='rotate(-28 300 260)'
            stroke='var(--nebula-orbit)'
            opacity='var(--nebula-orbit-primary-opacity)'
          />
          <ellipse
            cx='300'
            cy='260'
            rx='100'
            ry='180'
            transform='rotate(-28 300 260)'
            stroke='var(--nebula-orbit)'
            opacity='var(--nebula-orbit-secondary-opacity)'
          />
          <g
            className='ai-nebula-light-orbit'
            stroke='var(--nebula-light)'
            strokeWidth='1.5'
            strokeDasharray='3 260'
            opacity='.8'
          >
            <ellipse
              cx='300'
              cy='260'
              rx='180'
              ry='75'
              transform='rotate(-28 300 260)'
            />
            <ellipse
              cx='300'
              cy='260'
              rx='100'
              ry='180'
              transform='rotate(-28 300 260)'
            />
          </g>
          <circle cx='300' cy='260' r='56' fill={paint('aura')} />
        </g>
      </svg>
      <div className='ai-brand-orbit absolute inset-[10%]'>
        {modelBrands.map((brand) => (
          <div
            key={brand.name}
            className='absolute -translate-x-1/2 -translate-y-1/2'
            style={{
              left: `${50 + Math.cos((brand.angle * Math.PI) / 180) * 46}%`,
              top: `${50 + Math.sin((brand.angle * Math.PI) / 180) * 46}%`,
            }}
          >
            <span
              role='img'
              aria-label={brand.name}
              title={brand.name}
              className='ai-brand-upright text-foreground flex size-10 items-center justify-center sm:size-12'
            >
              <span
                aria-hidden='true'
                className='ai-brand-symbol flex size-7 items-center justify-center sm:size-9'
              >
                {getLobeIcon(brand.icon, 32)}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2'>
        <img src={logo} alt='' className='size-12 object-contain sm:size-14' />
        <span className='text-base font-semibold tracking-tight'>
          {systemName}
        </span>
        <span className='text-muted-foreground -mt-1 font-mono text-[10px] tracking-[.2em]'>
          UNIFIED API
        </span>
      </div>
    </div>
  )
}
