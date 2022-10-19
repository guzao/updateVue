function isObject(value) {
    return Object !== null && typeof value == 'object';
}

function processComponent(vnode, container) {
    mountComponnet(vnode, container);
}
function mountComponnet(vnode, container) {
    const componnetInstance = createComponnetInstance(vnode);
    setupComponent(componnetInstance);
    setupRenderEffect(componnetInstance, vnode, container);
}
function createComponnetInstance(vnode, container) {
    const instance = {
        vnode,
        type: vnode.type,
        props: vnode.props || {},
        children: vnode.children
    };
    return instance;
}
function setupComponent(componnetInstance, container) {
    setupStatefulComponent(componnetInstance);
}
function setupStatefulComponent(instance) {
    const { setup } = instance.type;
    if (setup) {
        const setupResult = setup(instance);
        handleSetupResult(setupResult, instance);
    }
}
function handleSetupResult(setupResult, instance) {
    if (isObject(setupResult)) {
        instance.setupResult = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}
function setupRenderEffect(componnetInstance, vnode, container) {
    const { render, setupResult } = componnetInstance;
    if (render) {
        const subTree = render === null || render === void 0 ? void 0 : render.call(setupResult);
        patch(subTree, container);
        vnode.el = subTree.el;
    }
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
        processElment(vnode, rootElment);
    }
}
function processElment(vnode, rootElment) {
    mountElment(vnode, rootElment);
}
function mountElment(vnode, rootElment) {
    const { type, children } = vnode;
    const el = vnode.el = document.createElement(type);
    if (Array.isArray(children)) {
        mountChildrenElment(children, el);
    }
    else {
        el.innerHTML = children;
    }
    rootElment.append(el);
}
function mountChildrenElment(vnodeChildren, container) {
    vnodeChildren.forEach(v => {
        patch(v, container);
    });
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
