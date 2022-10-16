
type Vnode = {
  type: any;
  props: {};
  children?: string | any[];
  el?: Element;
  [key: string]: any;
  ShapeFlag: number;
}


type ComponentInstance = {
  vnode: Vnode;
  type: any;
  setupState: {};
  render?
  proxy?: object,
  props?: object
}