import Renderer from 'render'

interface SpriteCharJson {
  x: number
  y: number
  width: number
  height: number
  kerning: number
}

interface SpriteCharDefaults {
  height: number
  kerning: number
}

class SpriteChar {
  x: number
  y: number
  width: number
  height: number
  kerning: number

  constructor(args: SpriteCharJson) {
    this.x = args.x
    this.y = args.y
    this.width = args.width
    this.height = args.height
    this.kerning = args.kerning
  }

  static fromJson(json: SpriteCharJson) {
    return new SpriteChar(json)
  }
}

interface SpritesheetFontJson {
  src: string
  spacewidth: number
  lineheight: number
  placeholder: string
  defaults: SpriteCharDefaults
  chars: { [key: string]: SpriteCharJson }
  duplicates?: { [key: string]: string }
}

// TODO: Make an actual spritesheet class?
export class SpritesheetFont {
  public readonly src: string
  public readonly spaceWidth: number
  public readonly lineHeight: number
  public readonly placeholder: string
  public readonly defaults: SpriteCharDefaults

  private readonly placeholderChar: SpriteChar
  private readonly srcImage: HTMLImageElement
  private chars: Map<number, SpriteChar>

  constructor(args: SpritesheetFontJson) {
    this.src = args.src
    this.spaceWidth = args.spacewidth
    this.lineHeight = args.lineheight
    this.defaults = args.defaults
    this.placeholder = args.placeholder

    this.srcImage = new Image()
    this.srcImage.src = this.src

    this.chars = new Map()
    this.loadChars(args.chars)
    if (args.duplicates) {
      this.loadDuplicates(args.duplicates)
    }

    this.placeholderChar = this.chars.get(this.placeholder.charCodeAt(0))!
  }

  static fromJson(json: SpritesheetFontJson) {
    return new SpritesheetFont(json)
  }

  loadChars(chars: { [key: string]: SpriteCharJson }) {
    for (let [c, def] of Object.entries(chars)) {
      const sprite = new SpriteChar({ ...this.defaults, ...def })
      this.chars.set(c.charCodeAt(0), sprite)
    }
  }

  loadDuplicates(duplicates: { [key: string]: string }) {
    for (let [c, src] of Object.entries(duplicates)) {
      this.chars.set(c.charCodeAt(0), this.chars.get(src.charCodeAt(0))!)
    }
  }

  private getChar(c: string): SpriteChar {
    return this.chars.get(c.charCodeAt(0)) || this.placeholderChar
  }

  private drawCharInner(
    renderer: Renderer,
    char: SpriteChar,
    offset: [number, number]
  ) {
    renderer.ctx.drawImage(
      this.srcImage,
      char.x,
      char.y,
      char.width,
      char.height,
      offset[0],
      offset[1],
      char.width,
      char.height
    )
  }

  drawString(renderer: Renderer, s: string, offset: [number, number]) {
    let [x, y] = offset
    for (let c of s) {
      if (c == ' ') {
        x += this.spaceWidth
        continue
      } else if (c == '\n') {
        y += this.lineHeight
        x = offset[0]
        continue
      }

      const char = this.getChar(c)
      this.drawCharInner(renderer, char, [x, y])
      x += char.width + char.kerning
    }
  }
}
