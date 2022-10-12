interface Effect {
    scheduler?: Function
}

type Scheduler  = Function | undefined

class ReactiveEffect {

    private _fn: Function

    public scheduler: Scheduler

    /** 一个值可能存在多个依赖 放在数组中收集 */
    public dep: ReactiveEffect [] = []

    constructor (fn: Function, _scheduler: Scheduler) {
        this.scheduler = _scheduler
        this._fn = fn
    }

    run () {
        activeEffect = this
        const reult = this._fn()
        return reult
    }

}


const targetMap: Map<object, Map<any, Set<ReactiveEffect>>> = new Map()

/** 收集依赖 */
export function track (target: object, key: any) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
        deps = new Set()
        depsMap.set(key, deps)
    }

    deps.add(activeEffect)

    try { 
        activeEffect.dep.push(activeEffect)
    } catch (error) {
        console.warn('请配合effect 使用')
    }
    
}




/** 触发依赖 */
export function trigger (target: object, key: any) {

    let depsMap = targetMap.get(target)
    if (!depsMap) return
    let deps = depsMap.get(key)!
    for (const effect of deps) {
        if ( effect.scheduler ) {
            effect.scheduler ()
        } else {
            effect.run()
        }
    }

}




let activeEffect: ReactiveEffect


export function effect (fn: Function, options: Effect = {}) {
    const { scheduler } = options
    const _effect = new ReactiveEffect(fn, scheduler)
    _effect.run()

    return _effect.run.bind(_effect)
}