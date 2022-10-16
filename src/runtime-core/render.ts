import { ShapeFlags } from 'src/shared/ShapeFlags';
import { processComponent } from "./component"


export function render(vnode: Vnode, rootContainer: Element) {
  patch(vnode, rootContainer)
}

export function patch (vnode: Vnode, container: Element) {

  const { ShapeFlag, type } = vnode

  if (ShapeFlag & ShapeFlags.ELEMENT) {
    // 元素类型
    processElement(vnode, container)
  } else if (ShapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    // 组件类型
    processComponent(vnode, container)
  }

}


function processElement (vnode: Vnode, contaciner: Element) {
  mountElment(vnode, contaciner)
}


function mountElment(vnode: Vnode, contaciner: Element) {
  const { type, props, children } = vnode
  
  const el = vnode.el = document.createElement(type as string)
  
  // 节点创建
  if ( typeof children == 'string' ) {
    el.innerHTML = children
  } else {
    // 子节点为为数组需要继续patch 检测节点是否是 组件类型还是dom 元素类型
    mountChildren(children, el)
  }

  // 属性挂载
  mountElmentProps(props, el)
  // 节点挂载
  contaciner.append(el)
}

function mountChildren(children: any[] | undefined, container: HTMLElement) {
  children?.forEach((vnode: Vnode) => {
    patch(vnode, container)
  })
}

const isOn =  (key: string) => /^on/.test(key)
const getEventName = (key: string) => {
  return key.substring(2).toLocaleLowerCase()
}

function mountElmentProps (props: object, el: HTMLElement) {
  for (const key in props) {
    const value = props[ key ]
    // 检测key是否咦 on开头 ==> 注册事件
    if (isOn(key)) {
      const eventNmae = getEventName(key)
      el.addEventListener(eventNmae, value)
    } else {
      el.setAttribute(key, value)
    }
  }
}

