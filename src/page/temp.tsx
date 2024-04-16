// import {hello} from '~/server/temp.telefunc'

import gsap from 'gsap'
import {onMount} from 'solid-js'

export default () => {
  let greenBox!: HTMLDivElement
  let p
  onMount(() => {})

  return (
    <div class="p-6">
      <div>
        <button
          onclick={() => {
            gsap.to(greenBox, {rotation: 360, x: 100, duration: 1})
          }}>
          click me
        </button>
      </div>
      <div ref={greenBox} class="w-12 h-12 bg-green-500"></div>
      <div class="box purple"></div>
      <div class="box blue"></div>
    </div>
  )
}
