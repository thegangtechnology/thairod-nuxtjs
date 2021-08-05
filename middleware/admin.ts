import { Context } from '@nuxt/types'

const authPathList = [
  'procurement',
  'order-overview',
  'print',
  'assign'
]

export default function ({ route, $auth, redirect } : Context) : void {
  const isAuthPath = authPathList.includes((route.path.split('/')[1]))
  const isAuthorized = $auth.$state.loggedIn
  if (isAuthPath && !isAuthorized) {
    redirect('/')
  }
}
