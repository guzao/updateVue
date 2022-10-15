import { createVNode } from "./vnode";
export function h (type: any, props = {}, children: any [] | any) {
  return createVNode(type, props, children)
}