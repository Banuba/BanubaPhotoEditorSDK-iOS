/** 
 * globalThis polyfill for MacOS/iOS Safari < 14
 * @see https://wiki.duktape.org/howtoglobalobjectreference
 */
if (typeof globalThis === "undefined") {
    const globalThis = new Function("return this")()
    Object.defineProperty(globalThis, "globalThis", {
        value: globalThis,
        writable: true,
        enumerable: false,
        configurable: true,
    })
}
