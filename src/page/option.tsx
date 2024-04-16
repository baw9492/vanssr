import type {Session} from '@auth/express'
import {Title} from '@solidjs/meta'
import {Show} from 'solid-js'
import {useDarkMode} from '~/lib/store/darkMode'
import {useRequsetContext} from '~/lib/store/requestCtx'

export default () => {
  const s = useDarkMode()
  const context = useRequsetContext()!
  const user = () => context()?.session?.user

  return (
    <div class="p-2 h-full">
      <Title>设置</Title>
      <div class="bd h-full p-2">
        <div class="bg-pink-200 dark:bg-blue-200 mb-2">设置</div>
        <div class="flex bd p-2 justify-between items-center mb-2">
          <Show when={user()} fallback={<div>no user</div>}>
            <div class="flex">
              <img
                class="w-12 h-12 rounded-full"
                src={user()?.image ?? undefined}
                alt="user image"
              />
              <div class="ml-2">
                <div class="font-bold">{user()?.name}</div>
                <div>{user()?.email}</div>
              </div>
            </div>
            <button class="bg-red-500 rounded px-4 hover:opacity-50 text-white h-10">
              sign out
            </button>
          </Show>
        </div>
        <button
          class="bd"
          onclick={() => {
            s((v) => !v)
            console.log(context)
          }}>
          切换模式
        </button>
      </div>
    </div>
  )
}
