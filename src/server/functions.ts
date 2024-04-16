import {parseForm} from '~/lib/tools'
import {deleteEssay, getEssaies, addEssay} from './db/essay'

/* 
  fns中的函数只会在服务器上运行,
  为了保证正确获取context, 不能使用箭头函数,
  使用异步函数以保证类型正确, 
  FormData以外的函数参数会作为数组被JSON.stringify序列化,所有返回值都会被序列化,
  需要 FormData 作为参数时, 不能有其它额外的参数,
  参数为 formData:FormData 时必须把formData转化为PareFormData 
*/
export const fns = {
  getEssaies,
  deleteEssay,
  addEssay,
  async getData(formData: FormData) {
    const data = parseForm(formData)
    return data.body
  },
}
export type Fns = typeof fns
