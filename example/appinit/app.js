import { h } from "../../lib/mini-vue.esm.js";


const Foo = {
  nam: 'Foo',
  props: {
    msg: 'Fooprops',
    count: 1
  },
  setup (props) {
    const add = (number) => {
      console.log(props)
    }
    return {
      name: 'foo',
      add
    }
  },
  render () {
    console.log(this)
    return h('div', { class: 'foo', onClick: () => this.add() }, '你好我是' + this.name + this.msg )
  }
}


export default {
  name: 'App',
  setup () {

    return {
      msg: 'hi mi-vue',
      add () {
        console.log('App add function ')
      }
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
        h('li', {}, [h(Foo, { onAdd: () => this.add })]),
      ])
    ])
  }
}