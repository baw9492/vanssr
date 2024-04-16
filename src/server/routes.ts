import express, {Router} from 'express'
import multer from 'multer'
import {fns} from './functions'
import {getSession} from '@auth/express'
import authConfig from './auth.config'
const router = Router()
const upload = multer({
  dest: '.server/uploads/',
  limits: {fileSize: 20000000, files: 1},
  fileFilter(_req, file, cb) {
    if (file.mimetype.startsWith('image/')) return cb(null, true)
    else return cb(new Error('上传文件出错, 只能上传不大于20MB的图片文件'))
  },
})

router.use('/_api', express.json())
router.post('/_api', upload.any(), async (req, res) => {
  try {
    const ContentType = req.header('Content-Type')
    const {key} = req.query as {key: keyof typeof fns}
    const session = await getSession(req, authConfig)
    const context = {session}
    console.log(`调用了 ${key}`)
    if (ContentType?.startsWith('application/json')) {
      const args = req.body
      console.log(`参数为${args}`)
      //@ts-ignore
      res.send(await fns[key].call({context}, ...args))
    } else if (ContentType?.startsWith('multipart/form-data')) {
      const {body, files} = req
      const data = {body, files}
      //@ts-ignore
      res.send(await fns[key].call({context}, data))
    } else {
      res.status(401).send('错误的 Content-Type, 请确保设置了正确的请求参数')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(JSON.stringify(err))
  }
})

export default router
