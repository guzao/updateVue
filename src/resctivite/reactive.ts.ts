import { track, trigger } from "./effect"




export function reactive (raw: object) {
    return new Proxy(raw, {
        get (target: object, key: any) {
            let res = Reflect.get(target, key)
            // TODO  收集
            track(target, key)
            return res
        },
        set (target: object, key: any, value: any) {
            let res = Reflect.set(target, key, value)
            trigger(target, key)
            // TODO 触发
            return res
        }
    })
}
