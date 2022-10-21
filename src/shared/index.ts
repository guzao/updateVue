export function isObject (value) {
    return Object !== null && typeof value == 'object'
}


export const hasChanged = (newValue, value) => !Object.is(newValue, value)


const validEventRep = /^on/
export const isOn = (str: string) => validEventRep.test(str) 
export const getEventName = (key: string) => key.substring(2).toLocaleLowerCase()