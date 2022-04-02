import Renderer from 'render'
import World from 'world'

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

const world = new World()

async function mainLoop() {
  const canvas: HTMLCanvasElement = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!

  const renderer = new Renderer()
  const timer = new Timer(60)

  function init() {
    // Sync timer
    timer.reset()
    requestAnimationFrame(update)
  }

  function update() {
    updates += 1
    while (timer.advance()) {
      world.update()
    }

    renderer.refresh()
    world.draw(renderer)

    ctx.setTransform(canvas.width / 160, 0, 0, canvas.height / 144, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(renderer.canvas, 0, 0)

    requestAnimationFrame(update)
  }

  requestAnimationFrame(init)
}

mainLoop()

export {}
