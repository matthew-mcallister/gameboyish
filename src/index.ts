import { RenderContext, UpdateContext } from 'actor'
import Renderer from 'render'
import Timer from 'timer'
import World from 'world'

let updates = 0

const world = new World()

async function mainLoop() {
  const canvas: HTMLCanvasElement = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement

  const renderer = new Renderer(canvas)
  const timer = new Timer(60)

  function init() {
    // Sync timer
    timer.reset()
    requestAnimationFrame(update)
  }

  function update() {
    updates += 1
    while (timer.advance()) {
      world.update(new UpdateContext(timer))
    }

    renderer.refresh()
    world.draw(new RenderContext(timer, renderer))

    requestAnimationFrame(update)
  }

  requestAnimationFrame(init)
}

mainLoop()

export {}
