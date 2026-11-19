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
import { BarChart3, Settings, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { HeroTerminalDemo } from '../hero-terminal-demo'

export function HowItWorks() {
  const { t } = useTranslation()
  const steps = [
    {
      id: 'configure',
      icon: Settings,
      title: t('Configure'),
      description: t(
        'Add your API keys, set up channels and configure access permissions'
      ),
    },
    {
      id: 'connect',
      icon: Zap,
      title: t('Connect'),
      description: t(
        'Connect through OpenAI, Claude, Gemini, and other compatible API routes'
      ),
    },
    {
      id: 'monitor',
      icon: BarChart3,
      title: t('Monitor'),
      description: t(
        'Track usage, costs and performance with real-time analytics'
      ),
    },
  ]

  return (
    <section
      aria-labelledby='quick-start-title'
      className='border-border/40 border-t px-6 py-12 md:py-16'
    >
      <div className='mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16'>
        <div>
          <h2
            id='quick-start-title'
            className='text-2xl font-semibold tracking-tight md:text-3xl'
          >
            {t('Quick Start')}
          </h2>
          <ol className='mt-6 space-y-3'>
            {steps.map((step, index) => (
              <li
                key={step.id}
                className='border-border/60 bg-muted/20 flex min-h-24 items-center gap-4 rounded-xl border px-4 py-4 md:min-h-28 md:px-5'
              >
                <div
                  aria-hidden='true'
                  className='relative flex size-12 shrink-0 items-center justify-center rounded-xl border border-teal-600/25 bg-teal-500/10 text-teal-700 dark:text-teal-300'
                >
                  <step.icon className='size-6' strokeWidth={1.5} />
                  <span className='bg-background border-border absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full border text-[10px] font-semibold'>
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className='text-base font-semibold'>{step.title}</h3>
                  <p className='text-muted-foreground mt-1 text-sm leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <HeroTerminalDemo />
      </div>
    </section>
  )
}
