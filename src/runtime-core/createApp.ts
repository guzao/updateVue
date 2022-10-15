import { render } from "./render"
import { createVNode } from "./vnode"


export function createApp (roiterComponnet: Vnode) {
  return createAppInstance(roiterComponnet)
}

function createAppInstance (roiterComponnet) {
  return {
    mount (rootElemnet: Element) {
      const vnode = createVNode(roiterComponnet)
      render(vnode, rootElemnet)
    }
  }
}