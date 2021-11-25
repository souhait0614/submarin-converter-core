# submarin-converter-core

submarin-convert-bot から再配布が出来ないコードを取り除いてオープンソース化したもの

## Requirement

- [Volta](https://volta.sh)
- [Node.js](https://nodejs.org) (16.13.0)
- [Yarn](https://yarnpkg.com) (1.22.17)

## Usage

```js
import { SC } from "submarin-converter-core"
import * as cjp from "cjp" //`npm i cjp` or `yarn add cjp`

const converter = new SC({
  converter: {
    cjp: [cjp.generate],
  },
})

converter.convert({
    target: "こんにちは",
    converter: [{ name: "cjp" }],
  })
  .then(({ text }) => {
    console.log(text) //ごんにさは
  })
```

```js
import { SC } from "submarin-converter-core"
import * as cjp from "cjp" //`npm i cjp` or `yarn add cjp`
import * as genhera from "genhera" //`npm i genhera` or `yarn add genhera`
import * as nomlish from "nomlish" //`npm i nomlish` or `yarn add nomlish`

const converter = new SC({
  converter: {
    cjp: [cjp.generate],
    genhera: [genhera.generate],
    nomlish: [nomlish.translate],
  },
})

converter.convert({
    target: "こんにちは",
    converter: [
      { name: "nomlish", option: [5] },
      { name: "cjp" },
      { name: "genhera" },
    ],
  })
  .then(({ text }) => {
    console.log(text) /*そﾗさ……仆ゎ……
                      ごんにさゎ
                      　ぉ　と　ぎ　ば　な　ﾚ　ゎ　终　ゎ　ﾘ　さ　……*/
  })
```
