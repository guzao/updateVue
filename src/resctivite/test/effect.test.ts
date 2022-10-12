import { describe, expect, it } from 'vitest'
import { effect } from '../effect'
import { reactive } from '../reactive.ts'

describe('reactive', () => {
    
    it('happy path', () => {
        let number = 10
        const origin = { count: 1 }
        const observerObj = reactive(origin)
        effect(() => {
            number ++
            observerObj.count
        })
        expect(number).toBe(11)
        observerObj.count = observerObj.count + 1
        expect(number).toBe(12)
        observerObj.count = observerObj.count + 1
        expect(number).toBe(13)
    })


    it('showd return ', () => {
        let number = 10
        const origin = { count: 1 }
        const observerObj = reactive(origin)
        const renner = effect(() => {
            number ++
            observerObj.count
            return 'foo'
        })
        renner()
        expect(number).toBe(12)
        const res = renner()
        expect(number).toBe(13)
        expect(res).toBe('foo')
    })


    it('showd return  ', () => {
        let number = 10
        const origin = { count: 1 }
        const observerObj = reactive(origin)
        const renner = effect(() => {
            number ++
            observerObj.count
            return 'foo'
        })
        renner()
        expect(number).toBe(12)
        const res = renner()
        expect(number).toBe(13)
        expect(res).toBe('foo')
        observerObj.count = observerObj.count + 1
    })


    it('scheduler  ', () => {
        let number = 10
        const origin = { count: 1 }
        const observerObj = reactive(origin)
        const renner = effect(
            () => {
                number ++
                observerObj.count
                return 'foo'
            },
            {
                scheduler: () => {
                    console.log('========[]=======')
                }
            }
        )
        // 1
        renner()
        expect(number).toBe(12)
        // 2
        observerObj.count = observerObj.count + 1
        observerObj.count = observerObj.count + 1
        observerObj.count = observerObj.count + 1
        observerObj.count = observerObj.count + 1
        observerObj.count = observerObj.count + 1
        renner()
        expect(number).toBe(13)


    })



})