import App from './App.tsx'
import express from 'express'
import fs from 'node:fs/promises'
import {generateHydrationScript, getAssets, renderToString} from 'solid-js/web'
import sirv from 'sirv'
import RPCRouter from '~/server/routes'
import {resolve} from 'node:path'
import compression from 'compression'
import {ExpressAuth, getSession} from '@auth/express'
import authConfig from './server/auth.config.ts'

export function render(
  template: string,
  url: string,
  context?: RequestContext
) {
  const app_html = renderToString(() => <App url={url} context={context} />)
  const assets = getAssets() // 似乎存在调用顺序
  const isNoFound = assets.includes(`"statusCode" content="404"`)
  const html = template
    .replace('$context$', JSON.stringify(context))
    .replace(`<!--app-html-->`, app_html)
    .replace(`<!--app-head-->`, generateHydrationScript() + assets)
  return {
    statusCode: isNoFound ? 404 : 200,
    html,
  }
}

const template = await fs.readFile(
  import.meta.env.DEV
    ? './index.html'
    : resolve(import.meta.dirname, './template.html'),
  'utf-8'
)

const app = express()

app.set('trust proxy', true)
app.use('/auth/*', ExpressAuth(authConfig))

if (import.meta.env.PROD) {
  app.use(compression())
  app.use(sirv('dist/client', {maxAge: 3160000}))
}
app.use(RPCRouter)

app.get('*', async (req, res) => {
  if (res.headersSent) return
  try {
    const session = await getSession(req, authConfig)
    const {statusCode, html} = render(template, req.url, {session})
    res.status(statusCode).set({'Content-Type': 'text/html'}).send(html)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

export default app
