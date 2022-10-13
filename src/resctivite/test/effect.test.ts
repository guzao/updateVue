import { describe, expect, it,  vi } from 'vitest'
import { effect, stop } from '../effect'
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


    it('showd return renner ', () => {
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
        renner()
        expect(number).toBe(13)


    })

    it("stop", () => {
        let dummy;
        const obj = reactive({ prop: 1 });
        const runner = effect(() => {
            dummy = obj.prop;
        });
        obj.prop = 2;
        expect(dummy).toBe(2);
        stop(runner);
        stop(runner);
        stop(runner);
        // obj.prop = 3
        obj.prop++;
        expect(dummy).toBe(2);

        // stopped effect should still be manually callable
        runner();
        expect(dummy).toBe(3);
    });
    
    it("events: onStop", () => {
        const onStop = vi.fn();
        const runner = effect(() => {}, {
          onStop,
        });
    
        stop(runner);
        expect(onStop).toHaveBeenCalled();
    });

})