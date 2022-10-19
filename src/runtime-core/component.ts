import { isObject } from "src/shared"
import { patch } from "./render"

export function processComponent(vnode: Vnode, container: Element) {
    mountComponnet(vnode, container)
}

/** 挂载组件节点 */
export function mountComponnet(vnode: Vnode, container: Element) {
    const componnetInstance = createComponnetInstance(vnode, container)
    setupComponent(componnetInstance, container)
    setupRenderEffect(componnetInstance, vnode, container)
}

/** 通过虚拟节点生成组件实例节点 */
export function createComponnetInstance (vnode: Vnode, container: Element): ConponentInstance {
    const instance = {
        vnode,
        type: vnode.type,
        props: vnode.props || {},
        children: vnode.children
    }
    return instance as any
}

/** 初始化 pros slot render  */ 
function setupComponent(componnetInstance, container: Element) {
    // TODO pros
    // TODO slot
    // TODO render

    setupStatefulComponent(componnetInstance)
}


/** 初始化有状态的组件 */ 
function setupStatefulComponent(instance: ConponentInstance) {
    const { setup } = instance.type
    if (setup) {
        const setupResult = setup(instance)
        handleSetupResult(setupResult, instance)
    }
}

/** 处理返回值 检查是返回值是否是一个函数 如果是就以这个函数作为 render函数 */
function handleSetupResult(setupResult: any, instance: ConponentInstance) {
    if (isObject(setupResult)) {
        instance.setupResult = setupResult
    } else {
    }
    finishComponentSetup(instance)
}


/** 确保组件拥有 render 函数 */
function finishComponentSetup(instance: ConponentInstance) {
    const Component = instance.type
    instance.render = Component.render
}


/** 执行组件的render 函数获得 虚拟节点 */
function setupRenderEffect(componnetInstance: ConponentInstance, vnode: Vnode, container: Element) {
    const { render, setupResult } = componnetInstance
    if (render) {
        const subTree = render?.call(setupResult) as Vnode
        patch(subTree, container)
        vnode.el = subTree.el
    }
}