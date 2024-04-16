import {type ParentProps, createContext, useContext} from 'solid-js'
import {createStore} from 'solid-js/store'
import type {Store, SetStoreFunction} from 'solid-js/store'
import rpc from '../rpc'

const initData: SRL<essay>[] = []
const context =
  createContext<[Store<typeof initData>, SetStoreFunction<typeof initData>]>()

export function EssaiesProvider(props: ParentProps) {
  const _store = createStore(initData)
  return <context.Provider value={_store}>{props.children}</context.Provider>
}

export const useEssaies = () => {
  const [_v, _s] = useContext(context)!
  return {
    get value() {
      return _v
    },
    async getData(page: number) {
      // await new Promise<any>((res) => setTimeout(res, 2000))
      const data = await rpc.getEssaies(page)
      _s((v) => [...v, ...data])
      return data.length
    },
    async deleteEssay(id: string) {
      const res = await rpc.deleteEssay(id)
      if (res) {
        _s((v) => {
          const newV = Array.from(v).filter((v2) => v2._id !== id)
          return newV
        })
      }
    },
    async initData() {
      const data = await rpc.getEssaies(0)
      _s(data)
    },
    async addEssay(data: FormData) {
      rpc.addEssay(data)
    },
  }
}
