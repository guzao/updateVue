import { shallowReadonly } from 'src/resctivite';
import { PublicInstanceProxyHandlers } from './componentPublicInstance';
import { patch } from "./render"

/** 处理组件 */
export function processComponent(vnode: Vnode, container: Element) {
  mountComponent(vnode, container)
}

/** 挂载组件 */
function mountComponent(vnode: Vnode, container: Element) {

  const instance = createComponentInstance(vnode, container)

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

  initProps(instance, instance.type.props)
  
  setupStatefulComponent(instance)
}


/** 初始化状态组件 */
function setupStatefulComponent(instance: ComponentInstance) {
  
  instance.proxy = new Proxy({_: instance}, PublicInstanceProxyHandlers)

  const component = instance.type
  const { setup } = component
  
  if (setup) {
    // setup 函数内使用 props数据
    // 父组件传入的数据不佳而修改使用 shallowReadonly 代理
    const setupResult = setup(shallowReadonly(instance.props as object))
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


/** 调用组件的 render函数获取到虚拟节点 交给patch 递归判断 */
function setupRenderEffect(instance: ComponentInstance, vnode: Vnode, container: Element) {
  const { proxy } = instance
  // 组件代理 proxy组件代理对象
  const subTree = instance.render.call(proxy)
  patch(subTree, container)
  vnode.el = subTree.el
}



function initProps(instance: ComponentInstance, rawProps: object) {
  instance.props = rawProps || {}
}

