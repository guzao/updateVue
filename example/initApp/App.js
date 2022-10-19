import { h } from '../../lib/mini-vue.esm.js'

export const App = {
    name: 'App',
    props: {
        props: 'test-props'
    },
    setup () {
        return {
            data: 'App'
        }
    },
    render () {
        return h('div', { class: 'red' }, 'nihao')
    }
}