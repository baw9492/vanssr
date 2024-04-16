import {For, Show, onMount} from 'solid-js'
import {BsArrowLeft} from 'solid-icons/bs'
import {$signal} from '~/lib/tools'

interface Todo {
  title: string
  id: string
}

export default () => {
  const adding = $signal(false)
  const inputText = $signal('')
  let input!: HTMLInputElement
  const donelist = $signal<Todo[]>([{id: 'd1', title: 'authjs'}])
  const doinglist = $signal<Todo[]>([
    {id: '1', title: 'i18n'},
    {id: '2', title: 'more design'},
    {id: '3', title: 'working'},
    {id: '5', title: '修改论文'},
    {id: '4', title: '答辩ppt'},
  ])

  onMount(() => {
    if (input) {
      input.focus()
    }
  })

  const addTodo = () => {
    doinglist.$ = [{title: inputText.$, id: String(Date.now())}, ...doinglist.$]
    inputText.$ = ''
  }

  const changeAction = (value: Todo, isDoing: boolean) => {
    if (isDoing) {
      donelist.$ = [value, ...donelist.$]
      doinglist.$ = doinglist.$.filter((v) => v.id !== value.id)
    } else {
      doinglist.$ = [value, ...doinglist.$]
      donelist.$ = donelist.$.filter((v) => v.id !== value.id)
    }
  }

  return (
    <div class="max-w-2xl mx-auto min-h-[100vh] p-2 flex flex-col">
      <div class="bd mb-2 p-2">
        <div class="flex justify-center items-center relative">
          <h3 class="font-bold text-center text-lg">doing</h3>
          <a href="/" class="absolute left-0 text-lg hover:opacity-50 ">
            <BsArrowLeft />
          </a>
        </div>
        <div class="bd p-1 flex">
          <input
            ref={input}
            class="bd flex-1 px-1"
            value={inputText.$}
            onInput={(e) => {
              inputText.$ = e.currentTarget.value
            }}
            type="text"
          />
          <button class="bg-slate-200 dark:bg-slate-800 bd ml-1 w-12" onclick={addTodo}>
            add
          </button>
        </div>
        <For each={doinglist.$}>
          {(v) => (
            <div
              onclick={() => changeAction(v, true)}
              class="cursor-pointer hover:opacity-50">
              {v.title}
            </div>
          )}
        </For>
      </div>
      <div class="bd p-2 flex-1">
        <h3 class="font-bold text-center text-lg">done</h3>
        <For each={donelist.$}>
          {(v) => (
            <div
              onclick={() => changeAction(v, false)}
              class="cursor-pointer hover:opacity-50 line-through">
              {v.title}
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
