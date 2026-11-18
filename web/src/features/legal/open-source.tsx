// JacKey modification: public attribution and source information page.
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'

const sourceUrl = 'https://github.com/JackeyAPI/new-api'

export function OpenSourceNotice() {
  const { t } = useTranslation()
  return (
    <PublicLayout>
      <article className='mx-auto max-w-3xl space-y-8 py-12 text-sm leading-7'>
        <Link to='/' className='text-muted-foreground hover:text-foreground'>
          {t('Back to home')}
        </Link>
        <h1 className='text-3xl font-semibold tracking-tight'>
          {t('Open source notice')}
        </h1>
        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>JacKey · New API</h2>
          <p>
            {t(
              'JacKey is an independent fork of New API, not the official New API service.'
            )}
          </p>
          <a
            className='text-teal-600 underline underline-offset-4 dark:text-teal-400'
            href='https://github.com/QuantumNous/new-api'
            target='_blank'
            rel='noopener noreferrer'
          >
            github.com/QuantumNous/new-api ↗
          </a>
        </section>
        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>GNU AGPLv3</h2>
          <p>
            {t(
              'This modified version follows the GNU Affero General Public License v3.0 and the additional notices in NOTICE. Original copyright and third-party license notices are retained.'
            )}
          </p>
          <p className='text-muted-foreground'>
            Copyright (c) QuantumNous and contributors.
            <br />
            Frontend design and development by New API contributors.
          </p>
        </section>
        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>
            {t('Changes in this version')}
          </h2>
          <p>
            {t(
              'JacKey changes include the brand name, logo and favicon; homepage layout, animation and copy; contact and legal pages; and local Docker development configuration.'
            )}
          </p>
        </section>
        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>
            {t('Source code and license notices')}
          </h2>
          <a
            className='break-all text-teal-600 underline underline-offset-4 dark:text-teal-400'
            href={sourceUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            github.com/JackeyAPI/new-api ↗
          </a>
          <div className='text-muted-foreground flex flex-wrap gap-x-6 gap-y-2'>
            {['LICENSE', 'NOTICE', 'THIRD-PARTY-LICENSES.md'].map((file) => (
              <a
                key={file}
                className='hover:text-foreground underline underline-offset-4'
                href={`${sourceUrl}/blob/jackey/local-dev/${file}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {file} ↗
              </a>
            ))}
          </div>
        </section>
      </article>
    </PublicLayout>
  )
}
