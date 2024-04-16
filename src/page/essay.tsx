import {Session} from '@auth/express'
import {Title} from '@solidjs/meta'
import {BsArrowLeft} from 'solid-icons/bs'
import {Show} from 'solid-js'
import Creater from '~/components/essay/Creater'
import List from '~/components/essay/List'
import {EssaiesProvider} from '~/lib/store/essaiesStore'
import {useRequsetContext} from '~/lib/store/requestCtx'

export default () => {
  const context = useRequsetContext()
  const isAdmin = () => context()?.session?.user?.email === '1585518874@qq.com'

  return (
    <EssaiesProvider>
      <Title>essay</Title>
      <div class="max-w-2xl mx-auto min-h-[100vh] p-2 flex flex-col">
        <div class="bd h-full flex-1">
          <div class="flex items-center justify-center relative h-8">
            <h2 class="font-bold ">随笔</h2>
            <a href="/" class="absolute left-2 text-lg hover:opacity-50">
              <BsArrowLeft />
            </a>
          </div>
          <Show when={isAdmin()}>
            <Creater />
          </Show>
          <List />
        </div>
      </div>
    </EssaiesProvider>
  )
}
