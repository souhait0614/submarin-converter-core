import * as packageJson from "../package.json"
//import * as cjp from "cjp"

interface SCInput {
  target: string | string[]
  converter: SCConverter[]
}
interface SCConverter {
  name: string
  option?: any | any[]
}

const defaultConverter = {
  cjp: require('cjp').generate
}

class SC {
  version: string = packageJson.version

  //constructor(option: {}) {}

  test(): void {
    console.log(defaultConverter.cjp("テスト"))
  }

  convert(input: SCInput): {} {
    if (typeof input !== "object" || input === null)
      throw new TypeError("引数おかしいで")
    if (typeof input.target !== "string" && !Array.isArray(input.target))
      throw new TypeError("変換対象おかしいで")
    if (!Array.isArray(input.converter))
      throw new TypeError("変換指定おかしいで")

    const output = {}

    return output
  }
}

export { SC }
