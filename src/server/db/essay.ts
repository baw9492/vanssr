import {essaylist} from './init'
import {ObjectId, type WithId} from 'mongodb'
import fs from 'fs/promises'
import {parseForm} from '~/lib/tools'
import {Session} from '@auth/express'

export async function getEssaies(page: number) {
  // await new Promise<void>((end) => setTimeout(end, 2000))
  const itemCount = 20
  const cur = essaylist
    .find()
    .sort({_id: -1})
    .skip(page * itemCount)
    .limit(itemCount)
  const res: WithId<essay>[] = []
  for await (const item of cur) {
    res.push(item)
  }
  return res as unknown as SRL<essay>[]
}

export async function deleteEssay(this: any, id: string) {
  const {session} = this.context as {session: Session | null}
  if (session?.user?.email === '1585518874@qq.com') {
    const res = await essaylist.deleteOne({_id: new ObjectId(id)})
    return res.deletedCount === 1
  }
  return false
}

export async function addEssay(this: any, formData: FormData) {
  const {session} = this.context as {session: Session | null}
  if (!(session?.user?.email === '1585518874@qq.com')) {
    return null
  }

  const {body, files} = parseForm(formData)
  console.log(files)
  const image = files.find((v) => v.fieldname === 'img')
  if (image) {
    const _arr = image.originalname.split('.')
    const newPath = image.path + '.' + _arr[_arr.length - 1]
    fs.rename(image.path, newPath)
  }
  const {text} = body
  console.log(image?.path)
  console.log(text)
  const essay = {text: text, date: Date.now()}
  const res = await essaylist.insertOne(essay)
  return {_id: res.insertedId.toString(), ...essay}
}
