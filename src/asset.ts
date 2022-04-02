import Sprite from 'sprite'

export type Asset = Sprite

async function loadAssets(manifestUrl: string) {
  const manifest = await (await fetch(manifestUrl)).json()
  let assets: Map<string, Asset> = new Map()
  for (const [name, dict_] of Object.entries(manifest.assets)) {
    const dict: any = dict_
    switch (dict.type) {
      case 'sprite':
        assets.set(name, Sprite.fromJson(dict))
        break
      default:
        throw new Error(`Unknown asset type: ${dict.type}`)
    }
  }
  return assets
}

export default await loadAssets('manifest.json')
