import {useEssaies} from '~/lib/store/essaiesStore'
import {$signal} from '~/lib/tools'

export default () => {
  const essaies = useEssaies()
  const isSubmiting = $signal(false)

  const submitAction = async (e: SubmitEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    isSubmiting.$ = true
    essaies.addEssay(formData).then(() => {
      isSubmiting.$ = false
      form.reset()
    })
  }

  return (
    <form onsubmit={submitAction} class="relative p-1 bd mx-2 mb-2">
      <textarea
        disabled={isSubmiting.$}
        name="text"
        placeholder="在此输入随笔"
        class="outline-none bd w-full resize-none h-24 p-1"
      />
      <div class="flex justify-between items-center">
        <input disabled={isSubmiting.$} type="file" name="img" class="" />
        <input
          disabled={isSubmiting.$}
          type="submit"
          value="提交"
          class="w-[80px] cursor-pointer border-2 border-black dark:border-white rounded-[3px] active:opacity-50 block h-full disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </form>
  )
}
