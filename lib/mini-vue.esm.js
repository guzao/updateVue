function processComponent(vnode, container) {
    mountComponnet(vnode, container);
}
function mountComponnet(vnode, container) {
    console.log('guzai', vnode, container);
    createComponnetInstance(vnode);
}
function createComponnetInstance(vnode, container) {
    const instance = {
        vnode,
        pros: vnode.props,
        children: vnode.children
    };
    return instance;
}

function render(vnode, rootElment) {
    patch(vnode, rootElment);
}
function patch(vnode, rootElment) {
    const { type } = vnode;
    if (typeof type == 'object') {
        processComponent(vnode, rootElment);
    }
    else {
        console.log('[][]');
    }
}

function createVnode(type, props, children) {
    return {
        type,
        props,
        children
    };
}

function createApp(rootComponent) {
    return {
        mount(rootElment) {
            const vnode = createVnode(rootComponent);
            render(vnode, rootElment);
        }
    };
}

function h(type, props, children) {
    return createVnode(type, props, children);
}

export { createApp, h };
//# sourceMappingURL=mini-vue.esm.js.map
