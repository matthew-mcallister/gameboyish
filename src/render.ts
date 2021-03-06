export default class Renderer {
  canvas: HTMLCanvasElement
  // @ts-ignore
  ctx: CanvasRenderingContext2D
  i: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.i = 0

    this.ctx = canvas.getContext('2d')!
    this.ctx.imageSmoothingEnabled = false
    this.ctx.save()
  }

  refresh() {
    this.ctx.restore()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  render() {
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(4, 4, 152, 136)
    this.i += 1
  }
}
