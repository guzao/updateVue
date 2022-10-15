function isObject(value) {
    return Object !== null && typeof value == 'object';
}

function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, vnode, container);
}
function createComponentInstance(vnode, container) {
    const component = {
        vnode: vnode,
        type: vnode.type,
        setupState: {},
    };
    return component;
}
function setupComponent(instance) {
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    instance.proxy = new Proxy({ _: instance }, {
        get({ _: instance }, key) {
            const { setupState } = instance;
            console.log(instance, key);
            if (key in setupState) {
                return setupState[key];
            }
        }
    });
    const component = instance.type;
    const { setup } = component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult == 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}
function setupRenderEffect(instance, vnode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container);
    vnode.el = subTree.el;
}

function render(vnode, rootContainer) {
    patch(vnode, rootContainer);
}
function patch(vnode, container) {
    const { type } = vnode;
    if (typeof type === 'string') {
        processElement(vnode, container);
    }
    else if (isObject(type)) {
        processComponent(vnode, container);
    }
}
function processElement(vnode, contaciner) {
    mountElment(vnode, contaciner);
}
function mountElment(vnode, contaciner) {
    const { type, props, children } = vnode;
    const el = vnode.el = document.createElement(type);
    if (typeof children == 'string') {
        el.innerHTML = children;
    }
    else {
        mountChildren(children, el);
    }
    mountElmentProps(props, el);
    contaciner.append(el);
}
function mountChildren(children, container) {
    children === null || children === void 0 ? void 0 : children.forEach((vnode) => {
        patch(vnode, container);
    });
}
function mountElmentProps(props, el) {
    for (const key in props) {
        const value = props[key];
        el.setAttribute(key, value);
    }
}

function createVNode(type, props = {}, children) {
    const vnode = {
        type,
        props,
        children
    };
    return vnode;
}

function createApp(roiterComponnet) {
    return createAppInstance(roiterComponnet);
}
function createAppInstance(roiterComponnet) {
    return {
        mount(rootElemnet) {
            const vnode = createVNode(roiterComponnet);
            render(vnode, rootElemnet);
        }
    };
}

function h(type, props = {}, children) {
    return createVNode(type, props, children);
}

export { createApp, h };
//# sourceMappingURL=mini-vue.esm.js.map
