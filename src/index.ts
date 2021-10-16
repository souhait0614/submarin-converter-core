import * as packageJson from "../package.json"
import merge from "deepmerge"

interface SCInput {
  target: string
  converter: SCConverter[]
}
interface SCConverter {
  name: string
  option: any[]
  status?: string
  error?: unknown
}
interface SCOptions {
  converter: {
    [key: string]: Function
  }
}
interface SCOutput {
  text: string
  result: SCConverter[]
}

class SC {
  version: string = packageJson.version
  options: SCOptions = {
    converter: {
      "cjp": require("cjp").generate,
      "genhera": require("genhera").generate,
      "nomlish": require("nomlish").translate,
      "5000choyen": require("../modules/5000choyen-api-node.min"),
      "slackEmoji": require("../modules/slackEmojiGen.min"),
    },
  }

  constructor(userOptions: SCOptions | {} = {}) {
    const defaultOption = this.options
    this.options = merge(defaultOption, userOptions)
  }

  async convert(input: SCInput): Promise<SCOutput> {
    if (typeof input !== "object" || input === null)
      throw new TypeError("The argument is unentered or not an object.")
    if (typeof input.target !== "string" && !Array.isArray(input.target))
      throw new TypeError("The target is unentered or is not a string.")
    if (!Array.isArray(input.converter))
      throw new TypeError("The converter is unentered or is not an object.")
    const output: SCOutput = {
      text: input.target,
      result: input.converter,
    }
    for (const [index, val] of input.converter.entries()) {
      const beforeText: string = output.text
      try {
        val.option || (val.option = [])
        if (!Array.isArray(val.option))
          throw new TypeError("The option is unentered or is not an array.")
        output.text = await this.options.converter[val.name](
          ...[output.text, ...val.option]
        )
        output.result[index].status = "success"
      } catch (error) {
        output.text = beforeText
        output.result[index].status = "error"
        output.result[index].error = error
      }
    }
    return output
  }
}

export { SC }
