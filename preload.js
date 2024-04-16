import {render} from './dist/server/entry-server.js'
import fs from 'fs/promises'
const template = (await fs.readFile('dist/server/template.html')).toString()
const paths = ['/', '/option']
paths.forEach((v) => {
  const {html, statusCode} = render(template, v)
  if (v === '/') v = '/index'
  const filename = `./dist/client${v}.html`
  if (statusCode === 200) {
    fs.writeFile(filename, html).then(() => {
      console.log(v + ' is preloaded')
    })
  } else {
    console.log('have not the path: ' + v)
  }
})
