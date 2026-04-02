export interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private observers: PerformanceObserver[] = []

  constructor() {
    this.init()
  }

  private init() {
    // Only run in browser
    if (typeof window === 'undefined') return

    this.measureFCP()
    this.measureLCP()
    this.measureFID()
    this.measureCLS()
    this.measureTTFB()
  }

  private measureFCP() {
    try {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries()
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime
        }
      })
      observer.observe({ entryTypes: ['paint'] })
      this.observers.push(observer)
    } catch (e) {
      console.warn('FCP measurement not supported')
    }
  }

  private measureLCP() {
    try {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          this.metrics.lcp = lastEntry.startTime
        }
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(observer)
    } catch (e) {
      console.warn('LCP measurement not supported')
    }
  }

  private measureFID() {
    try {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          if (entry.name === 'first-input') {
            const fidEntry = entry as any
            this.metrics.fid = fidEntry.processingStart - fidEntry.startTime
          }
        })
      })
      observer.observe({ entryTypes: ['first-input'] })
      this.observers.push(observer)
    } catch (e) {
      console.warn('FID measurement not supported')
    }
  }

  private measureCLS() {
    try {
      let clsValue = 0
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        })
        this.metrics.cls = clsValue
      })
      observer.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(observer)
    } catch (e) {
      console.warn('CLS measurement not supported')
    }
  }

  private measureTTFB() {
    if (performance.timing) {
      this.metrics.ttfb = performance.timing.responseStart - performance.timing.requestStart
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  logMetrics() {
    console.table(this.metrics)
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Utility function to measure component render time
export function measureRenderTime(componentName: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      const start = performance.now()
      const result = originalMethod.apply(this, args)
      const end = performance.now()
      console.log(`${componentName}.${propertyKey} took ${end - start} milliseconds`)
      return result
    }
    return descriptor
  }
}
