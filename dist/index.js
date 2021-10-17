var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  SC: () => SC
});
var packageJson = __toModule(require("../package.json"));
var import_deepmerge = __toModule(require("deepmerge"));
class SC {
  version = packageJson.version;
  options = {
    converter: {
      cjp: require("cjp").generate,
      genhera: require("genhera").generate,
      nomlish: require("nomlish").translate,
      "5000choyen": require("../modules/5000choyen-api-node.min"),
      slackEmoji: require("../modules/slackEmojiGen.min")
    }
  };
  constructor(userOptions = {}) {
    const defaultOption = this.options;
    this.options = (0, import_deepmerge.default)(defaultOption, userOptions);
  }
  async convert(input) {
    if (typeof input !== "object" || input === null || Array.isArray(input))
      throw new TypeError("The argument is unentered or not an object.");
    if (typeof input.text !== "string")
      throw new TypeError("The text is unentered or is not a string.");
    if (!Array.isArray(input.converter))
      throw new TypeError("The converter is unentered or is not an array.");
    if (!input.text)
      throw new Error("The text is empty.");
    if (input.converter.length <= 0)
      throw new Error("The converter is empty.");
    for (const converter of input.converter) {
      if (typeof converter !== "object" || converter === null || Array.isArray(converter))
        throw new Error(`The converter "${converter}" is not an object.`);
      const { name } = converter;
      if (typeof this.options.converter[name] !== "function")
        throw new Error(`The converter "${name}" is not registered.`);
    }
    const output = {
      text: input.text,
      result: input.converter
    };
    for (const [index, val] of input.converter.entries()) {
      const beforeText = output.text;
      try {
        val.option || (val.option = []);
        if (!Array.isArray(val.option))
          throw new TypeError("The option is unentered or is not an array.");
        output.text = await this.options.converter[val.name](...[output.text, ...val.option]);
        if (!output.text)
          throw new Error("The string was not returned.");
        output.result[index].status = "success";
        output.result[index].text = output.text;
      } catch (error) {
        output.text = beforeText;
        output.result[index].status = "error";
        output.result[index].error = error;
      }
    }
    return output;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SC
});
