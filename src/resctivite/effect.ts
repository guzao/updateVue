interface Effect {
    scheduler?: Function,
    onStop?: Function,
}
interface EffectReturnType {
    (): any,
    effect: ReactiveEffect
}

type Scheduler  = Function | undefined
type OnStop  = Function | undefined


const targetMap: Map<object, Map<any, Set<ReactiveEffect>>> = new Map()
// targetMap ==> target      ==> key     ==> ReactiveEffect
// 全局容器   ==> 目标对象    ==> 对象key  ==> 对应依赖

let activeEffect: ReactiveEffect

let showdTrack: boolean = true


class ReactiveEffect {

    private _fn: Function

    public scheduler: Scheduler
    public onStop: OnStop

    /** 标识是否为被执行 stop 方法 */
    private active: boolean =  true

    /** 一个值可能存在多个依赖 放在数组中收集 */
    public dep: any = []

    constructor (fn: Function, _scheduler: Scheduler, _onStop: OnStop) {
        this.scheduler = _scheduler
        this.onStop = _onStop
        this._fn = fn
    }

    run () {

        /** 已经stop后 不在收集依赖 */ 
        if (!this.active) {
            return this._fn();
        }

        showdTrack = true
        activeEffect = this
        const reult = this._fn()
        showdTrack = false
        return reult
    }

    stop () {
        if (this.active) {
            this.dep.forEach((dep: Set<ReactiveEffect>) => {
                dep.delete(this)
            })
            this.dep.length = 0
            this.active = false
            this.onStop && this.onStop()
        }
    }
}



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
    
    if (!isTracking()) return 

    /** 对应的依赖 */
    deps.add(activeEffect)
    
    // 收集响应式对象key值的依赖
    activeEffect.dep.push(deps)

}


/** 是否应该收集依赖 */
export function isTracking () {
    return activeEffect !== undefined && showdTrack
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

export function stop (runner: EffectReturnType) {
runner.effect.stop()
}



export function effect (fn: Function, options: Effect = {}): EffectReturnType {
    const { scheduler, onStop } = options
    const _effect = new ReactiveEffect(fn, scheduler, onStop)
    _effect.run()
    const result = _effect.run.bind(_effect)
    result.effect = _effect
    return result
}