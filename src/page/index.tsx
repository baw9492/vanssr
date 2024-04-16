import {For} from 'solid-js'

export default () => {
  const list = [
    {title: '随笔', href: '/essay'},
    {title: '博客', href: '/blog'},
    {title: 'experiment_todos', href: '/todos'},
    {title: 'experiment_any', href: '/temp'},
    {title: 'option', href: '/option'},

  ]

  return (
    <div class="h-full p-2">
      <ul class="bd h-full flex items-center justify-center flex-col list-none">
        <For each={list}>
          {(v) => (
            <li class="my-2">
              <a
                href={v.href}
                class="text-center md:hover:underline active:opacity-50 text-xl">
                {v.title}
              </a>
            </li>
          )}
        </For>
      </ul>
      <div class="absolute right-3 top-3 opacity-0 hover:opacity-100 transition-opacity w-52">
        这里本来是放一些我的其它应用账号主页的链接的,
        但是想想又没有值得放上来的内容, 暂时算了
      </div>
    </div>
  )
}
