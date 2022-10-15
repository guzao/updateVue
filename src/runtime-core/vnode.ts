
export function createVNode (type: any, props = {}, children?: any [] | string): Vnode {
  const vnode = {
    type,
    props,
    children
  }
  return vnode
}