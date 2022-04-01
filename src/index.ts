import number from 'foo'

console.log(number)

async function mainLoop() {
  const canvas: HTMLCanvasElement = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = 'red'
  ctx.fillRect(10, 10, 100, 100)
}

mainLoop()

export {}
