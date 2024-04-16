import {
  type Accessor,
  ParentProps,
  createContext,
  createSignal,
  onMount,
  useContext,
} from 'solid-js'

const RequsetContext = createContext<Accessor<RequestContext | undefined>>()

export function RequsetContextProvider(
  props: ParentProps & {context?: RequestContext}
) {
  const [context, setContext] = createSignal<RequestContext | undefined>(
    props.context
  )
  onMount(() => {
    if (props.context) return
    if (window.__context__) setContext(window.__context__)
    else {
      fetch('/auth/session')
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          }
        })
        .then((value) => {
          setContext({session: value})
        })
    }
    console.log(context())
  })

  return (
    <RequsetContext.Provider value={context}>
      {props.children}
    </RequsetContext.Provider>
  )
}

export function useRequsetContext() {
  return useContext(RequsetContext)!
}

declare global {
  interface Window {
    __context__?: RequestContext
  }
}
