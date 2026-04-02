// Accessibility utility functions for WCAG 2.1 AA compliance

/**
 * Generate a unique ID for accessibility attributes
 */
export function generateId(prefix = 'a11y'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if an element has sufficient color contrast
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): { ratio: number; passes: boolean } {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1]!, 16),
          g: parseInt(result[2]!, 16),
          b: parseInt(result[3]!, 16),
        }
      : null
  }

  const fg = hexToRgb(foreground)
  const bg = hexToRgb(background)

  if (!fg || !bg) return { ratio: 0, passes: false }

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!
  }

  const fgLuminance = getLuminance(fg.r, fg.g, fg.b)
  const bgLuminance = getLuminance(bg.r, bg.g, bg.b)

  // Calculate contrast ratio
  const lighter = Math.max(fgLuminance, bgLuminance)
  const darker = Math.min(fgLuminance, bgLuminance)
  const ratio = (lighter + 0.05) / (darker + 0.05)

  // Determine threshold based on level and size
  const threshold = level === 'AAA' ? (size === 'large' ? 4.5 : 7) : size === 'large' ? 3 : 4.5

  return { ratio: Math.round(ratio * 100) / 100, passes: ratio >= threshold }
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.style.position = 'absolute'
  announcement.style.left = '-10000px'
  announcement.style.width = '1px'
  announcement.style.height = '1px'
  announcement.style.overflow = 'hidden'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Trap focus within a container
 */
export function createFocusTrap(container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  return {
    activate: () => {
      firstElement?.focus()
      container.addEventListener('keydown', handleKeyDown)
    },
    deactivate: () => {
      container.removeEventListener('keydown', handleKeyDown)
    },
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Scroll element into view with accessibility considerations
 */
export function scrollIntoView(element: HTMLElement, options: ScrollIntoViewOptions = {}): void {
  const defaultOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  }

  element.scrollIntoView({ ...defaultOptions, ...options })

  // Announce to screen readers if content changed
  setTimeout(() => {
    announceToScreenReader('Content scrolled into view')
  }, 500)
}

/**
 * Generate aria-label for interactive elements
 */
export function generateAriaLabel(action: string, object?: string, context?: string): string {
  const parts = [action]
  if (object) parts.push(object)
  if (context) parts.push(`in ${context}`)
  return parts.join(' ')
}

/**
 * Validate touch target size (WCAG 2.1 2.5.5)
 */
export function validateTouchTarget(element: HTMLElement): {
  valid: boolean
  size: { width: number; height: number }
} {
  const rect = element.getBoundingClientRect()
  const minSize = 44 // 44px minimum

  return {
    valid: rect.width >= minSize && rect.height >= minSize,
    size: {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    },
  }
}

/**
 * Add keyboard navigation support
 */
export function addKeyboardNavigation(
  element: HTMLElement,
  onSelect: (element: HTMLElement) => void,
  options: {
    orientation?: 'horizontal' | 'vertical'
    loop?: boolean
    wrap?: boolean
  } = {}
) {
  const { orientation = 'vertical', loop = true, wrap = false } = options
  const items = Array.from(element.children) as HTMLElement[]
  let currentIndex = 0

  const focusItem = (index: number) => {
    if (index >= 0 && index < items.length) {
      items[index]!.focus()
      currentIndex = index
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const isVertical = orientation === 'vertical'
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft'

    switch (event.key) {
      case nextKey:
        event.preventDefault()
        if (loop) {
          focusItem((currentIndex + 1) % items.length)
        } else {
          focusItem(Math.min(currentIndex + 1, items.length - 1))
        }
        break
      case prevKey:
        event.preventDefault()
        if (loop) {
          focusItem(currentIndex === 0 ? items.length - 1 : currentIndex - 1)
        } else {
          focusItem(Math.max(currentIndex - 1, 0))
        }
        break
      case 'Home':
        event.preventDefault()
        focusItem(0)
        break
      case 'End':
        event.preventDefault()
        focusItem(items.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (items[currentIndex]) {
          onSelect(items[currentIndex]!)
        }
        break
    }
  }

  element.addEventListener('keydown', handleKeyDown)

  return {
    destroy: () => {
      element.removeEventListener('keydown', handleKeyDown)
    },
  }
}

/**
 * Create skip navigation links
 */
export function createSkipLinks(): void {
  const skipLinks = [
    { href: '#main', text: 'Skip to main content' },
    { href: '#navigation', text: 'Skip to navigation' },
  ]

  skipLinks.forEach(link => {
    const a = document.createElement('a')
    a.href = link.href
    a.textContent = link.text
    a.className = 'skip-link'
    a.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--green);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `

    a.addEventListener('focus', () => {
      a.style.top = '6px'
    })

    a.addEventListener('blur', () => {
      a.style.top = '-40px'
    })

    document.body.insertBefore(a, document.body.firstChild)
  })
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Apply reduced motion to animations
 */
export function applyReducedMotion(element: HTMLElement): void {
  if (prefersReducedMotion()) {
    element.style.setProperty('--transition', 'none')
    element.style.setProperty('--animation', 'none')
  }
}
