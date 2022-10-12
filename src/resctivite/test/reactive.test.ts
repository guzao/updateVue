import { describe, expect, it } from 'vitest'
import { reactive } from '../reactive.ts'

describe('reactive', () => {
    it('happy path', () => {
        const origin = { number: 10 }
        const obj = reactive(origin)
        expect(obj).not.toBe(origin)
    })
})