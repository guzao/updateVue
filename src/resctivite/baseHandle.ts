import { track, trigger } from "./effect"
import { ReactiveFlags } from "./reactive.ts"

export function createGetter (isReadonly = false) {
    return function get (target: object, key: any) {

        if (key == ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key == ReactiveFlags.IS_READONLY) {
            return isReadonly
        }

        let res = Reflect.get(target, key)
        if (!isReadonly) {
            // TODO  收集
            track(target, key)
        }
        return res
    }
}

export function createSetter () {
    return function set (target: object, key: any, value: any) {
        let res = Reflect.set(target, key, value)
        trigger(target, key)
        // TODO 触发
        return res
    }
}


const get = createGetter()
const set = createSetter()

const readonlyGet = createGetter(true)



export const mutableHandlers = {
    get,
    set
};


export const readonlyHandlers = {
    get: readonlyGet,
    set (target: object, key: any, value: any) {
        console.warn(
            `Set operation on key "${String(key)}" failed: target is readonly.`,
            target
          );
        return true;
    }
};