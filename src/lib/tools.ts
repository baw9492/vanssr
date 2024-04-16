import {createSignal} from 'solid-js'

/** 滚动到屏幕底部时触发, 返回一个移除事件监听函数 */
export function onScrollToBottom(callback: () => any) {
  function handleScroll() {
    const documentHeight = document.documentElement.scrollHeight
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight
    const scrollPosition =
      window.scrollY || window.pageYOffset || document.documentElement.scrollTop

    if (documentHeight - viewportHeight - scrollPosition < 20) {
      callback()
    }
  }

  // 添加滚动事件监听器
  window.addEventListener('scroll', handleScroll)

  // 返回用于移除监听器的函数
  return function removeScrollListener() {
    window.removeEventListener('scroll', handleScroll)
  }
}

/** 简化状态管理 */
export function $signal<T>(value: T) {
  const [_a, _s] = createSignal(value)
  return {
    get $() {
      return _a()
    },
    set $(v) {
      _s(() => v)
    },
    get _p() {
      return [_a, _s]
    },
  }
}

export function parseForm(formData: FormData) {
  return formData as unknown as {body: any; files: Express.Multer.File[]}
}

export async function rpcFunction(methodName: string, ...args: any[]) {
  const isFormData = args[0] instanceof FormData
  const requestBody = isFormData ? args[0] : JSON.stringify(args)
  const _res = await fetch(`/_api?key=${String(methodName)}`, {
    method: 'POST',
    body: requestBody,
    headers: isFormData
      ? undefined
      : {
          'Content-Type': 'application/json; charset=utf-8',
        },
  })
  const resType = _res.headers.get('Content-Type')
  if (resType?.startsWith('application/json')) {
    return _res.json()
  } else {
    return _res.text()
  }
}
