import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { CopyButton } from '@/components/copy-button'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const apiOrigin = 'https://api.jackey.ai'
const openAiBase = `${apiOrigin}/v1`

const protocols = [
  {
    id: 'chat',
    tab: 'Chat',
    name: 'OpenAI Chat Completions',
    base: openAiBase,
    path: '/v1/chat/completions',
    header: 'Authorization: Bearer $JACKEY_API_KEY',
    body: {
      model: 'YOUR_MODEL_ID',
      messages: [{ role: 'user', content: 'Hello!' }],
    },
    result: 'choices[0].message.content',
  },
  {
    id: 'responses',
    tab: 'Responses',
    name: 'OpenAI Responses',
    base: openAiBase,
    path: '/v1/responses',
    header: 'Authorization: Bearer $JACKEY_API_KEY',
    body: { model: 'YOUR_MODEL_ID', input: 'Hello!' },
    result: 'output（OpenAI SDK 也可用 response.output_text）',
  },
  {
    id: 'claude',
    tab: 'Claude',
    name: 'Claude Messages',
    base: apiOrigin,
    path: '/v1/messages',
    header: 'x-api-key: $JACKEY_API_KEY',
    version: 'anthropic-version: 2023-06-01',
    body: {
      model: 'YOUR_MODEL_ID',
      max_tokens: 128,
      messages: [{ role: 'user', content: 'Hello!' }],
    },
    result: 'content 中 type 为 text 的内容块',
  },
  {
    id: 'gemini',
    tab: 'Gemini',
    name: 'Gemini GenerateContent',
    base: apiOrigin,
    path: '/v1beta/models/YOUR_MODEL_ID:generateContent',
    header: 'x-goog-api-key: $JACKEY_API_KEY',
    body: { contents: [{ role: 'user', parts: [{ text: 'Hello!' }] }] },
    result: 'candidates[0].content.parts',
  },
] as const

const sections = [
  { id: 'endpoints', label: '接入地址' },
  { id: 'first-request', label: '发送首个请求' },
  { id: 'sdk', label: 'SDK 配置' },
  { id: 'errors', label: '常见错误' },
]

const sdkExample = `import os
from openai import OpenAI

client = OpenAI(
    base_url="${openAiBase}",
    api_key=os.environ["JACKEY_API_KEY"],
)
response = client.chat.completions.create(
    model="YOUR_MODEL_ID",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)`

function curlExample(protocol: (typeof protocols)[number]) {
  return [
    `curl -sS "${apiOrigin}${protocol.path}"`,
    `  -H "${protocol.header}"`,
    'version' in protocol ? `  -H "${protocol.version}"` : '',
    '  -H "Content-Type: application/json"',
    `  -d '${JSON.stringify(protocol.body, null, 2)}'`,
  ]
    .filter(Boolean)
    .join(' \\\n')
}

function CodeExample({ label, code }: { label: string; code: string }) {
  return (
    <div className='bg-muted/35 overflow-hidden rounded-xl border'>
      <div className='text-muted-foreground flex items-center justify-between border-b px-4 py-1.5 text-xs'>
        <span>{label}</span>
        <CopyButton
          value={code}
          aria-label='复制代码'
          tooltip='复制代码'
          successTooltip='已复制'
        />
      </div>
      <pre className='overflow-x-auto px-4 py-4 font-mono text-xs leading-6 sm:text-sm'>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function ApiDocs() {
  return (
    <PublicLayout>
      <div
        lang='zh-CN'
        className='mx-auto grid max-w-6xl gap-9 px-1 py-8 sm:px-4 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-12 lg:py-14'
      >
        <aside className='lg:border-border/60 lg:border-r'>
          <nav
            aria-label='文档目录'
            className='flex flex-wrap gap-x-4 gap-y-3 text-sm lg:sticky lg:top-24 lg:flex-col lg:items-start'
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className='min-w-0 space-y-12 pb-10'>
          <section id='endpoints' className='scroll-mt-24 space-y-5'>
            <div className='space-y-3'>
              <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                JacKey API 接入文档
              </h1>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                选好客户端使用的协议，复制对应的 Base URL，再填入 JacKey API Key
                和模型 ID。
              </p>
            </div>
            <div className='divide-y overflow-hidden rounded-xl border'>
              <div className='bg-muted/30 text-muted-foreground hidden gap-4 px-4 py-2 text-xs font-medium sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]'>
                <span>协议与请求路径</span>
                <span>SDK Base URL</span>
              </div>
              {protocols.map((protocol) => (
                <div
                  key={protocol.id}
                  className='grid gap-2 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:items-center sm:gap-4'
                >
                  <div className='min-w-0'>
                    <h2 className='text-sm font-semibold'>{protocol.name}</h2>
                    <code className='text-muted-foreground text-xs break-all'>
                      POST {protocol.path.replace('YOUR_MODEL_ID', '{model}')}
                    </code>
                  </div>
                  <div className='bg-muted/50 flex min-w-0 items-center justify-between gap-2 rounded-md pl-3'>
                    <code className='text-xs break-all text-teal-800 dark:text-teal-300'>
                      {protocol.base}
                    </code>
                    <CopyButton
                      value={protocol.base}
                      aria-label={`复制 ${protocol.name} Base URL`}
                      tooltip='复制 Base URL'
                      successTooltip='已复制'
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id='first-request' className='scroll-mt-24 space-y-4'>
            <h2 className='text-xl font-semibold'>发送首个请求</h2>
            <ol className='text-muted-foreground list-decimal space-y-2 pl-5 text-sm leading-relaxed'>
              <li>
                登录后创建{' '}
                <Link
                  className='text-foreground underline underline-offset-4'
                  to='/keys'
                >
                  API Key
                </Link>
                ，在终端设置 <code>export JACKEY_API_KEY='你的密钥'</code>。
              </li>
              <li>
                从
                <Link
                  className='text-foreground underline underline-offset-4'
                  to='/pricing'
                >
                  模型广场
                </Link>
                选一个账号可用、支持所选协议的模型，用它的模型 ID 替换{' '}
                <code>YOUR_MODEL_ID</code>。
              </li>
              <li>切换到相应协议，复制命令到终端执行，即可查看返回结果。</li>
            </ol>
            <Tabs defaultValue='chat'>
              <TabsList aria-label='请求协议' className='max-w-full'>
                {protocols.map((protocol) => (
                  <TabsTrigger key={protocol.id} value={protocol.id}>
                    {protocol.tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              {protocols.map((protocol) => (
                <TabsContent
                  key={protocol.id}
                  value={protocol.id}
                  className='min-w-0 space-y-2'
                >
                  <CodeExample label='cURL' code={curlExample(protocol)} />
                  <p className='text-muted-foreground text-sm'>
                    文本结果位于 <code>{protocol.result}</code>。
                  </p>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <section id='sdk' className='scroll-mt-24 space-y-4'>
            <h2 className='text-xl font-semibold'>SDK 配置</h2>
            <p className='text-muted-foreground text-sm'>
              OpenAI Python SDK 使用 <code>pip install openai</code>{' '}
              安装。续用上一步的 API Key 和模型 ID。
            </p>
            <CodeExample label='Python · OpenAI SDK' code={sdkExample} />
            <ul className='text-muted-foreground list-disc space-y-2 pl-5 text-sm leading-relaxed'>
              <li>
                <strong className='text-foreground'>Responses</strong>{' '}
                使用相同的 OpenAI 客户端，调用{' '}
                <code>client.responses.create(model=..., input=...)</code>。
              </li>
              <li>
                <strong className='text-foreground'>Claude</strong> 使用{' '}
                <code>Anthropic(base_url=..., api_key=...)</code>
                ，填上表的根地址和 JacKey Key，再调用{' '}
                <code>client.messages.create()</code>。
              </li>
              <li>
                <strong className='text-foreground'>Gemini</strong> 在 Google
                Gen AI SDK 的 <code>http_options</code> 中设置{' '}
                <code>base_url</code> 为根地址、<code>api_version</code> 为{' '}
                <code>v1beta</code>，并传入 JacKey Key。
              </li>
            </ul>
          </section>

          <section id='errors' className='scroll-mt-24 space-y-4'>
            <h2 className='text-xl font-semibold'>常见错误</h2>
            <dl className='divide-y rounded-xl border text-sm'>
              {[
                ['401', '检查是否使用 JacKey Key，以及鉴权头是否与协议匹配。'],
                ['403', '确认 Key 的模型权限、账户权限和 IP 白名单。'],
                ['404', '核对请求路径和模型 ID，尤其检查是否出现 /v1/v1。'],
                [
                  '429',
                  '检查请求频率、并发和上游限额，降低并发并按错误提示重试。',
                ],
              ].map(([status, message]) => (
                <div key={status} className='flex gap-4 px-4 py-3'>
                  <dt className='font-mono font-semibold'>{status}</dt>
                  <dd className='text-muted-foreground'>{message}</dd>
                </div>
              ))}
            </dl>
            <Button
              variant='outline'
              render={<a href='mailto:howard.lyh@outlook.com' />}
            >
              联系支持 <ArrowUpRight aria-hidden='true' />
            </Button>
          </section>
        </article>
      </div>
    </PublicLayout>
  )
}
