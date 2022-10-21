import { h } from "../../lib/mini-vue.esm.js";


// const Foo = {
//   nam: 'Foo',
//   setup (props) {
//     const add = (number) => {
//       console.log(props)
//     }
//     return {
//       name: 'foo',
//       add
//     }
//   },
//   render () {
//     return h('button', { class: 'foo', onClick: () => this.add() }, '你好我是' + this.name )
//   }
// }


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
    return h('div', { class: 'box', }, 'app')
  }
}