import {
  type ParentProps,
  type Setter,
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from 'solid-js'

const darkModeCtx = createContext<Setter<boolean>>()

export function DarkModeProvider(props: ParentProps) {
  const [g, s] = createSignal<boolean>(false)
  onMount(() => {
    const _d = localStorage.getItem('theme')
    if (_d === 'dark') {
      s(true)
    }
  })
  createEffect(() => {
    if (!import.meta.env.SSR) {
      if (g()) {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
      } else {
        localStorage.setItem('theme', 'light')
        document.documentElement.classList.remove('dark')
      }
    }
  })

  return <darkModeCtx.Provider value={s}>{props.children}</darkModeCtx.Provider>
}
export function useDarkMode() {
  return useContext(darkModeCtx)!
}
