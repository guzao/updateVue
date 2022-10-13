import { mutableHandlers, readonlyHandlers } from "./baseHandle";

export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadonly",
    RAW = "__v_raw",
}


export function reactive (raw: object) {
    return createReactiveObject(raw, mutableHandlers)
}

export function readonly (raw: object) {
    return createReactiveObject(raw, readonlyHandlers)
}

function createReactiveObject (raw, handle) {
    return new Proxy(raw, handle)
}

export function isProxy (value: any) {
    return isReactive(value) || isReadonly(value)
}


export function isReadonly (value: any) {
    return !!value[ReactiveFlags.IS_READONLY]
}

export function isReactive (value: any) {
    return !!value[ReactiveFlags.IS_REACTIVE]
}