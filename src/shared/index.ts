export function isObject (value) {
    return Object !== null && typeof value == 'object'
}


export const hasChanged = (newValue, value) => !Object.is(newValue, value)

export const hasOwn = (obj, val) => Object.prototype.hasOwnProperty.call(obj, val)