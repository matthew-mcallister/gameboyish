import assets from 'asset'
import Renderer from 'render'
import Sprite from 'sprite'

export class Car {
  sprite: Sprite
  offset: [number, number]

  constructor() {
    this.sprite = assets.get('car')!
    this.offset = [-50, 80]
  }

  update() {
    this.offset[0] = this.offset[0] + 2
    if (this.offset[0] > 210) {
      this.offset[0] = -50
    }
  }

  draw(renderer: Renderer) {
    this.sprite.draw(renderer, this.offset)
  }
}

export default class World {
  car: Car

  constructor() {
    this.car = new Car()
  }

  update() {
    this.car.update()
  }

  draw(renderer: Renderer) {
    this.car.draw(renderer)
  }
}
