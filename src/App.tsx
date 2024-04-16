import {
  type RouteDefinition,
  Router,
  type RouterProps,
  Route,
} from '@solidjs/router'
import IndexPage from './page/index'
import {MetaProvider, Title} from '@solidjs/meta'
import Essay from './page/essay'
import todo from './page/todo'
import {RequsetContextProvider} from '~/lib/store/requestCtx'
import {lazy} from 'solid-js'
import option from './page/option'
import {DarkModeProvider} from './lib/store/darkMode'

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/essay',
    component: Essay,
  },
  {
    path: '/temp',
    component: lazy(() => import('./page/temp')),
    load: (opt) => {
      if (!import.meta.env.SSR && opt.intent === 'navigate') {
        console.log('loading...')
      }
    },
  },
  {
    path: '/todos',
    component: todo,
  },
  {
    path: '/option',
    component: option,
  },
  {
    path: '*404',
    component: lazy(() => import('./page/404')),
  },
]

/* 这里有一个非常奇怪的特性, 不能在这个文件中把<Router/>的root属性封装成一个普通函数function组件, 否则vite的热重载会失效*/
export default (props: RouterProps & {context?: RequestContext}) => (
  <Router
    {...props}
    root={(cp) => (
      <RequsetContextProvider context={props.context}>
        <DarkModeProvider>
          <MetaProvider>
            <Title>Jovice</Title>
            {cp.children}
          </MetaProvider>
        </DarkModeProvider>
      </RequsetContextProvider>
    )}>
    {routes}
  </Router>
)
