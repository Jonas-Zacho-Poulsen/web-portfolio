import '@testing-library/jest-dom'

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

if (typeof globalThis.PointerEvent === 'undefined') {
  class PointerEventPolyfill extends MouseEvent {
    constructor(type, init) {
      super(type, init)
    }
  }
  globalThis.PointerEvent = PointerEventPolyfill
}
