import Renderer from 'render'

let updates = 0

class Timer {
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

async function mainLoop() {
  const canvas: HTMLCanvasElement = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!

  const renderer = new Renderer()
  const timer = new Timer(60)

  function update() {
    if (timer.tics == 0) {
      // Sync timer
      timer.reset()
    }

    updates += 1
    while (timer.advance()) {
      // Advance game logic
    }

    renderer.render()

    ctx.setTransform(canvas.width / 160, 0, 0, canvas.height / 144, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(renderer.canvas, 0, 0)

    requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

mainLoop()

export {}
