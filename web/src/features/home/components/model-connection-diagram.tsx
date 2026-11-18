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
import { Code2, Sparkles, Workflow } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Card } from '@/components/ui/card'
import { useSystemConfig } from '@/hooks/use-system-config'
import { getLobeIcon } from '@/lib/lobe-icon'

const models = [
  { name: 'Claude', icon: 'Claude.Color' },
  { name: 'GPT', icon: 'OpenAI' },
  { name: 'Gemini', icon: 'Gemini.Color' },
]

export function ModelConnectionDiagram() {
  const { t } = useTranslation()
  const { logo, systemName } = useSystemConfig()

  return (
    <figure className='relative isolate m-0 flex w-full max-w-lg flex-col items-center py-6 sm:px-4'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-12 -z-10 rounded-full bg-teal-500/10 blur-3xl'
      />
      <div className='grid w-full grid-cols-3 gap-3 sm:gap-5'>
        {models.map((model) => (
          <Card
            key={model.name}
            className='bg-background/85 items-center gap-2 rounded-2xl px-2 py-5 shadow-sm backdrop-blur-sm'
          >
            <span
              aria-hidden='true'
              className='flex h-9 items-center justify-center'
            >
              {getLobeIcon(model.icon, 30)}
            </span>
            <span className='text-base font-semibold tracking-tight'>
              {model.name}
            </span>
          </Card>
        ))}
      </div>
      <div
        aria-hidden='true'
        className='relative h-20 w-2/3 text-teal-600/40 dark:text-teal-300/35'
      >
        <div className='absolute inset-x-0 top-0 h-10 rounded-b-2xl border-x border-b border-current' />
        <div className='absolute inset-y-0 left-1/2 border-l border-current' />
      </div>
      <Card className='bg-background relative w-56 items-center gap-3 rounded-3xl px-6 py-6 shadow-[0_16px_60px_-20px_rgba(13,148,136,0.35)] ring-teal-600/25 sm:w-64 dark:ring-teal-300/25'>
        <div className='flex size-16 items-center justify-center'>
          <img src={logo} alt='' className='size-12 object-contain' />
        </div>
        <span className='text-base font-semibold tracking-tight'>
          {systemName}
        </span>
      </Card>
      <div
        aria-hidden='true'
        className='relative h-20 w-2/3 text-teal-600/40 dark:text-teal-300/35'
      >
        <div className='absolute inset-x-0 bottom-0 h-10 rounded-t-2xl border-x border-t border-current' />
        <div className='absolute inset-y-0 left-1/2 border-l border-current' />
      </div>
      <div className='grid w-full grid-cols-3 gap-3 sm:gap-5'>
        {[
          { label: t('Developer tools'), icon: Code2 },
          { label: t('AI applications'), icon: Sparkles },
          { label: t('Automated workflows'), icon: Workflow },
        ].map((application) => (
          <Card
            key={application.label}
            className='bg-background/85 items-center gap-3 rounded-2xl px-2 py-5 text-center shadow-sm'
          >
            <application.icon
              aria-hidden='true'
              className='size-6 text-teal-600 dark:text-teal-300/80'
            />
            <span className='text-xs font-medium sm:text-sm'>
              {application.label}
            </span>
          </Card>
        ))}
      </div>
    </figure>
  )
}
