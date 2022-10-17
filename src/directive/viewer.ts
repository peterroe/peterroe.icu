import type { App } from 'vue'
import { createVNode, render } from 'vue' 
import Viewer from './Viewer.vue'

function generateContainer(el: HTMLImageElement) {
  const container = document.createElement('div')

  const vm = generateVM(el.src)
  render(vm, container)

  appendContainer(container)
  container.addEventListener('click', () => {
    removeContainer(container)
  })

  return container
}

function appendContainer(container: HTMLDivElement) {
  if (container) {
    document.body.appendChild(container)
  }
}

function removeContainer(container: HTMLDivElement) {
  if (container) {
    document.body.removeChild(container)
  }
}

function generateVM(src: string) {
  const vm = createVNode(Viewer,{
    src
  }, null)
  return vm
}

export default function install(app: App) {
  app.directive('viewer', {
    mounted(el) {
      el.onclick = () => {
        generateContainer(el)
      }
    },
  })
}