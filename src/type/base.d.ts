interface RequestContext {
  session: import('@auth/express').Session | null | undefined
}
