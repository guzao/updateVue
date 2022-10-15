import { h } from "../../lib/mini-vue.esm.js";


const Foo = {
  nam: 'Foo',
  props: {
    msg: []
  },
  setup () {
    return {
      name: 'foo'
    }
  },
  render () {
    return h('div', { class: 'foo' }, '你好我是' + this.name)
  }
}



export default {
  name: 'App',
  setup () {
    return {
      msg: 'hi mi-vue'
    }
  },
  /** 组件属性 */
  props: {
    msg: [],
  },
  render () {
    return h('div', { class: 'red', }, [
      h('ul', {  }, [
        h('li', {}, '11'),
        h('li', {}, '11'),
        h('li', {}, '11'),
        h('li', {}, '11'),
        h('li', {}, '11'),
        h('li', {}, '11'),
        h('li', {}, '11'),
        h(Foo),
        h(Foo),
        h(Foo),
        h(Foo),
        h(Foo),
        h(Foo),
      ])
    ])
  }
}