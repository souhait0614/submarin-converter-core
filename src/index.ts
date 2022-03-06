import * as packageJson from "../package.json"
import merge from "deepmerge"

export interface SCInput {
  text: string
  converter: SCConverter[]
}
export interface SCConverter {
  name: string
  option: any[]
  text?: string
  fallback?: number
  status?: string
  error?: unknown[]
}
export interface SCOptions {
  converter: {
    [key: string]: Function[]
  }
}
export interface SCOutput {
  text: string
  result: SCConverter[]
}

export class SC {
  version: string = packageJson.version
  options: SCOptions = {
    converter: {},
  }

  constructor(userOptions: SCOptions | {} = {}) {
    const defaultOption = this.options
    this.options = merge(defaultOption, userOptions)
  }

  async convert(input: SCInput): Promise<SCOutput> {
    if (typeof input !== "object" || input === null || Array.isArray(input))
      throw new TypeError("The argument is unentered or not an object.")
    if (typeof input.text !== "string")
      throw new TypeError("The text is unentered or is not a string.")
    if (!Array.isArray(input.converter))
      throw new TypeError("The converter is unentered or is not an array.")

    if (!input.text) throw new Error("The text is empty.")
    if (input.converter.length <= 0) throw new Error("The converter is empty.")

    for (const converter of input.converter) {
      if (
        typeof converter !== "object" ||
        converter === null ||
        Array.isArray(converter)
      )
        throw new Error(`The converter "${converter}" is not an object.`)
      const { name } = converter
      if (!Array.isArray(this.options.converter[name]))
        throw new Error(`The converter "${name}" is not registered.`)
    }

    const output: SCOutput = {
      text: input.text,
      result: input.converter,
    }
    for (const [index, val] of input.converter.entries()) {
      const beforeText: string = output.text
      try {
        output.result[index].error = []
        val.option || (val.option = [])
        val.fallback = 0
        if (!Array.isArray(val.option))
          throw new TypeError("The option is unentered or is not an array.")
        for (const convert of this.options.converter[val.name]) {
          try {
            const tmptext = await convert(...[output.text, ...val.option])
            if (!tmptext || tmptext == "")
              throw new Error("The string was not returned.")
            output.text = tmptext
            output.result[index].status = "success"
            output.result[index].text = output.text
            break
          } catch (error) {
            val.fallback++
            output.result[index].error?.push(error)
          }
        }
      } catch (error) {
        output.text = beforeText
        output.result[index].status = "error"
        output.result[index].error?.push(error)
      }
    }
    return output
  }
}
