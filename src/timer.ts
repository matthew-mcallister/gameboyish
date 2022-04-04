export default class Timer {
  fps: number
  time: number
  tics: number

  constructor(fps: number) {
    this.fps = fps
    this.time = performance.now()
    this.tics = 0
  }

  reset() {
    this.time = performance.now()
  }

  advance() {
    let newTime = performance.now()
    let frameTime = 1000 / this.fps
    if (newTime - this.time > frameTime) {
      this.time += frameTime
      this.tics += 1
      return true
    }
    return false
  }
}
