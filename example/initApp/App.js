import { h } from '../../lib/mini-vue.esm.js'


const Foo = {
    name: 'Foo',
    props: {
        props: 'test-Foo'
    },
    setup () {
        return {
            data: 'Foo'
        }
    },
    render () {
        return h('h1', { class: 'red' }, 'Foo' + this.data)
    }
}

export const App = {
    name: 'App',
    props: {
        props: 'test-props'
    },
    setup () {
        return {
            data: 'App',
        }
    },
    render () {
        return h('div', { class: 'red' }, [ h(Foo, { msg: '使用foo 组件传入的属性' }) ] )
    }
}