import Renderer from 'render'
import Timer from 'timer'

export interface Actor {
  update(ctx: UpdateContext): void
  draw(ctx: RenderContext): void
}

export class UpdateContext {
  timer: Timer

  constructor(timer: Timer) {
    this.timer = timer
  }
}

export class RenderContext {
  timer: Timer
  renderer: Renderer

  constructor(timer: Timer, renderer: Renderer) {
    this.timer = timer
    this.renderer = renderer
  }
}
