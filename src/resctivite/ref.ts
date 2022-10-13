import { hasChanged, isObject } from './../shared/index';
import { isTracking, trackEffects, triggerEffects } from "./effect"
import { reactive } from './reactive.ts';



class RefImpl {

  private _value: any
  private _rawValue: any

  public __v_isRef = true

  // 依赖 自己自己单独存储
  private dep: any
  constructor (value: any) {
    this._rawValue = value
    this._value = convert(value)
    this.dep = new Set()
  }

  get value () {
    if (isTracking()) {
      trackEffects(this.dep)
    }
    return this._value
  }


  set value (newValue: any) {
    if (!hasChanged(newValue, this._rawValue)) {
      return
    }
    this._rawValue = newValue
    this._value = convert(newValue)
    triggerEffects(this.dep)
  }


}

export function convert (value: any) {
  return isObject(value) ? reactive(value) : value
}


export function ref(raw: any) {
  return new RefImpl(raw)
}

export function isRef(value: any) {
  return !!value.__v_isRef
}

export function unRef(value: any) {
  return isRef(value) ? value.value : value
}