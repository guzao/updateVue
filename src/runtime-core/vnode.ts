import { ShapeFlags } from "src/shared/ShapeFlags"

export function createVNode (type: any, props?, children?: any [] | string): Vnode {
  const vnode = {
    type,
    props,
    children,
    ShapeFlag: getShapeFlag(type)
  }
  getChildrenShapeFlag(vnode, children)
  return vnode
}

function getShapeFlag (type: string | object) {
  return typeof type == "string" ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}

function getChildrenShapeFlag (vnode: Vnode, children) {
  if (typeof children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }
}