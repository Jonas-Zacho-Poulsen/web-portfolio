import { render, fireEvent, cleanup } from '@testing-library/react'
import { act } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { ChatContainer } from '../ChatContainer'

const VIEWPORT_W = 1024
const VIEWPORT_H = 768
const CHAT_W = 350
const CHAT_H = 400
const PADDING = 20
const START_X = VIEWPORT_W - CHAT_W - PADDING
const START_Y = VIEWPORT_H - CHAT_H - PADDING

beforeEach(() => {
  Object.defineProperty(window, 'innerWidth', {
    value: VIEWPORT_W,
    configurable: true,
  })
  Object.defineProperty(window, 'innerHeight', {
    value: VIEWPORT_H,
    configurable: true,
  })
  useChatStore.setState({
    isOpen: true,
    chatPosition: { x: START_X, y: START_Y },
    chatSize: { width: CHAT_W, height: CHAT_H },
    messages: [],
    isLoading: false,
    error: null,
  })
})

afterEach(() => {
  cleanup()
  useChatStore.setState(useChatStore.getInitialState())
})

  const getHeader = () => {
    const header = document.querySelector('.cursor-move')
    if (!header) throw new Error('Header not found')
    return header as HTMLElement
  }

describe('ChatContainer drag', () => {
  it('renders when isOpen is true', () => {
    const { container } = render(<ChatContainer />)
    expect(container.querySelector('.cursor-move')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    useChatStore.setState({ isOpen: false })
    const { container } = render(<ChatContainer />)
    expect(container.querySelector('.cursor-move')).not.toBeInTheDocument()
  })

  it('starts drag on pointerdown on header and updates position on pointermove', () => {
    render(<ChatContainer />)
    const header = getHeader()

    act(() => {
      fireEvent.pointerDown(header, { clientX: START_X + 20, clientY: START_Y + 20 })
    })
    act(() => {
      fireEvent.pointerMove(window, {
        clientX: START_X + 30,
        clientY: START_Y + 30,
      })
    })

    const state = useChatStore.getState()
    expect(state.chatPosition.x).toBe(START_X + 10)
    expect(state.chatPosition.y).toBe(START_Y + 10)
  })

  it('constrains chat to left edge of viewport (x >= 0)', () => {
    render(<ChatContainer />)
    const header = getHeader()

    act(() => {
      fireEvent.pointerDown(header, { clientX: 200, clientY: 200 })
    })
    act(() => {
      fireEvent.pointerMove(window, { clientX: -700, clientY: 200 })
    })

    const state = useChatStore.getState()
    expect(state.chatPosition.x).toBe(0)
  })

  it('constrains chat to top edge of viewport (y >= 0)', () => {
    render(<ChatContainer />)
    const header = getHeader()

    act(() => {
      fireEvent.pointerDown(header, { clientX: 200, clientY: 200 })
    })
    act(() => {
      fireEvent.pointerMove(window, { clientX: 200, clientY: -500 })
    })

    const state = useChatStore.getState()
    expect(state.chatPosition.y).toBe(0)
  })

  it('constrains chat to right edge of viewport', () => {
    const narrowW = 800
    Object.defineProperty(window, 'innerWidth', {
      value: narrowW,
      configurable: true,
    })
    useChatStore.setState({
      chatPosition: { x: narrowW - CHAT_W - PADDING, y: START_Y },
    })

    render(<ChatContainer />)
    const header = getHeader()

    act(() => {
      fireEvent.pointerDown(header, { clientX: 200, clientY: 200 })
    })
    act(() => {
      fireEvent.pointerMove(window, { clientX: 600, clientY: 200 })
    })

    const state = useChatStore.getState()
    expect(state.chatPosition.x).toBe(narrowW - CHAT_W)
  })

  it('constrains chat to bottom edge of viewport', () => {
    const shortH = 600
    Object.defineProperty(window, 'innerHeight', {
      value: shortH,
      configurable: true,
    })
    useChatStore.setState({
      chatPosition: { x: START_X, y: shortH - CHAT_H - PADDING },
    })

    render(<ChatContainer />)
    const header = getHeader()

    act(() => {
      fireEvent.pointerDown(header, { clientX: 200, clientY: 200 })
    })
    act(() => {
      fireEvent.pointerMove(window, { clientX: 200, clientY: 550 })
    })

    const state = useChatStore.getState()
    expect(state.chatPosition.y).toBe(shortH - CHAT_H)
  })

  it('ends drag on pointerup', () => {
    render(<ChatContainer />)
    const header = getHeader()

    act(() => {
      fireEvent.pointerDown(header, { clientX: START_X + 20, clientY: START_Y + 20 })
    })
    act(() => {
      fireEvent.pointerMove(window, {
        clientX: START_X + 30,
        clientY: START_Y + 30,
      })
    })
    act(() => {
      fireEvent.pointerUp(window, {
        clientX: START_X + 30,
        clientY: START_Y + 30,
      })
    })

    act(() => {
      fireEvent.pointerMove(window, {
        clientX: START_X + 100,
        clientY: START_Y + 100,
      })
    })

    const state = useChatStore.getState()
    expect(state.chatPosition.x).toBe(START_X + 10)
    expect(state.chatPosition.y).toBe(START_Y + 10)
  })

  it('does not start drag when clicking a button in the header', () => {
    render(<ChatContainer />)
    const button = document.querySelector('button[title="Close chat"]')
    if (!button) throw new Error('Close button not found')

    act(() => {
      fireEvent.pointerDown(button, {
        clientX: START_X + 20,
        clientY: START_Y + 20,
      })
    })
    act(() => {
      fireEvent.pointerMove(window, {
        clientX: START_X + 100,
        clientY: START_Y + 100,
      })
    })

    const state = useChatStore.getState()
    expect(state.chatPosition.x).toBe(START_X)
    expect(state.chatPosition.y).toBe(START_Y)
  })

  describe('resize', () => {
    const getResizeInContainer = (container: HTMLElement, direction: string) => {
      const handle = container.querySelector(`[data-direction="${direction}"]`)
      if (!handle) throw new Error(`Resize handle ${direction} not found`)
      return handle as HTMLElement
    }

    it('SE corner: dragging right/down increases size, position clamped to viewport', () => {
      const { container } = render(<ChatContainer />)
      const handle = getResizeInContainer(container, 'se')

      act(() => {
        fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 })
      })
      act(() => {
        fireEvent.pointerMove(window, { clientX: 150, clientY: 120 })
      })
      act(() => {
        fireEvent.pointerUp(window, { clientX: 150, clientY: 120 })
      })

      const state = useChatStore.getState()
      expect(state.chatSize.width).toBe(CHAT_W + 50)
      expect(state.chatSize.height).toBe(CHAT_H + 20)
      expect(state.chatPosition.x).toBe(VIEWPORT_W - (CHAT_W + 50))
      expect(state.chatPosition.y).toBe(START_Y)
    })

    it('SE corner: dragging left/up decreases size', () => {
      const { container } = render(<ChatContainer />)
      const handle = getResizeInContainer(container, 'se')

      act(() => {
        fireEvent.pointerDown(handle, { clientX: 200, clientY: 200 })
      })
      act(() => {
        fireEvent.pointerMove(window, { clientX: 150, clientY: 180 })
      })
      act(() => {
        fireEvent.pointerUp(window, { clientX: 150, clientY: 180 })
      })

      const state = useChatStore.getState()
      expect(state.chatSize.width).toBe(CHAT_W - 50)
      expect(state.chatSize.height).toBe(CHAT_H - 20)
      expect(state.chatPosition.x).toBe(START_X)
      expect(state.chatPosition.y).toBe(START_Y)
    })

    it('NW corner: dragging right/down shrinks window, position shifts right/down', () => {
      const { container } = render(<ChatContainer />)
      const handle = getResizeInContainer(container, 'nw')

      act(() => {
        fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 })
      })
      act(() => {
        fireEvent.pointerMove(window, { clientX: 150, clientY: 120 })
      })
      act(() => {
        fireEvent.pointerUp(window, { clientX: 150, clientY: 120 })
      })

      const state = useChatStore.getState()
      expect(state.chatSize.width).toBe(CHAT_W - 50)
      expect(state.chatSize.height).toBe(CHAT_H - 20)
      expect(state.chatPosition.x).toBe(START_X + 50)
      expect(state.chatPosition.y).toBe(START_Y + 20)
    })

    it('NW corner: dragging left/up grows window, position shifts left/up', () => {
      const { container } = render(<ChatContainer />)
      const handle = getResizeInContainer(container, 'nw')

      act(() => {
        fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 })
      })
      act(() => {
        fireEvent.pointerMove(window, { clientX: 50, clientY: 80 })
      })
      act(() => {
        fireEvent.pointerUp(window, { clientX: 50, clientY: 80 })
      })

      const state = useChatStore.getState()
      expect(state.chatSize.width).toBe(CHAT_W + 50)
      expect(state.chatSize.height).toBe(CHAT_H + 20)
      expect(state.chatPosition.x).toBe(START_X - 50)
      expect(state.chatPosition.y).toBe(START_Y - 20)
    })

    it('SW corner: dragging right shrinks width, position shifts right', () => {
      const { container } = render(<ChatContainer />)
      const handle = getResizeInContainer(container, 'sw')

      act(() => {
        fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 })
      })
      act(() => {
        fireEvent.pointerMove(window, { clientX: 150, clientY: 100 })
      })
      act(() => {
        fireEvent.pointerUp(window, { clientX: 150, clientY: 100 })
      })

      const state = useChatStore.getState()
      expect(state.chatSize.width).toBe(CHAT_W - 50)
      expect(state.chatPosition.x).toBe(START_X + 50)
      expect(state.chatPosition.y).toBe(START_Y)
    })

    it('NE corner: dragging down shrinks height, position shifts down', () => {
      const { container } = render(<ChatContainer />)
      const handle = getResizeInContainer(container, 'ne')

      act(() => {
        fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 })
      })
      act(() => {
        fireEvent.pointerMove(window, { clientX: 100, clientY: 150 })
      })
      act(() => {
        fireEvent.pointerUp(window, { clientX: 100, clientY: 150 })
      })

      const state = useChatStore.getState()
      expect(state.chatSize.height).toBe(CHAT_H - 50)
      expect(state.chatPosition.y).toBe(START_Y + 50)
      expect(state.chatPosition.x).toBe(START_X)
    })

    it('resize does not trigger positionChatInViewport (position stays where user placed it)', () => {
      const movedX = 300
      const movedY = 200
      useChatStore.setState({
        chatPosition: { x: movedX, y: movedY },
      })

      const { container } = render(<ChatContainer />)
      const handle = getResizeInContainer(container, 'se')

      act(() => {
        fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 })
      })
      act(() => {
        fireEvent.pointerMove(window, { clientX: 200, clientY: 200 })
      })
      act(() => {
        fireEvent.pointerUp(window, { clientX: 200, clientY: 200 })
      })

      const state = useChatStore.getState()
      expect(state.chatSize.width).toBe(CHAT_W + 100)
      expect(state.chatSize.height).toBe(CHAT_H + 100)
      expect(state.chatPosition.x).toBe(movedX)
      expect(state.chatPosition.y).toBe(movedY)
    })

    it('resize clamps below minimum width and height', () => {
      useChatStore.setState({
        chatSize: { width: CHAT_W, height: CHAT_H },
      })
      const { container } = render(<ChatContainer />)
      const handle = getResizeInContainer(container, 'se')

      act(() => {
        fireEvent.pointerDown(handle, { clientX: 500, clientY: 500 })
      })
      act(() => {
        fireEvent.pointerMove(window, { clientX: 50, clientY: 50 })
      })
      act(() => {
        fireEvent.pointerUp(window, { clientX: 50, clientY: 50 })
      })

      const state = useChatStore.getState()
      expect(state.chatSize.width).toBe(300)
      expect(state.chatSize.height).toBe(350)
    })
  })
})
