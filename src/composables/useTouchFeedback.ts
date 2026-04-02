import { ref, onMounted, onUnmounted } from 'vue'

export interface TouchFeedbackOptions {
  scale?: number
  opacity?: number
  duration?: number
  disabled?: boolean
}

export function useTouchFeedback(options: TouchFeedbackOptions = {}) {
  const {
    scale = 0.95,
    opacity = 0.8,
    duration = 150,
    disabled = false
  } = options

  const isPressed = ref(false)
  const isHovered = ref(false)

  let pressTimer: number | null = null

  const handlePressStart = () => {
    if (disabled) return
    
    isPressed.value = true
    clearTimeout(pressTimer!)
  }

  const handlePressEnd = () => {
    if (disabled) return
    
    pressTimer = window.setTimeout(() => {
      isPressed.value = false
    }, duration)
  }

  const handleMouseEnter = () => {
    if (disabled) return
    isHovered.value = true
  }

  const handleMouseLeave = () => {
    if (disabled) return
    isHovered.value = false
  }

  const handleTouchStart = (e: TouchEvent) => {
    if (disabled) return
    e.preventDefault()
    handlePressStart()
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (disabled) return
    e.preventDefault()
    handlePressEnd()
  }

  const cleanup = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      pressTimer = null
    }
  }

  onUnmounted(cleanup)

  return {
    isPressed,
    isHovered,
    handlePressStart,
    handlePressEnd,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    cleanup
  }
}

export function getTouchFeedbackStyles(
  isPressed: boolean,
  isHovered: boolean,
  options: TouchFeedbackOptions = {}
) {
  const { scale = 0.95, opacity = 0.8 } = options

  return {
    transform: isPressed ? `scale(${scale})` : 'scale(1)',
    opacity: isPressed ? opacity : 1,
    transition: `transform ${options.duration || 150}ms ease, opacity ${options.duration || 150}ms ease`,
    cursor: isHovered ? 'pointer' : 'default'
  }
}

// CSS classes for touch feedback
export const touchFeedbackClasses = {
  base: 'touch-feedback',
  pressed: 'touch-feedback--pressed',
  disabled: 'touch-feedback--disabled'
}

export default useTouchFeedback
