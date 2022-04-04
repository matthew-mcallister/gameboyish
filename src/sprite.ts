import Renderer from 'render'

export default class Sprite {
  src: string
  image: HTMLImageElement
  offset: [number, number]

  constructor(args: { src: string; offset: [number, number] }) {
    this.src = args.src
    this.image = new Image()
    this.image.src = this.src
    this.offset = args.offset
  }

  static fromJson(json: any): Sprite {
    return new Sprite(json)
  }

  draw(renderer: Renderer, offset: [number, number]) {
    const x = this.offset[0] + offset[0]
    const y = this.offset[1] + offset[1]
    renderer.ctx.drawImage(this.image, x, y)
  }
}
