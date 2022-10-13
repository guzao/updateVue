import { ReactiveEffect } from './effect'

class ComputedImpl {
 
  
  private _value: any
  private _getter: any
  private dirt = true

  private effect: ReactiveEffect
  constructor (getter: Function) {
    this._getter = getter
    this.effect = new ReactiveEffect(getter, () => {
      if (!this.dirt) {
        this.dirt = true
      }
    })
  }

  get value () {
    
    if (this.dirt) {
      this.dirt = false
      this._value = this.effect.run()
    }
    return this._value
  }

}

export function computed (get: Function) {
  return new ComputedImpl(get)
}