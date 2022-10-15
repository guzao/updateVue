import { patch } from "./render"

/** 处理组件 */
export function processComponent(vnode: Vnode, container: Element) {
  mountComponent(vnode, container)
}

/** 挂载组件 */
function mountComponent(vnode: Vnode, container: Element) {

  const instance =  createComponentInstance(vnode, container)

  setupComponent(instance)

  setupRenderEffect(instance, vnode, container)
}

/** 创建组件实例 */
function createComponentInstance(vnode: Vnode, container: Element): ComponentInstance{
  const component = {
    vnode: vnode,
    type: vnode.type,
    setupState: {},
  }
  return component
}


/** 初始化组件 */ 
function setupComponent(instance: ComponentInstance) {
  setupStatefulComponent(instance)
}


/** 初始化状态组件 */
function setupStatefulComponent(instance: ComponentInstance) {
  
  instance.proxy = new Proxy({_: instance}, {
    get ({ _: instance }, key) {
      const { setupState } = instance
      console.log(instance, key)
      if (key in setupState) {
        return setupState[key]
      }
    }
  })

  const component = instance.type
  const { setup } = component
  if (setup) {
    const setupResult = setup() as {}
    handleSetupResult(instance, setupResult)
  }


}

function handleSetupResult(instance: ComponentInstance, setupResult: {}) {
  // TODO function  
  
  // object
  if (typeof setupResult == 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: ComponentInstance) {
  const Component = instance.type

  instance.render = Component.render

}

function setupRenderEffect(instance: ComponentInstance, vnode: Vnode, container: Element) {
  const { proxy } = instance
  // 组件代理 proxy组件代理对象
  const subTree = instance.render.call(proxy)
  patch(subTree, container)
  vnode.el = subTree.el
}

