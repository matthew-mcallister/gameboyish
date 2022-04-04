import { Actor, RenderContext, UpdateContext } from 'actor'
import assets from 'asset'
import { SpritesheetFont } from 'font'
import Sprite from 'sprite'

export class Fonts {
  smallfont: SpritesheetFont

  constructor() {
    this.smallfont = assets.get('smallfont')! as SpritesheetFont
  }
}

export const fonts = new Fonts()

const X_START = -50
const Y_START = 120
const X_END = 210

export class Car implements Actor {
  sprite: Sprite
  offset: [number, number]

  constructor() {
    this.sprite = assets.get('car')! as Sprite
    this.offset = [X_START, Y_START]
  }

  update(ctx: UpdateContext) {
    this.offset[0] = this.offset[0] + 1
    if (this.offset[0] > X_END) {
      this.offset[0] = X_START
    }
  }

  draw(ctx: RenderContext) {
    this.sprite.draw(ctx.renderer, this.offset)
    if (Math.floor(ctx.timer.tics / 30) % 2 === 0) {
      let [x, y] = this.offset
      x -= 35
      y -= 72
      const str = 'the quick brown\nfox jumps over\nthe lazy dog'
      fonts.smallfont.drawString(ctx.renderer, str, [x, y])
    }
  }
}

export default class World implements Actor {
  car: Car

  constructor() {
    this.car = new Car()
  }

  update(ctx: UpdateContext) {
    this.car.update(ctx)
  }

  draw(ctx: RenderContext) {
    this.car.draw(ctx)
  }
}
