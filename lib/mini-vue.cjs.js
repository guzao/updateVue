'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isObject(value) {
    return Object !== null && typeof value == 'object';
}
const hasOwn = (obj, val) => Object.prototype.hasOwnProperty.call(obj, val);

const targetMap = new Map();
function track(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
    }
    return;
}
function trigger(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap)
        return;
    let deps = depsMap.get(key);
    triggerEffects(deps);
}
function triggerEffects(deps) {
    for (const effect of deps) {
        if (effect.scheduler) {
            effect.scheduler();
        }
        else {
            effect.run();
        }
    }
}

var ReactiveFlags;
(function (ReactiveFlags) {
    ReactiveFlags["IS_REACTIVE"] = "__v_isReactive";
    ReactiveFlags["IS_READONLY"] = "__v_isReadonly";
    ReactiveFlags["RAW"] = "__v_raw";
})(ReactiveFlags || (ReactiveFlags = {}));
function reactive(raw) {
    return createReactiveObject(raw, mutableHandlers);
}
function readonly(raw) {
    return createReactiveObject(raw, readonlyHandlers);
}
function shallowReadonly(raw) {
    return createReactiveObject(raw, shallowReadonlyHandlers);
}
function createReactiveObject(raw, handle) {
    return new Proxy(raw, handle);
}

function createGetter(isReadonly = false, shallowReadonly = false) {
    return function get(target, key) {
        if (key == "__v_isReactive") {
            return !isReadonly;
        }
        else if (key == "__v_isReadonly") {
            return isReadonly;
        }
        let res = Reflect.get(target, key);
        if (shallowReadonly) {
            return res;
        }
        if (!isReadonly) {
            track(target, key);
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter() {
    return function set(target, key, value) {
        let res = Reflect.set(target, key, value);
        trigger(target, key);
        return res;
    };
}
const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const mutableHandlers = {
    get,
    set
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        return true;
    }
};
const shallowReadonlyHandlers = {
    get: shallowReadonlyGet,
    set(target, key, value) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        return true;
    }
};

const publicPropertiesMap = {
    $el: (instance) => instance.vnode.el,
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { setupState, props } = instance;
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    }
};

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
    initProps(instance, instance.type.props);
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    const component = instance.type;
    const { setup } = component;
    if (setup) {
        const setupResult = setup(shallowReadonly(instance.props));
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
function initProps(instance, rawProps) {
    instance.props = rawProps || {};
}

function render(vnode, rootContainer) {
    patch(vnode, rootContainer);
}
function patch(vnode, container) {
    const { ShapeFlag, type } = vnode;
    if (ShapeFlag & 1) {
        processElement(vnode, container);
    }
    else if (ShapeFlag & 2) {
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
const isOn = (key) => /^on/.test(key);
const getEventName = (key) => {
    return key.substring(2).toLocaleLowerCase();
};
function mountElmentProps(props, el) {
    for (const key in props) {
        const value = props[key];
        if (isOn(key)) {
            const eventNmae = getEventName(key);
            el.addEventListener(eventNmae, value);
        }
        else {
            el.setAttribute(key, value);
        }
    }
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        ShapeFlag: getShapeFlag(type)
    };
    getChildrenShapeFlag(vnode, children);
    return vnode;
}
function getShapeFlag(type) {
    return typeof type == "string" ? 1 : 2;
}
function getChildrenShapeFlag(vnode, children) {
    if (typeof children === "string") {
        vnode.shapeFlag |= 4;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag |= 8;
    }
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

exports.createApp = createApp;
exports.h = h;
//# sourceMappingURL=mini-vue.cjs.js.map
