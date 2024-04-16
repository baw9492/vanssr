import {Meta, Title} from '@solidjs/meta'

export default () => {
  return (
    <div class="h-screen p-2">
      <Title>404</Title>
      <Meta name="statusCode" content="404" />
      <div class="h-full flex justify-center items-center bd">
        <h1 class="text-xl">404</h1>
        <div>
          <a href="/" class="text-blue-600 hover:underline ml-4">
            back indexd
          </a>
          <a
            href=""
            onclick={() => window.history.back()}
            class="text-blue-600 hover:underline ml-4">
            back
          </a>
        </div>
      </div>
    </div>
  )
}
