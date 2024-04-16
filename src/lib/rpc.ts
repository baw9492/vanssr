import {fns} from '~/server/functions' // rpc.ts中第一行代码在客户端中被移除
import {rpcFunction} from './tools'
import {type Fns} from '~/server/functions'
const rpc = (
  import.meta.env.SSR
    ? fns
    : new Proxy<Record<string, (...args: any) => Promise<any>>>(
        {},
        {
          get(_target, methodName, _receiver) {
            return async function (...args: any[]) {
              return rpcFunction(String(methodName), ...args)
            }
          },
        }
      )
) as Fns

export default rpc
