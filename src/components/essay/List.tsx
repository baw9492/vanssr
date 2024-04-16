import {For, onMount, Switch, Match, onCleanup, Show} from 'solid-js'
import {useEssaies} from '~/lib/store/essaiesStore'
import {$signal, onScrollToBottom} from '~/lib/tools'
import {BsXLg} from 'solid-icons/bs'
import {useRequsetContext} from '~/lib/store/requestCtx'

export default () => {
  const {value: essaies, initData, getData, deleteEssay} = useEssaies()
  const isLoading = $signal(true)
  const isEnd = $signal(false)
  let nowPage = 0
  let removeEventFunc: () => void | undefined
  const {session} = useRequsetContext()
  const isAdmin = session?.user?.email === '1585518874@qq.com'

  onMount(async () => {
    await initData()
    nowPage++
    isLoading.$ = false
    removeEventFunc = onScrollToBottom(async () => {
      console.log('到底了')
      if (isLoading.$) return
      isLoading.$ = true
      const dataLen = await getData(nowPage++)
      if (dataLen) {
        isLoading.$ = false
      } else {
        isEnd.$ = true
      }
    })
  })
  onCleanup(() => {
    if (removeEventFunc) removeEventFunc()
  })

  return (
    <div>
      <ul>
        <For each={essaies}>
          {(v) => (
            <li class="bd p-2 pt-4 m-2 relative last:mb-0">
              <div class="text-xs mb-1">
                {typeof v.date === 'number'
                  ? new Date(v.date).toString()
                  : v.date}
              </div>
              <div class="mb-2 break-words">{v.text}</div>
              {/* <Show when={v.imgUrl}>
                <img
                  class="w-full bd object-cover max-h-[50vh]"
                  src={`http://img.baw9492.cc/${v.imgUrl}`}
                  loading="lazy"
                  alt="随笔图片"
                  referrerpolicy="no-referrer"
                />
              </Show> */}
              {/* <Show when={isAdmin}> */}
                <button
                  onclick={() => {
                    deleteEssay(v._id)
                    console.log('click')
                  }}
                  class="h-5 w-5 flex justify-center items-center cursor-pointer absolute top-[1px] right-[1px] hover:opacity-50 hover:rotate-90 transition-transform border-none">
                  <BsXLg size={10} />
                </button>
              {/* </Show> */}
            </li>
          )}
        </For>
      </ul>
      <div class="text-center">
        <Switch>
          <Match when={isEnd.$}>没有更多了</Match>
          <Match when={isLoading.$}>loading</Match>
        </Switch>
      </div>
    </div>
  )
}
