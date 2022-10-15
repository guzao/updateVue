
type Vnode = {
  type: any;
  props: {};
  children?: string | any[];
  el: Element
}


type ComponentInstance = {
  vnode: Vnode;
  type: any;
  setupState: {};
  render?
  proxy?: object
}